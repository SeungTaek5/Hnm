package HnM.service;

import HnM.model.dto.StudentDto;
import HnM.model.entity.StudentEntity;
import HnM.model.repository.CounselEntityRepository;
import HnM.model.repository.StudentEntityRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExcelFileService {

    @Autowired
    StudentEntityRepository studentEntityRepository;


    // 학생 전체 리스트 반환
    // map으로 던질지 dto로 던질지?
    @Transactional
    public List<Map<String, String>> doGetAllStudent(){

        List<StudentEntity> studentEntityList = studentEntityRepository.findAll();

        List<Map<String, String>> result = new ArrayList<>();

        for(int i=0; i<studentEntityList.size(); i++){
            Map<String, String> map = new HashMap<>();
            // 엑셀 양식에 맞게 변환하기
            map.put("학번", studentEntityList.get(i).getSid());
            map.put("학생이름", studentEntityList.get(i).getSname());
            map.put("성별",  studentEntityList.get(i).getSgender());
            map.put("학년",  studentEntityList.get(i).getSgrade());
            map.put("생년월일",  studentEntityList.get(i).getSbirth());
            map.put("이메일",  studentEntityList.get(i).getSemail());
            map.put("입교반",  studentEntityList.get(i).getSclass());
            map.put("계열",  studentEntityList.get(i).getSmajor());
            map.put("출신학교",  studentEntityList.get(i).getSschool());
            map.put("연락처",  studentEntityList.get(i).getSphone());
            map.put("주소",  studentEntityList.get(i).getSaddress());
            map.put("", "");
            map.put("보호자성명",  studentEntityList.get(i).getSparentname());
            map.put("보호자관계",  studentEntityList.get(i).getSparentrelation());
            map.put("보호자연락처",  studentEntityList.get(i).getSparentphone());
            result.add(map);
        }
        System.out.println("result는 !!" + result);
        return result;
    }

    // 엑셀 파일 읽어서 학생 등록
    @Transactional
    public int doPostAllStudent(List<Map<String, String>> list){

        boolean saveFlag = true;
        int result = 0;
        List<StudentEntity> studentEntityList = studentEntityRepository.findAll();

        for(int i=0; i<list.size(); i++){
            saveFlag = true;
            for(int j=0; j<studentEntityList.size(); j++){
                if(studentEntityList.get(j).getSid().equals(list.get(i).get("학번"))){
                    System.out.println("이미 등록된 학생 : " + studentEntityList.get(j).getSid());
                    saveFlag = false;
                    break;
                }
            }
            if(saveFlag) {
                StudentDto studentDto = StudentDto.builder()
                        .sid(list.get(i).get("학번"))
                        .sname(list.get(i).get("학생이름"))
                        .sgender(list.get(i).get("성별"))
                        .sgrade(list.get(i).get("학년"))
                        .sbirth(list.get(i).get("생년월일"))
                        .semail(list.get(i).get("이메일"))
                        .sclass(list.get(i).get("입교반"))
                        .smajor(list.get(i).get("계열"))
                        .sschool(list.get(i).get("출신학교"))
                        .sphone(list.get(i).get("연락처"))
                        .saddress(list.get(i).get("주소"))
                        .sparentname(list.get(i).get("보호자성명"))
                        .sparentrelation(list.get(i).get("보호자관계"))
                        .sparentphone(list.get(i).get("보호자연락처"))
                        .build();
                StudentEntity studentEntity = studentEntityRepository.save(studentDto.toEntity());
                System.out.println("학생 등록 완료 : " + studentEntity);
                result ++;
            }
        }

        return result;
    }

    //======== 장은경 작성 : 학생 개별 상담내역 출력 =========
    @Autowired
    CounselEntityRepository counselEntityRepository;

    @Transactional
    public List<Map<Object, Object>> getStudentCounselList(Map<Object, Object> info){
        System.out.println("ExcelFileService.getStudentCounselList");
        System.out.println("info = " + info);
        List<Map<Object, Object>> result=counselEntityRepository.findCustomBySnoForExel(info.get("sno"), info.get("startdate"), info.get("enddate"));

        //엑셀 형식에 맞게 변환
        List<Map<Object,Object>> counselList= result.stream().map((r)->{
            Map<Object, Object> forExel=new LinkedHashMap<>();
            forExel.put("제목", r.get("ctitle"));
            forExel.put("상담구분", r.get("cdivision"));
            forExel.put("선생님", r.get("aname"));
            forExel.put("내용", r.get("ccontent"));
            forExel.put("상담일", r.get("centerdate"));
            return forExel;
        }).collect(Collectors.toList());

        return counselList;
    }//m end
    //==================================================
}
