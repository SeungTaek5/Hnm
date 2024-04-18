//url : /counselInsert

import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactModal from 'react-modal';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './layout/Header';
import SideBar from './layout/SideBar';
import AdminManagement from './admin/AdminManagement';
import Login from './member/Login';
import Paginationttest from './admin/Paginationttest'
import RegStudent from './member/RegStudent';
import EditStudent from './member/EditStudent';
import StudentView from './admin/StudentView';
import StudentInfo from './member/StudentInfo';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import StudentView_PN from './admin/StudentView_PN';
import IndexPage from './IndexPage';
import CounselView from './counsel/CounselView';
import CounselInsert from './counsel/CounselInsert';
import ExcelTest from './member/ExcelTest';
import ScheduleInsert from './schedule/ScheduleInsert';
import RegTerm from './term/RegTerm';
import ScheduleDrop from './schedule/ScehduleDrop';
import TermView from './term/TermView';
import StudentCounselExel from './member/StudentCounselExel';
import EditTerm from './term/EditTerm';
import ClassView from './term/ClassView';
import RegClass from './term/RegClass';
import EditClass from './term/EditClass';
// perhour text
import PerHourView from './schedule/PerHourView';
import PerHourRegist from './schedule/PerHourRegist';
import Paidacademyfee from './pay/Paidacademyfee';
import PerHourWithTerm from './schedule/PerHourWithTerm';
import PaidChart from './pay/PaidChart';
import ScheduleRead from './schedule/ScheduleRead';

ReactModal.setAppElement('#root');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
  {/* // <React.StrictMode> */}
  {/* 이승호 */}
  <IndexPage />
  {/* <ScheduleDrop/> */}

  {/* 장은경 */}
  {/* <AdminManagement /> */}
  {/* <CounselInsert /> */}
  {/* <CounselHeader/> */}
  {/* <StudentCounselExel /> */}

  {/* 오승택 */}
  {/* <Login /> */}
  {/* <ExcelTest /> */}
  {/* <ScheduleInsert /> */}
  {/*<ScheduleRead />*/}

  {/* 김병래 */}
  {/* <RegStudent/> */}
  {/* <StudentInfo/> */}
  {/* <EditStudent/> */}
  {/* <CounselView/> */}
  {/* <RegTerm/> */}
  {/* <TermView/> */}
  {/* <EditTerm/> */}
  {/* <ClassView/> */}
  {/* <RegClass/> */}
  {/* <EditClass/>   */}
    

  {/* 김동훈 */}
  {/* <StudentView_PN/> */}
  {/* <PaginationComponent/> */}
  {/* <StudentView_PN/> */}
  {/*<PerHourView/> */}
  {/*<PerHourRegist/> */}
  {/* <PerHour/> */}
  {/* <Paidacademyfee/> */}
  {/* <PaidChart/> */}
  {/* <PerHourWithTerm/> */}
  {/* // </React.StrictMode> */}
  </>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
