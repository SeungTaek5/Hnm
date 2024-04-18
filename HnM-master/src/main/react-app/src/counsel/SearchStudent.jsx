
import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-modal';

export default function SearchStudent(props){
    const [sname, setSname]=useState("");
    const [studentInfo, setStudentInfo] =useState([]);  //불러온 학생 정보

    //학생 정보 검색
    const searchStudent=()=>{
        if(sname==""){
            alert("학생 이름을 입력 해 주십시오.");
            return;
        }
        axios.get(`/counsel/studentInfo/get.do?sname=${sname}`)
        .then((response)=>{
            setStudentInfo(response.data);
            if(response.data.length==0){
                alert("존재하지 않는 학생 이름입니다.");
            }
            setSname("");
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    //선택 학생 정보 저장
    const saveStudentInfo=(slist)=>{
        props.setSelectStudent(slist);
        props.setCounselStudentModalIsOpen(false);
    }

    return(<>    
        <Modal isOpen={props.counselStudentModalIsOpen} id='counselStudentSelect'>
            <div class="sSHeader">학생찾기</div>
            <div class="sStudentMain">
                <div class="sStudent_innerTop">
                    <div class='cInsertIndexName sSearchName'>
                        <div class='ciNameIcon'></div>
                        <div class='ciName'>이름</div>
                    </div>
                    <input id='searchStudentName' type='text' onChange={(event)=>{setSname(event.target.value)}}/>
                    <button type='button' onClick={searchStudent}>조회</button>
                </div>
                <div class="sSearch_inner">
                    {
                        studentInfo.map((slist)=>{   
                            return(<> 
                                <div class="sSearchResult">
                                    <div class="sSearchResult_inner">
                                        <div class="sSearchResult_element">{slist.sname}({slist.sid})</div>
                                        <div class="sSearchResult_element"> {slist.sgender}</div>
                                        <div class="sSearchResult_element"> {slist.sclass}</div>  
                                    </div>

                                    <button type='button' onClick={()=>{saveStudentInfo(slist);  setStudentInfo([]);}}>선택</button>                            
                                </div>
                            </>);                
                        })
                    }
                </div>
                <div class="sSearchCloseBtnBox">
                    <button class="sSearchCloseBtn" onClick={()=> {props.setCounselStudentModalIsOpen(false); setStudentInfo([]);}}>닫기</button>
                </div>
            </div>
        </Modal>
    </>);
}   