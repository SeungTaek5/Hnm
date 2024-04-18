package HnM.service;

import HnM.model.dto.CounselDto;
import HnM.model.dto.ClassDto;
import HnM.model.dto.StudentDto;
import HnM.model.entity.ClassEntity;
import HnM.model.dto.*;
import HnM.model.entity.ClassEntity;
import HnM.model.entity.CounselEntity;
import HnM.model.entity.StudentEntity;
import HnM.model.entity.TermEntity;
import HnM.model.repository.*;
import HnM.model.entity.TermEntity;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {
    @Autowired
    StudentEntityRepository studentEntityRepository;
    @Autowired private HttpServletRequest request;
    @Autowired private FileService fileService;
    @Autowired
    ClassEntityRepository classEntityRepository;
    @Autowired
    TermEntityRepository termEntityRepository;

    @Autowired
    FeeEntityRepository feeEntityRepository;
    // 1. 학생 등록
    @Transactional
    public int RegStudentPost(StudentDto studentDto){

        String filename= fileService.fileUpload((studentDto.getSfile()));
    ;   studentDto.setSpassword("1111");

        StudentEntity savedEntity = studentEntityRepository.save(studentDto.toEntity());
        savedEntity.setSimage(filename);
        if(savedEntity.getSno()>0) return 0;
        return 1;
    }

    //2. 학생 개별 출력
    public StudentDto StudentInfoGet(@RequestParam int sno){

        StudentEntity studentEntity =studentEntityRepository.getReferenceById(sno);
        StudentDto result=studentEntity.toDto();

        return result;
    }@Transactional
    //3. 학생 수정
    public boolean StudentEditPut(StudentDto studentDto){
      //  int result =studentEntityRepository.updateStudent((1));
        System.out.println("studentDto = " + studentDto);
        StudentEntity editEntity=studentEntityRepository.findById(studentDto.getSno()).get();

        editEntity.setSname(studentDto.getSname());
        editEntity.setSgender(studentDto.getSgender());
        editEntity.setSgrade(studentDto.getSgrade());
        editEntity.setSbirth(studentDto.getSbirth());
        editEntity.setSemail(studentDto.getSemail());
        editEntity.setSclass(studentDto.getSclass());
        editEntity.setSmajor(studentDto.getSmajor());
        editEntity.setSschool(studentDto.getSschool());
        editEntity.setSphone(studentDto.getSphone());
        editEntity.setSaddress(studentDto.getSaddress());
        editEntity.setSparentphone(studentDto.getSparentphone());
        editEntity.setSparentname(studentDto.getSparentname());
        editEntity.setSparentrelation(studentDto.getSparentrelation());
        editEntity.setSimage(studentDto.getSimage());


        return true;
    }



    //4. 학생 삭제

    public boolean StudentDelete(@RequestBody ArrayList<Integer> snos){
        if(snos!=null){for(int i=0;i<snos.size();i++){
            feeEntityRepository.deleteAllBysno_fk(snos.get(i));
            counselEntityRepository.deleteAllBysno_fk(snos.get(i));
            studentEntityRepository.deleteById(snos.get(i));
        }

        }
        return true;
    }

    // 반 정보 불러오기
    public List<ClassDto> allClassGet(){
        List<ClassEntity> classEntityList= classEntityRepository.findAll();

        List<ClassDto> classDtos =classEntityList.stream()
                .map(classEntity -> {
                    ClassDto classDto = classEntity.toDto();
                    int tno = classEntity.getTermEntity().getTno();
                    TermEntity termEntity = termEntityRepository.findById(tno).get();
                    classDto.setTermEntityList(termEntity); // TermDto에 ClassEntity 목록 설정
                    return classDto;
                })
                .collect(Collectors.toList());
        return classDtos;
    }


    //============== 장은경 작성 : 학생 개별 상담내역 ==============
    @Autowired
    CounselEntityRepository counselEntityRepository;

    // 학생 개별 상담 정보 가져오기
    public PageDto2 getStudentCounselInfo(int sno, int page, int view){
        System.out.println("StudentService.getStudentCounselInfo");
        System.out.println("sno = " + sno + ", page = " + page + ", view = " + view);

        //페이지 정보 받아오기 (page : 현재페이지, view : 한 페이지에 나타낼 게시물 수)
        Pageable pageable = PageRequest.of(page - 1, view);
        Page<Map<Object, Object>> studentCounselEntity=counselEntityRepository.findCustomBySno_fk(sno, pageable);

        //총 페이지수 가져오기
        int count=studentCounselEntity.getTotalPages();

        //전달할 content 가져오기
        List<Map<Object, Object>> contentList=studentCounselEntity.getContent().stream()
                .map(outputElement ->{
                    Map<Object, Object> resultElement = outputElement;
                    return resultElement;
                }).collect(Collectors.toList());

        //pageDto 반환
        PageDto2 pageDto = PageDto2.builder()
                .data(contentList)
                .page(page)
                .count(count)
                .build();

        return pageDto;

    }//m end

    //=========================================================


}
