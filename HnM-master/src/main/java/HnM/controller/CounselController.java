package HnM.controller;

import HnM.model.dto.*;
import HnM.model.dto.AdminDto;
import HnM.model.dto.CounselDto;
import HnM.model.dto.PageDto;
import HnM.service.AdminService;
import HnM.service.CounselService;
import org.springframework.beans.factory.annotation.Autowired;
import HnM.service.CounselService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;



@RestController
@RequestMapping("/counsel")
public class CounselController {

    @Autowired
    CounselService counselService;

    // 상담 전체 출력
    @GetMapping("/get.do")
    public PageDto getCounsel(int page, int view,String sid,String sname,String ctitle){
        System.out.println("page = " + page + ", view = " + view + ", sid = " + sid + ", sname = " + sname + ", ctitle = " + ctitle);
        return counselService.getCounsel(page,view,sid,sname,ctitle);
    }
    // 상담 삭제
    @PostMapping("/delete.do")
    public boolean deleteCounsel(@RequestBody ArrayList<Integer> cnos){
        System.out.println("cnos = " + cnos);

        return counselService.deleteCounsel(cnos);
    }






    //============== 장은경 작성 ==============
    @Autowired
    AdminService adminService;

    //학생 이름으로 정보 검색
    @GetMapping("/studentInfo/get.do")
    public List<Map<Object, Object>> getStudentInfo(String sname){
        System.out.println("CounselController.getStudentInfo");
        System.out.println("sname = " + sname);
        return counselService.getStudentInfo(sname);
    }//m end

    //로그인된 관리자 정보 반환
    @GetMapping("/loginInfo/get.do")
    public Object getLoginInfo(){
        System.out.println("CounselController.getLoginInfo");
        System.out.println("counselService.getLoginInfo() = " + counselService.getLoginInfo());

        return adminService.doLoginInfo();
    }//m end

    //상담 등록
    @PostMapping("/insertCounsel/post.do")
    public boolean postCounsel(@RequestBody Map<Object, Object> counselInfo){
        System.out.println("CounselController.postCounsel");
        System.out.println("counselInfo = " + counselInfo);

        return counselService.postCounsel(counselInfo);
    }//m end

    //상담 세부내역 가져오기
    @GetMapping("/counselDetail/get.do")
    public Map<Object, Object> getCounselDetail(int cno){
        System.out.println("CounselController.getCounselDetail");
        System.out.println("cno = " + cno);
        return counselService.getCounselDetail(cno);
    }//m end

    //상담글 작성한 관리자번호 가져오기
    @GetMapping("/writer/get.do")
    public int getCounselWriter(int cno){
        System.out.println("CounselController.getCounselWriter");
        System.out.println("cno = " + cno);
        return counselService.getCounselWriter(cno);
    }//m end

    //상담 글 수정 시 학생 번호로 정보 가져오기
    @GetMapping("/getStudentBySno/get/do")
    public Map<Object, Object> getStudentBySno(int cno){
        System.out.println("CounselController.getStudentBySno");
        System.out.println("cno = " + cno);
        return counselService.getStudentBySno(cno);
    }//m end

    //상담 글 수정 시 기존 내용 가져오기
    @GetMapping("/getCounselInfo/get.do")
    public  Map<Object, Object> getCounselInfo(int cno){
        System.out.println("CounselController.getCounselInfo");
        System.out.println("cno = " + cno);
        System.out.println("확인 : 기존 상담글 정보 :  " + counselService.getCounselInfo(cno));
        return counselService.getCounselInfo(cno);
    }//m end

    //상담글 수정
    @PutMapping("/updateCounsel/post.do")
    public boolean updateCounsel(@RequestBody Map<Object, Object> counselInfo){
        System.out.println("CounselController.updateCounsel");
        System.out.println("counselInfo = " + counselInfo);

        return counselService.updateCounsel(counselInfo);
    }//m end


    //=======================================
}
