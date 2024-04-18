package HnM.service;

import HnM.model.dto.*;
import HnM.model.entity.AuthorityEntity;
import HnM.model.entity.StudentEntity;
import HnM.model.entity.SubcategoryEntity;
import HnM.model.repository.StudentEntityRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import HnM.model.entity.AdminEntity;
import HnM.model.repository.AdminEntityRepository;
import jakarta.servlet.http.HttpServletRequest;
 import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashSet;
import java.util.List;

import java.util.ArrayList;
import java.util.Set;

@Service
public class AdminService implements UserDetailsService  {

    @Autowired
    AdminEntityRepository adminEntityRepository;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    GroupService groupService;

    @Autowired
    MaincategoryService maincategoryService;

    @Autowired
    SubcategoryService subcategoryService;

    @Autowired
    AuthorityService authorityService;

    // - ( 시큐리티/일반회원 ) 로그인 서비스 커스텀 ( implements UserDetailsService )
    @Override // 역할 :
    public UserDetails loadUserByUsername(String aid) throws UsernameNotFoundException {
        // 1. 로그인창에서 입력받은 아이디
        System.out.println("aid = " + aid);
        // 2. 입력받은 아이디로  실제 아이디와 실제 (암호화된)패스워드 // memail 이용한 회원엔티티 찾기
        AdminEntity adminEntity = adminEntityRepository.findByAid( aid );
        // - 만약에 해당 입력한 이메일의 엔티티가 없으면
        if( adminEntity == null ){ // 아이디 없을때
            throw new UsernameNotFoundException("없는 아이디"); // 강제 예외 발생
        } // UserDetails 가 null 이면 패스워드 검증 실패 했기때문에
        // - ROLE 부여
        // GrantedAuthority : 권한을 의미를 저장 클래스
        // SimpleGrantedAuthority("ROLE_문자형식") : 문자형식의 권한 저장
        List<GrantedAuthority> 등급목록 = new ArrayList<>();
        List<AuthorityDto> authorityDtoList = authorityService.doGetAuthority(adminEntity.getGroupEntity().getGno());
        System.out.println("authorityDtoList = " + authorityDtoList);
        for(AuthorityDto authorityDto : authorityDtoList){
            등급목록.add(new SimpleGrantedAuthority("ROLE_SB"+authorityDto.getScno()));
        }

        // 3.  UserDetails 반환 [ 1.실제 아이디 2. 실제 패스워드 ]
        // UserDetails 목적 : Token에 입력받은 아이디/패스워드 검증하기위한 실제 정보 반환.
        UserDetails userDetails = User.builder()
                .username( adminEntity.getAid() )   // 실제 아이디
                .password( adminEntity.getApassword() ) // 실제 비밀번호(암호화)
                .authorities( 등급목록 ) // ROLE 등급
                .build();

        return userDetails;
    }


    // 관리자 등록
    public boolean doSignupPost(AdminDto adminDto){

        // 중복검사
        List< AdminEntity > adminEntityList  = adminEntityRepository.findAll();
        for( int i = 0 ; i < adminEntityList.size() ; i++ ) {
            AdminEntity a = adminEntityList.get(i);
            if( a.getAid().equals( adminDto.getAid() ) ) {
                return false;
            }
        }
        // insert
        AdminEntity savedEntity = adminEntityRepository.save(adminDto.toEntity());
        if(savedEntity.getAno() > 0) return true;
        return false;
    }

    // 관리자 로그인
    public AdminDto doLoginPost(AdminDto adminDto) {

        List< AdminEntity > adminEntityList  = adminEntityRepository.findAll();
        for( int i = 0 ; i < adminEntityList.size() ; i++ ){
            AdminEntity a = adminEntityList.get(i);

            if( a.getAid().equals( adminDto.getAid() ) ) {
                if (a.getApassword().equals(adminDto.getApassword())) {
                    a.setApassword("");
                    request.getSession().setAttribute("loginInfo", a.toDto());

                    return a.toDto();
                }
            }
        }

     return null;
    }

    // 관리자 아이디 중복검사
    public boolean duplicationCheck(String aid){
        List<AdminEntity> adminEntityList = adminEntityRepository.findAll();
        for( int i = 0 ; i<adminEntityList.size() ; i++ ){
            AdminEntity memberEntity = adminEntityList.get(i);
            if( memberEntity.getAid().equals( aid ) ){
                return false;
            }
        }
        return true;
    }

    // 관리자 아이디 찾기
    public String doFindId(String aname, String aemail){
        List<AdminEntity> adminEntityList = adminEntityRepository.findAll();
        for( int i = 0 ; i<adminEntityList.size() ; i++ ){
            AdminEntity memberEntity = adminEntityList.get(i);
            if( memberEntity.getAname().equals(aname) && memberEntity.getAemail().equals(aemail) ){
                String aid = memberEntity.getAid();
                return aid;
            }
        }
        return null;
    }

    // 관리자 비밀번호 찾기


    // 현재 로그인된 관리자 아이디 호출
    public AdminDto doLoginInfo() {
//        시큐리티 사용전
//        Object object = request.getSession().getAttribute("loginInfo");
//        if( object != null ){
//            return (AdminDto) object; // 강제형변환
//        }
//        return null;

        // 1. ( 시큐리티를 사용했을떄 ) Principal : 본인/주역/주체자 : 브라우저마다 1개
        Object object = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // 2. 만약에 로그인 상태가 아니면
        if( object.equals("anonymousUser" ) ){ return  null; } // anonymous : 익명 <--> 비로그인
        // 3. 로그인 상태이면 UserDetails 타입 변환
        UserDetails userDetails = (UserDetails)object;
        System.out.println("userDetails.getUsername() = " + userDetails.getUsername());
        // 4. 로그인 성공한 엔티티 찾기
        AdminEntity a = adminEntityRepository.findByAid( userDetails.getUsername() );
        System.out.println("test" + a);
        // 5. 회원정보( 비밀번호 제외 권장 ) 반환 ( 주로 다른 서비스나 리액트 사용중 )
        return AdminDto.builder()
                .aid(a.getAid()).ano(a.getAno()).aemail(a.getAemail()).aphone(a.getAphone()).gno(a.getGroupEntity().getGno())
                .build();
    }

    // 관리자 로그아웃
    public boolean doLogoutGet(){
//        request.getSession().setAttribute("loginInfo", null);
//        SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        SecurityContextHolder.clearContext();
        return true;
    }

    @Autowired private StudentEntityRepository studentEntityRepository;

    //학생 출력부분 페이지네이션에서 직접 걸려있음.


    // 로그인된 관리자 그룹 별 메뉴
    public List<MaincategoryDto> doGetHeaderMenu(){
        List<SubcategoryDto> subcategoryDtoList = doGetSidebarMenu();

        List<Integer> integerList = new ArrayList<>();
        for(SubcategoryDto a : subcategoryDtoList){
            integerList.add(a.getMcno());
        }

        Set<Integer> integerSet = new HashSet<>(integerList);
        integerList = new ArrayList<>(integerSet);

        // 관리자 그룹 별 메인 카테고리 가져오기
        List<MaincategoryDto> maincategoryDtoList = new ArrayList<>();
        for(Integer i : integerList){
            maincategoryDtoList.add(maincategoryService.doGetMainCategory(i));
        }
        return maincategoryDtoList;
    }

    public List<SubcategoryDto> doGetSidebarMenu() {
        AdminDto adminDto = doLoginInfo();
        System.out.println(adminDto);
        // 관리자 그룹 가져오기
        GroupDto groupDto = groupService.doGetGroup(adminDto.getGno());

        // 관리자 그룹별 서브카테고리(PK)가져오기
        List<AuthorityDto> authorityDtoList = authorityService.doGetAuthority(groupDto.getGno());

        List<SubcategoryDto> subcategoryDtoList = new ArrayList<>();
        // 관리자 서브 카테고리별 메인 카테고리 가져오기
        for(AuthorityDto a : authorityDtoList){
            subcategoryDtoList.add(subcategoryService.doGetSubCategory(a.getScno()));
        }
        return subcategoryDtoList;
    }

    public MaincategoryDto doFindMcno(String params) {
        System.out.println("params = " + params);
        List<SubcategoryEntity> subcategoryEntityList = subcategoryService.subcategoryEntityRepository.findAll();
        for(int i = 0; i<subcategoryEntityList.size(); i++){
            SubcategoryEntity subcategoryEntity = subcategoryEntityList.get(i);
            if(subcategoryEntity.getScurl().equals(params)){
                System.out.println("subcategoryEntity = " + subcategoryEntity);
                return subcategoryEntity.getMaincategoryEntity().toDto();
            }
        }
        return null;
    }
}
