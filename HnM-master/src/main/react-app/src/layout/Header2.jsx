// img 가져오기
import logoImg from "../img/img_logo.png"
import iconAvatat from "../img/icon_avatat.png"

// css 가져오기
import headerCss from "../css/common.css"
import commonCss from "../css/layout.css"
import resetCss from "../css/reset.css"
import SideBar from "./SideBar"
import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { LoginInfoContext } from "../IndexPage"
import Main from "../admin/MainPage"
import MainPage from "../admin/MainPage"
import StudentPage from "../admin/StudentPage"
import ReadyPage from "./ReadyPage"
import AdminManagement from "../admin/AdminManagement"
import StudentView_PN from "../admin/StudentView"
import PaginationComponent from "../admin/StudentView_PN"
import RegStudent from "../member/RegStudent"
import StudentInfo from "../member/StudentInfo"
import ScheduleDrop from "../schedule/ScehduleDrop"
import CounselView from "../counsel/CounselView"
import CounselDetail from "../counsel/CounselDetail"
import CounselUpdate from "../counsel/CounselUpdate"
import PerHourView from "../schedule/PerHourView"
import PerHourRegist from "../schedule/PerHourRegist"
import CounselInsert from "../counsel/CounselInsert"

export default function Header2(props){
    const [mainCategoryList,setMainCategoryList] = useState([]);
    const [subCategoryList,setSubCategoryList] = useState([]);
    const [mcno,setMcno] = useState(0);
    const {logInInfo, setLogInInfo} = useContext(LoginInfoContext) // 로그인 정보 넘기기
    const navgation = useNavigate();

    console.log(logInInfo)
    if(isEmptyObj(logInInfo)){
        navgation("/login")
    }
    function isEmptyObj(obj)  {
        if(obj.constructor === Object
           && Object.keys(obj).length === 0)  {
          return true;
        }
        
        return false;
      }
    

    // 날짜 형 변환
    function getFormatDate(date){
        let year = date.getFullYear();              //yyyy
        let month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        let day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        let weekdate = `${year}-${month}-${day}`;
        let week = new Date(weekdate).getDay()
        if(week === 0){
            week = '일'
        } else if(week === 1){
            week = '월'
        } else if(week === 2){
            week = '화'
        } else if(week === 3){
            week = '수'
        } else if(week === 4){
            week = '목'
        } else if(week === 5){
            week = '금'
        } else if(week === 6){
            week = '토'
        }
        let hours = date.getHours(); // 시
        let minutes = date.getMinutes();  // 분
        return  `${weekdate}(${week}) ${hours}:${minutes}`;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
    }
    // useEffect(()=>{
    //     getMainCategoryList();
    //     getSubCategoryList();
    //     findMcno()
    // },[])

    function getMainCategoryList(){
        axios.get("/admin/headerMenu.do")
        .then((r)=>{
            setMainCategoryList(r.data)
        })
        .catch()
    }

    function getSubCategoryList(){
        axios.get("/admin/SidebarMenu.do")
        .then((r)=>{
            setSubCategoryList(r.data)
        })
        .catch()
    }

    function logOut(){
        axios.get("/admin/logout/get.do")
        .then((r)=>{
            if(r){
                alert("로그아웃 완료")
                setLogInInfo({})
                localStorage.removeItem("logInInfo")
                navgation("/login")
            } else {
                alert('로그아웃 실패')
            }
        }).catch()
    }

    function findMcno(){
        let url = window.location.pathname;
        let info = "/"+ url.split('/')[1];
        axios.get("/admin/mcno/get.do", { params : {path : info} })
        .then(r=>{
            setMcno(r.data.mcno)
        })
        .catch(e=>{
            console.log(e)
        })
    }

    function mcURL(mcno){
        let mainCategoryURL = '';
        if(mcno == 1){  // 학생원관리
            mainCategoryURL = '/student';
        } else if(mcno == 2){   // 출석부
            mainCategoryURL = '/7';
        } else if(mcno == 3){   // 성적실명제
            mainCategoryURL = '/test';
        } else if(mcno == 4){   // 생활관리
            mainCategoryURL = '/17';
        } else if(mcno == 5){   // 신청관리
            mainCategoryURL = '/27';
        } else if(mcno == 6){
            mainCategoryURL = '/adminManaging';
        } else if(mcno == 7){
            mainCategoryURL = '/7';
        }
        return mainCategoryURL;
    }

    return (<>
            <header id="header" className="area-header flexBox">
                <div className="leftBox flexBox">
                    <div className="logoBox">
                        <h1 className="title">
                            <Link to="/">
                                <img src={logoImg} alt="역사적사명기숙학원" />
                            </Link>
                        </h1>
                        <p>학원생관리 시스템</p>
                    </div>
                    <nav className="navigation-global">
                        <ul className="flexBox">
                            {
                                mainCategoryList.map(r=>{
                                    return (<>
                                        <li><Link onClick={()=>{setMcno(r.mcno)}} to={mcURL(r.mcno)}>{r.mcname+r.mcno}</Link></li>
                                    </>)
                                })
                                
                            }
                        </ul>
                    </nav>
                </div>

                <div className="contain-user-infor">
                    <p className="text-date">{getFormatDate(new Date)}</p>
                    <div className="box-user-infor">
                        <img src={iconAvatat} alt="" className="img-avatar" />{logInInfo.aname}님(최고관리자)
                        <button type="button" onClick={()=>{alert('준비중입니다.')}} className="btn-setting">설정</button>
                        <button type="button" onClick={logOut} className="btn-logout">로그아웃</button>
                    </div>
                </div>
            </header>
            <SideBar subMenu={mcno} subMenuList={subCategoryList} />
    </>)
}