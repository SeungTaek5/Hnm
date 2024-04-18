package HnM.service;

import HnM.model.dto.*;
import HnM.model.entity.*;
import HnM.model.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminManagementService {
    //============= 장은경 작성_240328 ===============
    @Autowired
    AdminEntityRepository adminEntityRepository;
    @Autowired
    AuthorityEntityRepository authorityEntityRepository;
    @Autowired
    SubcategoryEntityRepository subcategoryEntityRepository;
    @Autowired
    HttpServletRequest request;
    @Autowired
    GroupEntityRepository groupEntityRepository;
    @Autowired
    MaincategoryEntityRepository maincategoryEntityRepository;
    @Autowired
    CounselEntityRepository counselEntityRepository;
    @Autowired
    NicknameEntityRepository nicknameEntityRepository;
    @Autowired
    PerHourSubEntityRepository perHourSubEntityRepository;

    //관리자 리스트 출력
    public List<Map<Object,Object>> getAdminList(){
        System.out.println("AdminManagementService.getAdminList");
        List<Map<Object,Object>> adminInfoDtoList = adminEntityRepository.findAllCustom();
        System.out.println("adminInfoDtoList = " + adminInfoDtoList);

        return adminInfoDtoList;
    }//m end

    //관리자 닉네임 가져오기
    public List<Map<Object, Object>> getNickname(){
        System.out.println("AdminManagementService.getNickname");

        List<NicknameEntity> nicknameEntityList=nicknameEntityRepository.findAll();

        List<Map<Object,Object>> nickList= nicknameEntityList.stream().map((nickEntity)->{
            Map<Object, Object> resultList=new HashMap<>();
            resultList.put("ano_fk",nickEntity.getAdminEntity().getAno());
            resultList.put("nname",nickEntity.getNname());
            return resultList;
        }).collect(Collectors.toList());

        return nickList;
    }

    //관리자 그룹 부여
    public boolean putAdminGroup(AdminGroupDto adminGroupDto){
        System.out.println("AdminManagementService.putAdminGroup");
        int result= adminEntityRepository.updateGroup(adminGroupDto.getAno(), adminGroupDto.getGno());
        System.out.println("result = " + result);
        if(result!=0){
            return true;
        }
        return false;
    }//m end

    //그룹별 권한 부여
    public boolean postAdminAuth(GroupAuthDto groupAuthDto){
        System.out.println("AdminManagementService.postAdminAuth");
        System.out.println("groupAuthDto = " + groupAuthDto);
        int count=0;    //권한 등록 식별용 변수

        //========= 기존 권한 삭제 ==========
        if(authorityEntityRepository.findCountByGno(groupAuthDto.getGno_fk())>0){
            authorityEntityRepository.deleteAllByGno(groupAuthDto.getGno_fk());
            System.out.println("기존권한 삭제");
        }
        //=================================

        GroupEntity groupEntity=groupEntityRepository.findById(groupAuthDto.getGno_fk()).get();//gno_fk

        for(int i=0; i<groupAuthDto.getScnoList().size(); i++){
            int scno_fk=groupAuthDto.getScnoList().get(i);
            SubcategoryEntity subcategoryEntity=subcategoryEntityRepository.findById(scno_fk).get();//scno_fk
            AuthorityEntity authorityEntity=AuthorityEntity.builder()
                    .groupEntity(groupEntity)
                    .subcategoryEntity(subcategoryEntity)
                    .build();

            authorityEntityRepository.save(authorityEntity);
            count++;
        }//for end
        if(count>0){    //만약 save횟수가 0보다 크면 true 반환
            return true;
        }
        return false;
    }//m end

    //그룹출력
    public List<GroupDto> getGroup(){
        List<GroupEntity> groupEntities = groupEntityRepository.findAll();

        List<GroupDto> groupDtoList=new ArrayList<>();
        groupEntities.forEach((groupList)->{
            groupDtoList.add( groupList.toDto() );
        });


        return groupDtoList;
    }//m end

    //category 출력
    public List<JoinMcAndScDto> getCategory(){
        //전체 maincategory 출력
        List<MaincategoryEntity> maincategoryEntityList=maincategoryEntityRepository.findAll();
        System.out.println("maincategoryEntityList = " + maincategoryEntityList);

        //List<JoinMcAndScDto> 저장
            //저장객체
        List<JoinMcAndScDto> joinMcAndScDtoList = new ArrayList<>();
            //저장
        for(int i=0; i<maincategoryEntityList.size(); i++){
            
            List<Map<Object, Object>> subList= subcategoryEntityRepository.findAllByMcno(maincategoryEntityList.get(i).getMcno());

            JoinMcAndScDto joinMcAndScDto=JoinMcAndScDto.builder()
                    .mcno(maincategoryEntityList.get(i).getMcno())
                    .mcname(maincategoryEntityList.get(i).getMcname())
                    .subcategoryList(subList)
                    .build();

            joinMcAndScDtoList.add(joinMcAndScDto);
        }//for end
        System.out.println("joinMcAndScDtoList = " + joinMcAndScDtoList);
        return joinMcAndScDtoList;
    }//m end

    //group subcategory list 출력
    public List<Integer> getGroupSubList(int gno){
        List<Integer> scnoList=authorityEntityRepository.findScnoByGno(gno);
        return scnoList;
    }//m end

    //admin 삭제
    public boolean deleteAdmin(List<Integer> deleteAdminList){
        //counsel fk 삭제
        deleteAdminList.forEach((anoList)->{
            counselEntityRepository.deleteAllByAno_fk(anoList);
        });

        //nickname fk 삭제
        deleteAdminList.forEach((anoList)->{
            //만약 닉네임 엔티티가 존재하면
            if(nicknameEntityRepository.findCountByAno_fk(anoList)!=null){
                int nno=nicknameEntityRepository.findCountByAno_fk(anoList).getNno();
                
                //perhoursub nno_fk 삭제
                perHourSubEntityRepository.deleteAllByNno_fk(nno);
                nicknameEntityRepository.deleteAllByAno_fk(anoList);
            }
        });

        adminEntityRepository.deleteAllById(deleteAdminList);
        return true;
    }//m end

    //별명 부여 시 학과담임(gno_fk=7/9)인지 확인(params : gname)
    public boolean checkTeacher(int ano){
        System.out.println("AdminManagementService.checkTeacher");
        System.out.println("gname = " + ano);
        //해당 admin의 gno가져오기
        int gno=adminEntityRepository.findById(ano).get().getGroupEntity().getGno();
        if(gno==7||gno==9){
            return true;
        }
        return false;
    }//m end

    //닉네임 부여
    public boolean inputNickName(Map<Object,Object> nicknameInfo){
        System.out.println("AdminManagementService.inputNickName");
        System.out.println("nicknameInfo = " + nicknameInfo);

        NicknameEntity findNicknameEntity = nicknameEntityRepository.findCountByAno_fk((int)nicknameInfo.get("ano"));
        System.out.println("findNicknameEntity = " + findNicknameEntity);
        if(findNicknameEntity==null){

            NicknameEntity nicknameEntity=NicknameEntity.builder()
                    .adminEntity(adminEntityRepository.findById((int)nicknameInfo.get("ano")).get())
                    .nname((String)nicknameInfo.get("nname"))
                    .build();

            nicknameEntityRepository.save(nicknameEntity);
        }
        else{
            findNicknameEntity.setNname((String)nicknameInfo.get("nname"));
            nicknameEntityRepository.save(findNicknameEntity);
        }

        return false;
    }//m end

    //그룹등록
    public boolean insertGroup(String gname){
        System.out.println("AdminManagementService.insertGroup");
        System.out.println("gname = " + gname);
        GroupEntity groupEntity=GroupEntity.builder()
                .gname(gname)
                .build();
        GroupEntity insertGroupEntity=groupEntityRepository.save(groupEntity);

        //만약 pk가 생성되었다면 return true
        if(insertGroupEntity.getGno()>0){
            return true;
        }
        return false;
    }//m end

    //그룹 삭제
    public boolean deleteGroup(int gno){
        System.out.println("AdminManagementService.deleteGroup");
        System.out.println("gno = " + gno);
        //admin에 부여된 gno_fk를 그룹없음(gno=1)로 변경
        adminEntityRepository.updateGno_fkSetNull(gno);
        //authority 삭제
        authorityEntityRepository.deleteAllByGno(gno);
        //group 삭제
        groupEntityRepository.deleteById(gno);
        return true;
    }//m end
    //==============================================
}//c end
