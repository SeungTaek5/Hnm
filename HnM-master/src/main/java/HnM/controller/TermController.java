package HnM.controller;

import HnM.model.dto.ClassDto;
import HnM.model.dto.PageDto;
import HnM.model.dto.StudentDto;
import HnM.model.dto.TermDto;
import HnM.service.TermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/term")
public class TermController {
    @Autowired
    TermService termService;
    //학기 등록
    @PostMapping("/post.do")
    public boolean postTerm(@RequestBody Map<String, Object> info){

        return termService.postTerm(info);
    }
    //학기 전체출력
    @GetMapping("/get.do")
    public PageDto getTerm(int page, int view){
        return termService.getTerm(page, view);
    }
    //학기 삭제
    @PostMapping("/delete.do")
    public boolean deleteTerm(@RequestBody ArrayList<Integer> tnos){

        return termService.deleteTerm(tnos);
    }
    //학기 정보 불러오기
    @GetMapping("/info/get.do")
    public TermDto TermInfoGet(@RequestParam int tno){
        System.out.println("tno = " + tno);
        return termService.TermInfoGet(tno);
    }

    // 학기 수정
    @PutMapping("/put.do")
    public boolean termPut(@RequestBody Map<String, Object> info){
        System.out.println("info = " + info);
        return termService.termPut(info);
    }
}
