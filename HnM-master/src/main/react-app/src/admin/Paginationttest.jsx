import axios from "axios";
import { useEffect, useState } from "react";
import '../css/studentView.css'

import Pagination from "../pagenation/Pagination"; // 페이지네이션

export default function StudentView(){
    const [Page, setPage] = useState(1); // 페이지네이션
   
    const itemPerPage = 5; // 페이지네이션

    const [studentData, setStudentData]= useState([]);
   useEffect(()=>{
       
        axios.get('/admin/student_view')
        .then((r)=>{
            setStudentData(r.data)
        })
        .catch((e)=>{console.log(e)})
   },[]);
    
   //페이지네이션
   const RenderStudent = ({data}) => (
    <tbody>

    <tr>
       <td rowspan="5">
           <input type="checkbox" name="prodcheck_0" id="prodcheck_0"/>
       </td>
       <td rowspan="5">
           224                                        </td>
       <td rowspan="5" >
           <center>
           <div className="box-photo">

               <img id="preview-image" src="./images/img_noimage.jpg?refresh=1711700371" alt="" className="photo"/>
           </div>
           </center>
       </td>
   </tr>
   <tr>
       <th>
           입교일
       </th>
       <td>
           2024-01-01
        </td>
       <th>
           학년
       </th>
       <td>
       <div className="grade">{data.sgrade}</div>                                   </td>
       <th>
           입교반
       </th>
       <td>
            시작반
       </td>
       <th>
           국어
       </th>
       <td>
                                                   </td>
   </tr>
   <tr>
       <th>
           학번
       </th>
       <td>
       <div className="id">{data.sid}</div>
         </td>
       <th>
           계열
       </th>
         <td>
         <div className="major">{data.smajor}</div>
         </td>
       <th>
           현재반
       </th>
       <td>
           SH2                                        </td>
       <th>
           수학
       </th>
       <td>

       </td>
   </tr>
   <tr>
       <th>
           이름
       </th>
         <td>
         <div className="name">{data.sname}</div>
         </td>
       <th>
           학과담임
       </th>
       <td>
           김영진
       </td>
       <th>
           숙소
       </th>
       <td>
                </td>
       <th>
           탐구1
       </th>
       <td>

       </td>
   </tr>
   <tr>
       <th>
           성별
       </th>
       <td>
       <div className="gender">{data.sgender}</div>                                        </td>
       <th>
           전략담임
       </th>
       <td>

       </td>
       <th>
           부모님연락처
       </th>
       <td>
       <div className="pphone">{data.sparentphone}</div>
       </td>
       <th>
           탐구2
       </th>
       <td>

       </td>
   </tr>

 </tbody>

   );

    return(<>
    {/* 페이지네이션 */}
        <Pagination data={studentData}
        itemPerPage={itemPerPage}
        RenderComponent={RenderStudent}
        />
    </>)
}



// <div style={{ margin:50 }}>
//                                 <div className="img" >
//                                     이미지
//                                 </div>
//                                 <div className="mianInfo" style={{display:"flex"}}>
//                                     <div className="id">학번 : {data.sid}</div>
//                                     <div className="name">이름 : {data.sname}</div>
//                                     <div className="gender">성별 : {data.sgender}</div>
//                                     <div className="address">지역 : {data.saddress}</div>
//                                     <div className="grade">구분 : {data.sgrade}</div>
//                                     <div className="birth">생일 : {data.sbirth}</div>
//                                     <div className="email">이메일 : {data.semail}</div>
//                                 </div>

//                                 <div className="subInfo2" style={{display:"flex"}}>
//                                     <div className="class">반 : {data.sclass}</div>
//                                     <div className="major">계열 : {data.smajor}</div>
//                                     <div className="school">출신학교 : {data.sschool}</div>
//                                     <div className="phone">핸드폰번호 : {data.sphone}</div>
//                                 </div>
//                                 <div className="parentInfo" style={{display:"flex"}}>
//                                     <div className="pphone">부모님번호 : {data.sparentphone}</div>
//                                     <div className="pname">부모님이름 : {data.sparentname}</div>
//                                     <div className="prelation">관계 : {data.sparentrelation}</div>
//                                 </div>
//                         </div>