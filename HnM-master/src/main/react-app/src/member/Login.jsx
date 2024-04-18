import axios from "axios";
import React, {useContext, useState} from "react";
import Modal from "react-modal";
import SignUp from "./SignUp";
import { LoginInfoContext } from "../IndexPage";
import FindId from "./FindId";
import FindPassword from "./FindPassword";
import loginCss from "../css/login.css"
import resetCss from "../css/reset.css"
import { useNavigate } from "react-router-dom";
import icon_logo from '../img/img_logo_login.png'
import icon_logo_text from '../img/img_log_login_text.png'
import icon_login1 from '../img/icon_login1.png'

export default function Login(props){
    const [signUpOpen, setSignUpOpen] = useState(false); // 회원가입용
    const [findIdOpen, setFindIdOpen] = useState(false); // 아이디찾기용
    const {logInInfo, setLogInInfo} = useContext(LoginInfoContext) // 로그인 정보 넘기기
    const [findPasswordOpen, setFindPasswordOpen] = useState(false); // 비밀번호찾기용
    const navgation = useNavigate();

    const openSignUpModal = ( ) =>{ setSignUpOpen(true); }
    const openFindIdModal = ( ) =>{ setFindIdOpen(true); }
    const openFindPasswordModal = ( ) =>{ setFindPasswordOpen(true); }
    const closeModal = () =>{
        setSignUpOpen(false);
        setFindIdOpen(false);
        setFindPasswordOpen(false);
    }

    const onLogin = ( ) => {
        //const loginPath = document.querySelector('#loginPath').value;

        const loginForm = document.querySelector('#loginForm');
        const loginFormData = new FormData( loginForm );


        axios.post( '/admin/login/post.do' , loginFormData)
            .then( (r) => {
                console.log(r.data)
                if( r.data){
                    alert('로그인 성공');
                    setLogInInfo(r.data);
                    localStorage.logInInfo = JSON.stringify(r.data);
                    navgation("/")
                }else{
                    alert('로그인 실패');
                }
            } )
            .catch( (e) => { console.log(e); } )

    }

    return (<>
        <div className="contain-login">
            <div className="login-header">
                <img src={icon_logo} />
                <img src={icon_logo_text} />
            </div>

            <div className="inner-contain">
                {/* <select id="loginPath" defaultValue={"학생"}>
                    <option value="학생">학생</option>
                    <option value="관리자">관리자</option>
                </select> */}
                <h2 className="title"> 관리자 로그인</h2>
                <form id="loginForm">
                    <input type="text" name="aid"/> <br/>
                    <input type="password" name="apassword" />
                    <button type="button" className="btn-login" onClick={ onLogin }>Login</button>
                </form>
                <div className="infor-links">
                    <a onClick={openSignUpModal}>관리자등록 &nbsp;&nbsp;|</a>
                    <a onClick={openFindIdModal}>아이디찾기 &nbsp;&nbsp;|</a>
                    <a onClick={openFindPasswordModal}>비밀번호찾기</a>
                </div>
            </div>
        </div>

        <SignUp isOpen={signUpOpen} onCancel={closeModal}/>
        <FindId isOpen={findIdOpen} onCancel={closeModal}/>
        <FindPassword isOpen={findPasswordOpen} onCancel={closeModal}/>


    </>);
}