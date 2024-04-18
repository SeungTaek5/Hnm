package HnM.controller;

import HnM.model.dto.*;
import HnM.model.entity.GroupEntity;
import HnM.service.AdminManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/adminManaging")
public class AdminManagementController {
//============= 장은경 작성_240328 ===============
    @Autowired
    AdminManagementService adminManagementService;

    //관리자 리스트 출력
    @GetMapping("/adminList/get.do")
    public List<Map<Object,Object>> getAdminList(){
        System.out.println("AdminManagementController.getAdminList");
        return adminManagementService.getAdminList();
    }//m end

    //관리자 닉네임 가져오기
    @GetMapping("/nickNameList/get.do")
    public List<Map<Object, Object>> getNickname(){
        System.out.println("AdminManagementController.getNickname");

        return adminManagementService.getNickname();
    }

    //관리자 그룹 부여
    @PutMapping("/adminGroup/put.do")
    public boolean putAdminGroup(@RequestBody AdminGroupDto adminGroupDto){
        System.out.println("AdminManagementController.putAdminGroup");
        System.out.println("adminGroupDto = " + adminGroupDto);


        return adminManagementService.putAdminGroup(adminGroupDto);
    }//m end

    //그룹별 권한 부여
    @PostMapping("/admingroup/auth/post.do")
    public boolean postAdminAuth(@RequestBody GroupAuthDto groupAuthDto){
        System.out.println("AdminManagementController.postAdminAuth");
        System.out.println("groupAuthDto = " + groupAuthDto);
        //int gno=Integer.parseInt(gno_fk);

        return adminManagementService.postAdminAuth(groupAuthDto);
    }//m end

    //그룹출력
    @GetMapping("/group/get.do")
    public List<GroupDto> getGroup(){

        return adminManagementService.getGroup();
    }

    //category 출력
    @GetMapping("/selectCategory/get.do")
    public List<JoinMcAndScDto> getCategory(){

        return adminManagementService.getCategory();
    }

    //group subcategory list 출력
    @GetMapping("/groupSubList/get.do")
    public List<Integer> getGroupSubList(@RequestParam("radioCheck") int gno){
        System.out.println("subList :"+ adminManagementService.getGroupSubList(gno));

        return adminManagementService.getGroupSubList(gno);
    }//m end

    //admin 삭제
    @PostMapping("/deleteAdmin/delete.do")
    public boolean deleteAdmin(@RequestBody List<Integer> deleteAdminList){
        System.out.println("AdminManagementController.deleteAdmin");
        System.out.println("deleteAdminList = " + deleteAdminList);

        return adminManagementService.deleteAdmin(deleteAdminList);
    }

    //별명 부여 시 학과담임(gno_fk=7/9)인지 확인(params : ano)
    @GetMapping("/checkTeacher/get.do")
    public boolean checkTeacher(int ano){
        System.out.println("AdminManagementController.checkTeacher");
        System.out.println("gname = " + ano);

        return adminManagementService.checkTeacher(ano);
    }//m end

    //닉네임 부여(RequestBody = ano,nname)
    @PostMapping("/inputNickName/post.do")
    public boolean inputNickName(@RequestBody Map<Object,Object> nicknameInfo){
        System.out.println("AdminManagementController.inputNickName");
        System.out.println("nicknameInfo = " + nicknameInfo);

        return adminManagementService.inputNickName(nicknameInfo);
    }//m end

    //그룹등록
    @PostMapping("/insertGroup/post.do")
    public boolean insertGroup(@RequestBody String gname){
        System.out.println("AdminManagementController.insertGroup");

        return adminManagementService.insertGroup(gname);
    }//m end

    //그룹 삭제
    @DeleteMapping("/deleteGroup/delete.do")
    public boolean deleteGroup(int gno){
        System.out.println("AdminManagementController.deleteGroup");
        System.out.println("gno = " + gno);
        return adminManagementService.deleteGroup(gno);
    }//m end
//==============================================
}//c end

