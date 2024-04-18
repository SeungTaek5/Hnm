package HnM.controller;

import HnM.model.dto.ClassDto;
import HnM.model.dto.PageDto;
import HnM.model.dto.TermDto;
import HnM.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/class")
public class ClassController {
    @Autowired
    ClassService classService;
    //반 전체출력
    @GetMapping("/get.do")
    public PageDto getClass(int page, int view){
        return classService.getClass(page, view);
    }

    // 반 삭제
    @PostMapping("/delete.do")
    public boolean deleteClass(@RequestBody ArrayList<Integer> clnos){

        return classService.deleteClass(clnos);
    }

    //학기정보 가져오기
    @GetMapping("/all/get.do")
    public List<TermDto> allTermGet(){

        return classService.allTermGet();
    }

    //반 등록
    @PostMapping("/post.do")
    public boolean postClass(@RequestBody Map<String, Object> info){
        System.out.println("info = " + info);
        return classService.postClass(info);
    }
    //반 정보 불러오기
    @GetMapping("/info/get.do")
    public ClassDto classInfoGet(@RequestParam int clno){

        return classService.classInfoGet(clno);
    }

    //반 등록
    @PostMapping("/edit/post.do")
    public boolean editClass(@RequestBody Map<String, Object> info){
        System.out.println("info = " + info);
        return classService.editClass(info);
    }
}
