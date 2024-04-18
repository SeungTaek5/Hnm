import style from "../css/error.css"

export default function Error404(props){
    return (<>
    <div className="error wrap">
        <div className="lock"></div>
        <div className="message">
            <h1>페이지를 찾을 수 없습니다.</h1>
            <p>사이트 관리자에게 문의하세요.</p>
            <a href="/">HOME</a>
        </div>
    </div>
    </>)
}
