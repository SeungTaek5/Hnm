package HnM.controller;

import HnM.model.dto.MaincategoryDto;
import HnM.model.entity.StudentEntity;
import HnM.service.ExcelFileService;
import HnM.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/excel")
public class ExcelFileController {

    @Autowired
    ExcelFileService excelFileService;

    // 학원생 목록 엑셀로 다운로드
    @GetMapping("/student/get.do")
    public List<Map<String, String>> doGetAllStudent(){

        return excelFileService.doGetAllStudent();
    }

    // 엑셀을 업로드 받아 학원생 등록
    @PostMapping("/student/post.do")
    public int doPostAllStudent(@RequestBody List<Map<String, String>> list){

        return excelFileService.doPostAllStudent(list);
    }

    //======== 장은경 작성 : 학생 개별 상담내역 출력 =========
    @PostMapping("/studentCounsel/get.do")
    public List<Map<Object, Object>> getStudentCounselList(@RequestBody Map<Object, Object> info){
        System.out.println("ExcelFileController.getStudentCounselList");
        System.out.println("info = " + info);
        return excelFileService.getStudentCounselList(info);
    }//m end

    //==================================================
}
