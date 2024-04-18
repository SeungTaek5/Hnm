import Modal from "react-modal";
import axios from "axios";
import React, {useState} from "react";

export default function SignUp(props){

    let {isOpen, onCancel} = props;
    const [Password, setPassword] = useState(false);
    const [duplicate, setDuplicate] = useState(false); // 중복되면 false

    const close = () =>{
        onCancel();
    }

    const rePassword = () =>{
        let password = document.querySelector('#apassword').value;
        let rePassword = document.querySelector('#rePassword').value;
        if(password === rePassword){
            setPassword(true);
        }
        else{
            setPassword(false);
        }
    }

    const onSignUp = () =>{
        const aid = document.querySelector('#aid').value;
        if(!/^[A-Za-z0-9][A-Za-z0-9]*$/.test(aid) || aid.length>=30){
            alert("아이디는 30글자이내 영어와 숫자만 입력가능합니다.");
            return;
        }
        if(duplicate === false){
            alert("아이디 중복확인을 해주세요.");
            return;
        }
        if(Password === false){
            alert("비밀번호를 확인해주세요.");
            return;
        }
        const signUpForm = document.querySelector('#signUpForm');
        const signUpFormData = new FormData(signUpForm);
        // 찍어보고 중복확인, 비밀번호 확인

        axios.post('/admin/signup/post.do', signUpFormData)
            .then((r) => {
                if (r.data) {
                    alert('회원가입 성공');
                    close();
                } else {
                    alert('회원가입 실패');
                }
            })
            .catch((e) => {
                console.log(e);
            })

    }

    const duplicationCheck = () =>{
        const aid = document.querySelector('#aid').value;
        if(!/^[A-Za-z0-9][A-Za-z0-9]*$/.test(aid) || aid.length>=30){
            alert("아이디는 30글자이내 영어와 숫자만 입력가능합니다.");
            return;
        }
        
        if(aid == ""){ return; }
        let info = {aid : aid};

        axios.get('/admin/duplicate/get.do' , {params : info})
                .then( (r) => {
                    if( r.data ){
                        alert('사용할 수 있는 아이디입니다.');
                        setDuplicate(true);
                    }else{
                        alert('중복된 아이디입니다.');
                    }
                } )
                .catch( (e) => { console.log(e); } )
    }

    return(
        <Modal 
        style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: "translate(-50%,-50%)",
              width : 500,
              height : 500,
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '0px'
            }
          }} 
            isOpen={isOpen}>
            <div className="popup-header">
                <h3 className="title">관리자 등록</h3>
            </div>
            <div className="popup-content">
            <form id="signUpForm" className="inner-modal">
                <table>
                    <tbody>
                        <tr>
                            <th>아이디</th>
                            <td>
                                <div className="flex-wrap">
                                    <input type="text" name="aid" id="aid" onChange={ ()=>{setDuplicate(false)} }/>
                                    <button type="button" className="duplicate" onClick={duplicationCheck}>중복확인</button>
                                </div>
                                </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td><input type="password" name="apassword" id="apassword"/></td>
                        </tr>
                        <tr>
                            <th>비밀번호확인</th>
                            <td><input type="password" id="rePassword" onChange={rePassword}/></td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td><input type="text" name="aname"/></td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td><input type="text" name="aphone"/></td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td><input type="text" name="aemail"/></td>
                        </tr>
                    </tbody>
                </table>
            </form>
            </div>
            <div className="signup-footer">
                <button type="button" className="btn-signup" onClick={onSignUp}>확인</button>
                <button className="btn-signup" onClick={close}>닫기</button>
            </div>
        
        </Modal>

    )
}