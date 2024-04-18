package HnM.controller;

import HnM.model.dto.*;
import HnM.model.entity.StudentEntity;
import HnM.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired private AdminService adminService;



    // 관리자 회원가입
    @PostMapping("/signup/post.do") // 1. 회원가입
    public boolean doSignupPost(AdminDto adminDto){
        return adminService.doSignupPost( adminDto );
    }

    /*// 관리자 로그인
    @PostMapping("/login/post.do") // 2. 로그인    // 수정
    public AdminDto doLoginPost(AdminDto adminDto){
        System.out.println("adminDto 테스트 : " + adminDto);
        return adminService.doLoginPost( adminDto );
    }*/

    // 관리자 로그아웃
    @PostMapping("/logout/get.do")   // 3. 로그아웃
    public boolean doLogoutGet(){
        return adminService.doLogoutGet();
    }


    // 로그인된 관리자 그룹 별 메뉴
    @GetMapping("/headerMenu.do")
    public List<MaincategoryDto> doGetHeaderMenu(){
        return adminService.doGetHeaderMenu();
    }

    @GetMapping("/SidebarMenu.do")
    public List<SubcategoryDto> doGetSidebarMenu(){
        return adminService.doGetSidebarMenu();
    }

    // 관리자 아이디 중복검사
    @GetMapping("/duplicate/get.do")
    @ResponseBody
    public boolean duPlicationCheck(@RequestParam String aid) {
        return adminService.duplicationCheck(aid);
    }

    @GetMapping("/findId/get.do")
    public String doFindId(String aname, String aemail) {
        return adminService.doFindId(aname, aemail);
    }

    @GetMapping("/loginInfo/get.do")
    public AdminDto duPlicationCheck() {
        return adminService.doLoginInfo();
    }

    @GetMapping("/mcno/get.do")
    public MaincategoryDto doFindMcno(String path) {

        return adminService.doFindMcno(path);
    }
}
