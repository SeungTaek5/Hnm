import axios from "axios";
import "../css/AdminManagement.css";
import { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';

export default function AdminList(props){

    const [nickNameModalOpen, setNickNameModalOpen] = useState(false);  //모달 상태
    const [nickNameRef,setNickNameRef] = useState([]);   //전체 닉네임 리스트
    let selectAno=useRef(); //선택한 관리자번호
    let oldNickname=useRef(); //기존 관리자 닉네임
    const [newNickname,setNewNickname] = useState("");  //새로운 닉네임 부여
    
    //관리자 단순 순서
    let no=1;
    //선택한 관리자 배열
    let deleteAdminList=props.adminCheck;

    //관리자 삭제
    let deleteAdmin=()=>{
        axios.post('/adminManaging/deleteAdmin/delete.do', deleteAdminList)
        .then((response)=>{
            if(deleteAdminList.length==0){
                alert("선택된 관리자가 없습니다.");
            }
            else{
                alert("관리자 삭제 성공");
                window.location.href="/adminManaging"
            }
        })
        .catch((error)=>{console.log(error);})
    }


    //별명 수정input에서 엔터 누르면
    const activeEnter=(e)=>{
        if(e.keyCode == 13){
            enterNickname(selectAno.current, e.target.value);
        }
    }

    //별명수정
    const enterNickname=async(ano,nname)=>{
        let nicknameInfo={
            ano : ano,
            nname : nname
        }
        
        await axios.post("/adminManaging/inputNickName/post.do", nicknameInfo)
        .then((response)=>{
        })
        .catch((error)=>{
            console.log(error);
        })
        setNewNickname("");
        setNickNameModalOpen(false);
    }

    //닉네임 가져오기
    useEffect(()=>{
        axios.get("/adminManaging/nickNameList/get.do")
        .then((response)=>{
            setNickNameRef(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })    
    }, [nickNameModalOpen])
        

    

    return(<> <table id="adminListTable">
    <thead>
        <tr>
            <th><input class="adminInfoCheck" type="checkbox"/></th>
            <th>순번</th>
            <th>아이디</th>
            <th>과목구분</th>
            <th>이름</th>
            <th>별명</th>
                                            
            <th>반</th>
            <th>과목</th>
            <th>전화번호</th>
            <th>이메일</th>
            <th>그룹</th>
        </tr>
    </thead>
    <tbody id="adminInfo">
        {props.adminList.map((list) => {
            return(<>
                <tr className={list.gname=="퇴사" ? "retire" : ""}>
                    <td>
                        <input class="adminInfoCheck" type="checkbox" value={list.ano} onChange={props.checkAdmin}/>                                      
                    </td>
                    <td>{no++}</td>
                    <td>{list.aid}</td>
                                                                    
                    <td></td>
                    <td>{list.aname}</td>
                    <td>{list.gno_fk==7 || list.gno_fk==9 ? 
                            <div class="adminNicknameDiv">
                                {/* 닉네임 표기 */}
                                {
                                    nickNameRef.map((nick)=>{
                                        if(nick.ano_fk==list.ano){
                                            return(<>
                                                <span className={`oldNick:${list.ano}`}>{nick.nname}</span>
                                            </>);
                                        }
                                        else{
                                            return(<></>);
                                        }
                                    })
                                }
                                {/* ---------- */}

                                <button class="nickUpdateBtn" type="button" onClick={()=>{selectAno.current=list.ano; setNickNameModalOpen(true); }}> 수정 </button>
                            </div> : ""}
                    </td>
                    
                                                            
                    <td></td>
                    <td></td>
                    <td>{list.aphone}</td>
                    <td>{list.aemail}</td>
                    <td>{list.gname}</td>
                </tr>  
            </>);
        })}
    </tbody>
</table>

<div class="adminDeleteBtnDiv">
    <button class="adminDeleteBtn" type="button" onClick={deleteAdmin} > 관리자 삭제 </button>
</div>

<Modal className="nickUpdateModal" isOpen={nickNameModalOpen}>
    <div class="isertNickHeader">별명등록</div>
    <div class="nickInner">
        <span class="newNick">새 별명 : </span><input type="text" 
                onChange={(e)=>{setNewNickname(e.target.value)}} 
                onKeyDown={activeEnter}/>
        
        <button onClick={()=>{enterNickname(selectAno.current,newNickname)}}>확인</button>
    </div>
    <div class="nickBtnBox">
        <button  onClick={()=> {setNickNameModalOpen(false); }}>취소</button>
    </div>
</Modal>
        
    </>);
}