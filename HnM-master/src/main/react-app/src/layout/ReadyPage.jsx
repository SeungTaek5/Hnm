import { Route, Routes } from "react-router-dom";
import style from "../css/error.css"

export default function ReadyPage(props){
    return (<>
    <div className="error wrap">
        <div className="lock"></div>
        <div className="message">
            <h1>페이지 준비중입니다.</h1>
            <p>사이트 관리자에게 문의하세요.</p>
            <a href="/">HOME</a>
        </div>
    </div>
    </>)
}