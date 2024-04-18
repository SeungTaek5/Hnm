package HnM.controller;

import HnM.model.dto.CounselDto;
import HnM.model.dto.ClassDto;
import HnM.model.dto.PageDto;
import HnM.model.dto.PageDto2;
import HnM.model.dto.StudentDto;
import HnM.model.dto.TermDto;
import HnM.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    StudentService studentService;
    // 1. 학생 등록
    @PostMapping("/reg/post.do")
    public int RegStudentPost(StudentDto studentDto){
        System.out.println("studentDto = " + studentDto);

        return studentService.RegStudentPost(studentDto);
    }

    //2. 학생 개별 출력
    @GetMapping("/info/get.do")
    public StudentDto StudentInfoGet(int sno){

        return studentService.StudentInfoGet(sno);
    }
    //3. 학생 수정
    @PutMapping("/edit/put.do")
    public boolean StudentEditPut( StudentDto studentDto){
        System.out.println("studentDto = " + studentDto);
        return studentService.StudentEditPut(studentDto);
    }


    //4. 학생 삭제
    @PostMapping("/delete/delete.do")
    public boolean StudentDelete(@RequestBody ArrayList<Integer> snos){
        System.out.println("snos = " + snos);
        return studentService.StudentDelete(snos);
    }


    //5. 반정보 가져오기
    @GetMapping("/all/get.do")
    public List<ClassDto> allClassGet() {

        return studentService.allClassGet();
    }
    //============== 장은경 작성 : 학생 개별 상담내역 ==============

    // 학생 개별 상담 정보 가져오기(centerdate, cdivision, ctitle, aname, c.cdate)
    @GetMapping("/counselInfo/get.do")
    public PageDto2 getStudentCounselInfo(int sno, int page, int view){
        System.out.println("StudentController.getStudentCounselInfo");
        System.out.println("sno = " + sno);

         return studentService.getStudentCounselInfo(sno, page, view);
    }//m end

    //=========================================================


}
