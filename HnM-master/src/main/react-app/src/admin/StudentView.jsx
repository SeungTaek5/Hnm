import axios from "axios";
import { useEffect, useState } from "react";

export default function StudentView(){

   const [studentData, setStudentData]= useState([]);

   useEffect(()=>{
        axios.get('/admin/student_view')
        .then((r)=>{console.log(r)
            setStudentData(r.data)
        })
        .catch((e)=>{console.log(e)})
   },[]);
    
    return(<>
    
        {
            studentData.map( (data)=>{
                return (<>
                        <div style={{ margin:50 }}>
                            <div className="img">
                                이미지
                            </div>
                            <div className="id">
                                학번 : {data.sid}
                            </div>
                            <div>
                                이름 : {data.sname}
                            </div>
                            <div>성별 : {data.sgender}</div>
                            <div>재수생 : {data.sgrade}</div>
                            <div>생일 : {data.sbirth}</div>
                            <div>이메일 : {data.semail}</div>
                            <div>반 : {data.sclass}</div>
                            <div>계열 : {data.smajor}</div>
                            <div>출신학교 : {data.sschool}</div>
                            <div>핸드폰번호 : {data.sphone}</div>
                            <div>지역 : {data.saddress}</div>
                            <div>부모님번호 : {data.sparentphone}</div>
                            <div>부모님이름 : {data.sparentname}</div>
                            <div>관계 : {data.sparentrelation}</div>

                        </div>
                </>)
            })
        }
    </>)
}