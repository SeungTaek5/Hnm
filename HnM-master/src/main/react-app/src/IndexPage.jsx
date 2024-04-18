import React, { useEffect, useState } from "react"
import Login from "./member/Login";
import Header from "./layout/Header";
import Header2 from "./layout/Header2";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import PrivateRoute from "./layout/PrivateRoute";
import ScheduleDrop from "./schedule/ScehduleDrop";
import PaginationComponent from "./admin/StudentView_PN";
import StudentInfo from "./member/StudentInfo";
import RegStudent from "./member/RegStudent";
import Error403 from "./layout/Error403"
import Error404 from "./layout/Error404"

export const LoginInfoContext = React.createContext('');

export default function IndexPage(props){
    const [logInInfo,setLogInInfo] = useState({});

    useEffect(()=>{
      
      if(localStorage.logInInfo != undefined){
        setLogInInfo(JSON.parse(localStorage.logInInfo))
      }
    },[])

    function isEmptyObj(obj)  {
        // 객체 타입체크
        if(obj.constructor !== Object)  {
          return false;
        }
        
        // property 체크
        for(let prop in obj)  {
          if(obj.hasOwnProperty(prop))  {
            return false;
          }
        }
        
        return true;
      }

    return (<>
        <LoginInfoContext.Provider  value = { { logInInfo , setLogInInfo } }>
            <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Header/>} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/error403" element={<Error403/>} />
              <Route path="/error404" element={<Error404/>} />
            </Routes>
            </BrowserRouter>
        </LoginInfoContext.Provider>
    </>)
}