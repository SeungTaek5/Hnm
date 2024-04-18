import axios from "axios";
import { useEffect, useState } from "react";
import StudentCounselExel from "./StudentCounselExel";
import styles from '../css/Student.css';
import { useNavigate } from 'react-router-dom'
import { Pagination } from "@mui/material";


//page url : /studentInfo
export default function StudentInfo(props){
    // 학생정보 state
    const [studentInfo,setStudentInfo]= useState('');
    //장은경 작성 : 상세페이지 진입용
    const navigate = useNavigate();
    //장은경 작성 : 페이지네이션용 useState
    const [pageDto,setPageDto]=useState({
        page : 1, count : 0, data : []
    });
    //장은경 작성 : 현재 페이지를 관리하는 state
    const [page, setPage]=useState(1);
    let view=4;

    let sno = window.location.pathname.split("/")[3];

    useEffect(() => {
    axios.get("/student/info/get.do" ,{params : {sno : sno}})
        .then( response => {
            setStudentInfo(response.data);
        },[])
        .catch(error=>{console.log(error)})
    },[]);

    //장은경 작성 : 학생 개별 상담내역 출력
    useEffect(()=>{
        const info={sno : sno, page : pageDto.page, view : view};

        axios.get("/student/counselInfo/get.do",{params : info})
        .then((response)=>{
            console.log(response.data)
            setPageDto(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[pageDto.page]);

    //장은경 작성 : 페이지 클릭시
    const handleChange = (event, value) => {
        pageDto.page=value;
        setPage({...pageDto});
      };

    

    return(<>
    <main className="area-content">
        <section class="contain-header">
            <h3 class="title">::::: 학원생 <strong>정보</strong></h3>
        </section>
        <section className="contain-body">
        <div class="box-photo">                                              
            <img className="photo" src={"/image/"+ studentInfo.simage}/>      
            <p className="name">{studentInfo.sname}
                {/* <button type="button" class="btn-type1"onClick={()=>{window.location.href=`/student/edit/${studentInfo.sno}`}}>수정</button> */}
            </p>                                         
            </div>
        <div className="cont-head">
            <h4 className="title">● 기본정보</h4>
        </div>
        <div className="table-type1 color-type1">
            <table>
                <caption></caption>
                <colgroup>
                        <col width="160"/>
                        <col width="125"/>
                        <col width="125"/>
                        <col width="125"/>
                        <col width="125"/>
                        <col width="125"/>
                        <col width="125"/>
                        <col width="125"/>
                        <col width=""/>
                        </colgroup>
                      <tbody>
                        <tr>
                          <th>학번</th>
                          <th>학년</th>
                          <th>성별</th>
                          <th>생년월일</th>
                          <th>출신학교</th>
                          <th>계열</th>      
                          <th>입교반</th>
                                                                        
                      </tr>
                      <tr>
                          <td>{studentInfo.sid}</td>
                          <td>{studentInfo.sgrade}</td>
                          <td>{studentInfo.sgender}</td>
                          <td>{studentInfo.sbirth}</td>
                          <td>{studentInfo.sschool}</td>
                          <td>{studentInfo.smajor}</td>                            
                          <td>{studentInfo.sclass}</td>
                                                                                
                      </tr>
                  </tbody>
                  </table>        
                    </div>
                    <div className="table-type1 color-type1">
                  <table>
                  <tbody>
                        <tr>
                            <th>연락처(본인)</th>
                            <th>이메일</th>
                            <th>연락처(부모)</th>
                            <th>주소</th>

                        </tr>
                        <tr>                            
                            <td>{studentInfo.sphone}</td>
                            <td>{studentInfo.semail}</td>
                            <td>{studentInfo.sparentname} ({studentInfo.sparentrelation} ) {studentInfo.sparentphone}</td>
                            <td className="address">
                                {studentInfo.saddress}                                                          
                            </td>                     
                        </tr>
                    </tbody>
            </table>
            </div>
        </section>
        </main>

        {/*  장은경 작성 : 학생 개별 상담내역 */}
        <div class="studentCounselWrap">
            
                <StudentCounselExel
                                sno={sno}
                                sname={studentInfo.sname}
                                sid={studentInfo.sid}/>

            <table className="studentCounsel">
                <thead>
                    <tr>
                        <th>순번</th>
                        <th>제목</th>
                        <th>상담일</th>
                        <th>구분</th>
                        <th>상담 선생님</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        pageDto.data.map((scList, i)=>{
                            return(<>
                                <tr>
                                    <td class="studentCounselCenterTd">{(Number(pageDto.page)-1)*view+i+1}</td>
                                    <td class="studentCounselTitle" onClick={ ()=>{navigate("/counsel/counselDetail",{ state : {cno : scList.cno} })}}>{scList.ctitle}</td>
                                    <td class="studentCounselCenterTd">{scList.centerdate}</td>
                                    <td class="studentCounselCenterTd">{scList.cdivision}</td>
                                    <td class="studentCounselCenterTd">{scList.aname}</td>
                                </tr>
                            </>);
                        })
                    }
                    
                </tbody>
            </table>

            <Pagination count={pageDto.count}
                        page={pageDto.page}
                        onChange={handleChange} />
        </div>
        {/* 장은경 작성 end */}
    </>)
}