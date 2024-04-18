import style from "../css/error.css"

export default function Error403(props){
    return (<>
    <div className="error wrap">
        <div className="lock"></div>
        <div className="message">
            <h1>페이지에 대한 액세스가 제한되어 있습니다.</h1>
            <p>사이트 관리자에게 문의하세요.</p>
            <a href="/">HOME</a>
        </div>
    </div>
    </>)
}