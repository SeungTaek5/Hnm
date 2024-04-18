import axios from "axios";
import { useEffect, useState } from "react";
import '../css/PerHourView.css'
import { useNavigate } from "react-router-dom";

export default function PerHourView(props) {
    const [customdata, setCustomdata] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState('');
    const [perhourList, setPerhourList] = useState([]);
    const [btnContent, setBtnContent] =useState('');
    const navgation = useNavigate();

    useEffect(() => {
        // 페이지가 로드될 때 학기 목록을 불러오기
        axios.get('/perhour/perhourwithterm')
            .then(response => {
                console.log(response.data);
                setCustomdata(response.data);
            })
            .catch(error => {
                console.error('학기 목록을 가져오는 중 에러 발생:', error);
            });
    }, []);

    const onChangeTerm = (event) => {
        const selectedTermId = event.target.value;
        setSelectedTerm(selectedTermId);

        // 선택한 학기에 해당하는 시수 출력
        axios.get(`/perhoursub/regist/get.do?termId=${selectedTermId}`)
            .then(response => {
                console.log(response.data);
                setPerhourList(response.data);
            })
            .catch(error => {
                console.error('시수를 가져오는 중 에러 발생:', error);
            });
        
        const tno = document.querySelector('.selectBoxPerhourView').value;
        let info = {tno : tno};

        axios.get('/perhour/gettnoforfindschdedule' , {params : info})
        .then( (r) => {
            
            if(r.data){
                // console.log("테스트!!!!" + r.data);
                setBtnContent(<button type="button" className="perhourviewBtn" onClick={(e)=>{transferURL(3)}}>시간표 보기</button>);
            }
            else{
                // console.log("테스트!!!!" + r.data);
                setBtnContent(<div><button type="button" className="perhourviewBtn" onClick={(e)=>{transferURL(1)}}>시간표 등록 ver.1</button>
                                <button type="button" className="perhourviewBtn" onClick={(e)=>{transferURL(2)}}>시간표 등록 ver.2</button></div>);
  
        }} )
            .catch( (e) => { console.log(e); } )
        // setBtnContent(<div><button type="button" className="perhourviewBtn" onClick={(e)=>{transferURL(1)}}>시간표 등록 ver.1</button>
        //  <button type="button" className="perhourviewBtn" onClick={(e)=>{transferURL(2)}}>시간표 등록 ver.2</button></div>);

        // setBtnContent(<button type="button" className="perhourviewBtn" onClick={(e)=>{transferURL(3)}}>시간표 보기</button>);
    }

    const transferURL = (version) =>{
        const tno = document.querySelector('.selectBoxPerhourView').value;
        // console.log("버젼은?"+version);
        // console.log("tno는?" + tno);

        let info = {tno : tno};

        axios.get('/perhour/getphno' , {params : info})
                .then( (r) => {
                    if( r.data ){
                        if(r.data == 0){
                            alert("등록된 시수표가 없습니다")
                        }
                        else{
                            if(version<3){
                                navgation(`/perhour/schedule${version}/${r.data}`);
                            }
                            else{
                                window.location =`/perhour/scheduleview/${r.data}`;
                            }
                        }
                    }else{
                        console.log("시수 데이터 오류");
                    }
                } )
                .catch( (e) => { console.log(e); } )
    }
    return (
        <div className="wrap">
            <h1 className="titleperhour">시간표 등록</h1>
            <div className="flexBox"></div>
            <select value={selectedTerm} onChange={onChangeTerm} className="selectBoxPerhourView" defaultValue="0">
                <option value="">학기를 선택하세요</option>
                {customdata.map(term => (
                    <option key={term.tno} value={term.tno} className="termNo">{term.tname}</option>
                ))}
            </select>
            <button type="button" onClick={(e)=>{navgation("/perhour/write")}}>시수등록</button>
            <ul className="ulperhourView">
                {perhourList.map((item, index) => (
                    <li key={index} className="liperhourView">
                        <span>Nickname: {item.nname}</span>
                        <span>Per Hour: {item.perhour}</span>
                    </li>
                ))}
            </ul>
            
            {btnContent}
            {/* <button type="button" className="perhourviewBtn" onClick={(e)=>{transferURL(1)}}>시간표 등록 ver.1</button>
            <button type="button" className="perhourviewBtn" onClick={(e)=>{transferURL(2)}}>시간표 등록 ver.2</button>

            <button type="button" className="perhourviewBtn" onClick={(e)=>{transferURL(3)}}>시간표 보기</button> */}
        </div>
    );
}