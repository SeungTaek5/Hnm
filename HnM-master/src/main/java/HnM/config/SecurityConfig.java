package HnM.config;

import HnM.model.dto.AdminDto;
import HnM.model.entity.AdminEntity;
import HnM.model.entity.SubcategoryEntity;
import HnM.model.repository.AdminEntityRepository;
import HnM.service.AdminService;
import HnM.service.SubcategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    AdminService adminService;
    @Autowired
    SubcategoryService subcategoryService;
    @Autowired
    AdminEntityRepository adminEntityRepository;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)throws Exception {
        http.csrf().disable();
        // 1. HTTP 요청에 따른 부여된 권한/상태 확인후 PATH/자원 허가 제한
        List<SubcategoryEntity> subcategoryEntityList = subcategoryService.doGetSubCategoryAll();
//        for(SubcategoryEntity se : subcategoryEntityList){
//            http.authorizeHttpRequests(HTTP허가관련매개변수->{
//                HTTP허가관련매개변수
//                    .requestMatchers(AntPathRequestMatcher.antMatcher(se.getScname()+"/**")).hasAnyRole()
//                    .requestMatchers(AntPathRequestMatcher.antMatcher(se.getScurl())).hasAnyRole("SB"+se.getScno());
//            });
//        }
        http.authorizeHttpRequests(
                HTTP허가관련매개변수->
                        HTTP허가관련매개변수
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/student")).hasAnyRole("SB1")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/student/**")).hasAnyRole("SB1")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/paid")).hasAnyRole("SB2")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/paid/**")).hasAnyRole("SB2")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/3")).hasAnyRole("SB3")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/4")).hasAnyRole("SB4")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/perhour")).hasAnyRole("SB5")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/perhour/**")).hasAnyRole("SB5")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/6")).hasAnyRole("SB6")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/class")).hasAnyRole("SB7")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/class/**")).hasAnyRole("SB7")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/8")).hasAnyRole("SB8")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/9")).hasAnyRole("SB9")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/10")).hasAnyRole("SB10")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/term")).hasAnyRole("SB11")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/term/**")).hasAnyRole("SB11")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/12")).hasAnyRole("SB12")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/13")).hasAnyRole("SB13")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/14")).hasAnyRole("SB14")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/counsel")).hasAnyRole("SB15")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/counsel/**")).hasAnyRole("SB15")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/16")).hasAnyRole("SB16")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/17")).hasAnyRole("SB17")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/18")).hasAnyRole("SB18")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/19")).hasAnyRole("SB19")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/20")).hasAnyRole("SB20")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/21")).hasAnyRole("SB21")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/22")).hasAnyRole("SB22")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/23")).hasAnyRole("SB23")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/24")).hasAnyRole("SB24")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/25")).hasAnyRole("SB25")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/26")).hasAnyRole("SB26")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/27")).hasAnyRole("SB27")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/28")).hasAnyRole("SB28")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/29")).hasAnyRole("SB29")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/30")).hasAnyRole("SB30")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/31")).hasAnyRole("SB31")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/adminManaging")).hasAnyRole("SB32")
                                .requestMatchers( AntPathRequestMatcher.antMatcher("/**") ).permitAll());
        System.out.println(http.authorizeHttpRequests().toString());

        // 2. 로그인 폼 커스텀 ( 기존 controller 매핑함수 주석/삭제 처리 )
        //http.formLogin( AbstractHttpConfigurer :: disable ); // 시큐리티가 제공하는 로그임 폼을 사용안함.
        http.formLogin( // AXIOS,AJAX 사용시 contentType : form
                로그인관련매개변수
                        ->
                        로그인관련매개변수
                                .loginPage("/login")                        // 로그인을 할 view url 정의
                                .loginProcessingUrl("/admin/login/post.do")      // 로그인을 처리할 url 정의 -----> controller[X] ----> loadUserByUsername
                                .usernameParameter("aid")                      // 로그인에 사용할 id 변수명      -----> loadUserByUsername( 매개변수 )
                                .passwordParameter("apassword")                   // 로그인에 사용할 password 변수명 ----> X
                                //.defaultSuccessUrl("/")                         // 로그인 성공하면 반환될 url
                                //.failureForwardUrl("/member/login")             // 로그인 실패하면 반환될 url
                                // .successHandler( ( request:http요청객체, response:http응답객체, authentication:성공유저인증정보객체) -> { })
                                .successHandler( (request, response, authentication) -> {
                                    System.out.println("authentication = " + authentication.getName());
                                    AdminDto adminDto = adminEntityRepository.findByAid(authentication.getName()).toDto();
                                    adminDto.setApassword("");
                                    ObjectMapper objectMapper = new ObjectMapper();
                                    String json = objectMapper.writeValueAsString(adminDto);
                                    System.out.println(json);
                                    response.setContentType("application/json;utf-8");
                                    response.getWriter().print(json);
                                })
                                // .failureHandler( (request:http요청객체, response:http응답객체, exception:실패정보객체) -> {} )
                                .failureHandler( (request, response, exception) -> {
                                    System.out.println("exception = " + exception.getMessage() ); // 실패 예외 이유
                                    response.setContentType("application/json;utf-8");
                                    response.getWriter().print("false");
                                })
        );
        // 3. 로그아웃 커스텀 ( 기존 controller 매핑함수 주석/삭제 처리 )
        http.logout().disable();
//        http.logout(
//                로그아웃관련매개변수 ->
//                        로그아웃관련매개변수
//                                .logoutRequestMatcher(  new AntPathRequestMatcher("/admin/logout.do","POST") ) // 로그아웃 처리 요청 url
//                                .logoutUrl("/admin/logout.do")
//                                .logoutSuccessUrl("/login")  // 로그아웃 성공시 이동할 url
//                                .invalidateHttpSession(true) // 세션 초기화
//                                .deleteCookies("JSESSIONID")
//                                .permitAll()
//        );

        // 4. csrf( post,put 요청 금지 ) 공격 방지 : 특정(인증/허가) url만 post,put 가능하도록
        // http.csrf(AbstractHttpConfigurer :: disable ); // csrf 사용안함. // 개발작업시

        // 5. 로그인 처리에 필요한 서비스를 등록
        http.userDetailsService(adminService);
        http.exceptionHandling((exceptionConfig) ->
                exceptionConfig
                        .accessDeniedHandler(
                                (request, response, accessDeniedException) -> {
                                    response.sendRedirect("/error403");
                                }
                        ) );
        return http.build();
    }

    // 2. 시큐리티가 패스워드 검증할때 사용할 암호화 객체
    @Bean // 해당 메소드를 스프링 컨테이너 등록
    public PasswordEncoder encoder(){  return new BCryptPasswordEncoder(); }

    /*AuthenticationManager 스프링 시큐리티의 인증을 담당*/
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
