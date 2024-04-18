package HnM.service;

import HnM.model.dto.*;
import HnM.model.entity.AdminEntity;
import HnM.model.entity.CounselEntity;
import HnM.model.entity.StudentEntity;
import HnM.model.repository.AdminEntityRepository;
import HnM.model.repository.CounselEntityRepository;
import com.sun.tools.jconsole.JConsoleContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import HnM.controller.StudentController;
import HnM.model.entity.StudentEntity;
import HnM.model.repository.StudentEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CounselService {

    @Autowired
    CounselEntityRepository counselEntityRepository;

    // 1. 상담 리스트 출력
    public PageDto getCounsel(int page, int view, String sid, String sname, String ctitle){
        sid = sid == null ? "" : sid ;
        sname = sname == null ? "" : sname ;
        ctitle = ctitle == null ? "" : ctitle ;
        //=============================================================//
        Pageable pageable = PageRequest.of(page-1,5);
       // Page<CounselEntity> counselDtoPage=counselEntityRepository.findAll(pageable);
       Page<Map<Object,Object>>  counselDtoPage=counselEntityRepository.SearchByCounsel(sid,sname,ctitle , pageable);
        int count = counselDtoPage.getTotalPages();
        List<Object> data = new ArrayList<>(counselDtoPage.getContent());


//        List<Object> data=counselDtoPage.stream().map(counselEntity -> {
//            CounselDto counselDto = counselEntity.toDto();
//            // 외래 키를 사용하여 연관된 엔티티 데이터 가져오기
//            StudentEntity studentEntity = counselEntity.getStudentEntity();
//            if (studentEntity != null) {
//                counselDto.setStudentDto(studentEntity.toDto()); //
//            }
//            AdminEntity adminEntity = counselEntity.getAdminEntity();
//            if (adminEntity != null) {
//                counselDto.setAdminDto(adminEntity.toDto());
//            }
//
//            return counselDto;
//
//
//        }).collect(Collectors.toList());


        PageDto pageDto=PageDto.builder()
                .data(data)
                .page(page)
                .count(count)
                .build();
        return pageDto;
    }

    // 상담 삭제
    @Transactional
    public boolean deleteCounsel(ArrayList<Integer> cnos){

        if(cnos!=null){for(int i=0;i<cnos.size();i++){
            counselEntityRepository.deleteById(cnos.get(i));

        } return true;
        }

        return false;
    }

    //============== 장은경 작성 ==============
    @Autowired
    private StudentEntityRepository studentEntityRepository;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private AdminEntityRepository adminEntityRepository;

    //학생 이름으로 정보 검색
    public List<Map<Object, Object>> getStudentInfo(String sname){
        System.out.println("CounselService.getStudentInfo");
        System.out.println("sname = " + sname);
        System.out.println("studentEntityRepository.findBySname(sname) = " + studentEntityRepository.findBySname(sname));

        List<Map<Object, Object>> studentList=studentEntityRepository.findBySname(sname);

        return studentList;
    }//m end

    //로그인된 관리자 정보 반환
    public Object getLoginInfo(){
        System.out.println("CounselService.getLoginInfo");
        System.out.println("request.getSession().getAttribute(\"loginInfo\") = " + request.getSession().getAttribute("loginInfo"));
        Object adminDto= request.getSession().getAttribute("loginInfo");
        System.out.println("adminDto = " + adminDto);

        return adminDto;
    }//m end

    //상담 등록
    public boolean postCounsel( Map<Object, Object> counselInfo){
        System.out.println("CounselService.postCounsel");
        System.out.println("counselInfo = " + counselInfo);
        StudentEntity studentEntity = studentEntityRepository.findBySid((String)counselInfo.get("sid"));
        System.out.println("studentEntity = " + studentEntity);
        AdminEntity adminEntity=adminEntityRepository.findById((Integer) counselInfo.get("ano_fk")).get();


        CounselEntity counselEntity=CounselEntity.builder()
                .ctitle((String) counselInfo.get("ctitle"))
                .ccontent((String) counselInfo.get("ccontent"))
                .cdivision((String) counselInfo.get("cdivision"))
                .centerdate(LocalDate.parse((String)counselInfo.get("centerdate")) )
                .studentEntity(studentEntity)
                .adminEntity(adminEntity)
                .build();

        CounselEntity result = counselEntityRepository.save(counselEntity);
        if(result!=null){
            return true;
        }
        return false;
    }//m end

    //상담 세부내역 가져오기
    public Map<Object, Object> getCounselDetail(int cno){
        System.out.println("CounselService.getCounselDetail");
        System.out.println("cno = " + cno);
        Map<Object, Object> detailList=counselEntityRepository.findByCno(cno);
        System.out.println("detailList = " + detailList);
        return detailList;
    }//m end

    //상담글 작성한 관리자번호 가져오기
    @GetMapping("/writer/get.do")
    public int getCounselWriter(int cno){
        System.out.println("CounselService.getCounselWriter");
        System.out.println("cno = " + cno);

        return counselEntityRepository.findAno_fkByCno(cno);
    }//m end

    //상담 글 수정 시 학생 번호로 정보 가져오기
    public Map<Object, Object> getStudentBySno(int cno){
        System.out.println("CounselService.getStudentBySno");
        System.out.println("cno = " + cno);
        int sno_fk=counselEntityRepository.findById(cno).get().getStudentEntity().getSno();
        System.out.println("sno_fk = " + sno_fk);

        return studentEntityRepository.findBySno_fk(sno_fk);
    }//m end

    //상담 글 수정 시 기존 내용 가져오기
    public  Map<Object, Object> getCounselInfo(int cno){
        System.out.println("CounselService.getCounselInfo");
        System.out.println("cno = " + cno);

        return counselEntityRepository.findInfoByCno(cno);
    }//m end

    //상담글 수정
    @PutMapping("/updateCounsel.post.do")
    public boolean updateCounsel(@RequestBody Map<Object, Object> counselInfo){
        System.out.println("CounselController.updateCounsel");
        System.out.println("counselInfo = " + counselInfo);
        CounselEntity currentCouselEntity=counselEntityRepository.findById((int)counselInfo.get("cno")).get();
        StudentEntity studentEntity=studentEntityRepository.findBySid((String)counselInfo.get("sid"));
        //update
        currentCouselEntity.setCtitle((String)counselInfo.get("ctitle"));
        currentCouselEntity.setCcontent((String)counselInfo.get("ccontent"));
        currentCouselEntity.setCenterdate(LocalDate.parse((String) counselInfo.get("centerdate")));
        currentCouselEntity.setCdivision((String)counselInfo.get("cdivision"));
        currentCouselEntity.setStudentEntity(studentEntity);

        CounselEntity counselEntity= counselEntityRepository.save(currentCouselEntity);
        if(counselEntity!=null){
            return true;
        }
        return false;
    }//m end

    //=======================================
}
