//url : /counselUpdate

import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import '../css/counselInsert.css'
import SearchStudent from './SearchStudent';
import axios from 'axios';
import { resolvePath } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export default function CounselUpdate(props){
    const navigate = useNavigate();	//세부페이지 이동 시 사용 

    //useLocation으로 매개변수 받기
    const location = useLocation();
    const cno=location.state.cno;

    //state
    const [counselStudentModalIsOpen, setCounselStudentModalIsOpen] = useState(false);//학생선택 모달창
    const [selectStudent, setSelectStudent] =useState({});  //선택한 학생 정보
    const [loginInfo, setLoginInfo]= useState({});          //로그인한 admin 정보
    const [counselTitle, setCounselTitle]= useState("");    //상담제목 
    const [counselContent, setCounselContent]= useState("");    //상담 내용
    const [counselDivision, setCounselDivision]= useState("");    //상담 구분
    const [counselEnterDate, setCounselEnterDate]= useState("");    //상담 날짜
    console.log(selectStudent);
    
    console.log("수정페이지 실행");
    useEffect(()=>{
        //로그인정보 출력
        axios.get("/counsel/loginInfo/get.do")
        .then((response)=>{
            setLoginInfo(response.data);
        })
        .catch((error)=>{
        });

        //선택한 글의 학생정보 출력
        axios.get("/counsel/getStudentBySno/get/do", {params : {cno : cno}})
        .then((response)=>{
            setSelectStudent(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });

        //상담 제목/내용/구분/날짜
        axios.get("/counsel/getCounselInfo/get.do", {params : {cno : cno}})
        .then((response)=>{
            setCounselTitle(response.data.ctitle);
            setCounselContent(response.data.ccontent);
            setCounselDivision(response.data.cdivision);
            setCounselEnterDate(response.data.centerdate);
        })
        .catch((error)=>{
            console.log(error);
        });
        
    },[]);

    const counselEnter=()=>{
        // 유효성검사
        if(selectStudent.sid==undefined){
            alert("학생을 선택 해 주십시오.");
            return;
        }
        if(counselDivision=="선택"){
            alert("상담구분을 선택 해 주십시오");
            return;
        }
        if(counselEnterDate==""){
            alert("상담 날짜를 선택 해 주십시오.");
            return;
        }
        if(counselTitle==""){
            alert("제목을 입력 해 주십시오.");
            return;
        }

        let insertCounselInfo={
        cno : cno,
        ctitle : counselTitle,
        ccontent : counselContent,
        centerdate : counselEnterDate,
        cdivision : counselDivision,
        sid : selectStudent.sid,
        }

        axios.put("/counsel/updateCounsel/post.do", insertCounselInfo)
        .then((response)=>{
            if(response.data){
                alert("상담 수정 성공");
                navigate("/counsel/counselDetail",{state : {cno : cno}});
                
            }
            else{
                alert("상담 수정 실패");
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    

    return(<>
    <div id='counselInsertWrap'>
        
        <h3 class='cInsertH3'>● 수정</h3>  

        <div class='counselInsertWrap'>
            <div class='counselInner'>
                <div class='counselInsertInner'>
                    {/* 학번 */}
                    <div class='ciElement'>
                        <div class='cInsertIndexName'><div class='ciNameIcon'></div><div class='ciName'>학번</div></div>
                        <input 
                            class="selectStudentInput ciInput" 
                            type="text" value={selectStudent.sid==undefined? "" : selectStudent.sname+" ("+selectStudent.sid+") "+selectStudent.sgender} 
                            onClick={()=>{alert("검색아이콘을 이용해주세요")}}
                            readOnly />
                        <input class="searchImgBtn" type="button" onClick={()=> setCounselStudentModalIsOpen(true)}/>

                        <SearchStudent  counselStudentModalIsOpen={counselStudentModalIsOpen}
                                        setCounselStudentModalIsOpen={setCounselStudentModalIsOpen}
                                        setSelectStudent={setSelectStudent}/>

                    </div>

                    {/* 선생님(본인이름+전화번호) */}
                    <div class='ciElement'>
                        <div class='cInsertIndexName'>
                            <div class='ciNameIcon'></div>
                            <div class='ciName'>선생님</div>
                        </div>
                        <input class='ciInput' type="text" value={loginInfo.aid+" ("+loginInfo.aphone+")"} readOnly />
                    </div>

                    {/* 상담일 달력 */}
                    <div class='ciElement'>
                        <div class='cInsertIndexName'>
                            <div class='ciNameIcon'></div>
                            <div class='ciName'>상담일</div>
                        </div>
                        <input class='ciInput diEnterDate' type='date' value={counselEnterDate} onChange={(e)=>{setCounselEnterDate(e.target.value);}}/>
                    </div>
                </div>

                <div class='counselInsertInner'>
                    {/* 계열 select */}
                    <div class='ciElement'>
                        <div class='cInsertIndexName'>
                                <div class='ciNameIcon'></div>
                                <div class='ciName'>계열</div>
                        </div>
                        <input type='text' class='ciInput' value={selectStudent.smajor}/>
                    </div>

                    {/* 반 select */}
                    <div class='ciElement'>
                        <div class='cInsertIndexName'>
                            <div class='ciNameIcon'></div>
                            <div class='ciName'>반</div>
                        </div>
                        <input class='ciInput' type='text' value={selectStudent.sclass} />
                    </div>

                    {/* 부모연락처 text*3 (숫자 4개 유효성검사 넣기) */}
                    <div class='ciElement'>
                        <div class='cInsertIndexName'>
                            <div class='ciNameIcon'></div>
                            <div class='ciName'>부모연락처</div>
                        </div>
                        <input class='ciInput' type='text' value={selectStudent.sparentphone}/>
                    </div>

                    {/* 상담구분 select */}
                    <div class='ciElement'>
                        <div class='cInsertIndexName'>
                            <div class='ciNameIcon'></div>
                            <div class='ciName'>상담구분</div>
                        </div>
                        <select class='ciInput' value={counselDivision}onChange={(e)=>{setCounselDivision(e.target.value);}}>
                            <option>선택</option>
                            <option>성적</option>
                            <option>학습</option>
                            <option>생활</option>
                            <option>친구</option>
                            <option>부모</option>
                            <option>멘탈</option>
                            <option>기타</option>
                        </select>
                        </div>
                </div>
            </div>

            <div class="ci_inner">
                {/* 상담제목 */}
                <div class='ciElement'>
                    <div class='cInsertIndexName cInsertIndexTitle'>
                        <div class='ciNameIcon'></div>
                        <div class='ciName'>제목 :</div>
                    </div>
                    <input class='ciTitle' type='text' value={counselTitle} onChange={(e)=>{setCounselTitle(e.target.value);}} />
                </div>

                {/* 상담내용 */}
                <div class='ciContentDiv'>
                    <div class='cInsertIndexName'>
                        <div class='ciNameIcon'></div>
                        <div class='ciName'>상담내용</div>
                    </div>
                    <textarea class="ciContent" value={counselContent} onChange={(e)=>{setCounselContent(e.target.value);}}></textarea>
                </div>
            </div>
        </div> 

        <div class="ciBtnBox">
            <button class="ciEnterBtn" type='button' onClick={counselEnter}>확인</button>
            <button class="ciCancelBtn" type='button' onClick={()=>{navigate("/counsel/counselDetail",{state : {cno : cno}})}}>취소</button>
        </div>
    </div>
    </>);

}