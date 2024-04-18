import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function ScheduleRead(){

    const dayList = ['월', '화', '수', '목', '금', '토'];
    const classList = ['1교시','2교시','3교시','4교시','5교시','6교시','7교시','8교시','자주1','자주2','자주3'];

    let phno = window.location.pathname.split("/")[3]; ; // 테스트용

    const [perHourSubInfo, setPerHourSubInfo] = useState([]);
    const [classInfo, setClassInfo] = useState([]);
    const [scheduleInfo, setScheduleInfo] = useState([]);
    const navgation = useNavigate();

    useEffect( ()=>{ 
        
        let info = {phno : phno};
        // 반 가져오기
        axios.get('/schedule/findTermAndClass/get.do' , {params : info})
                .then( (r) => {
                    if( r.data ){
                        setClassInfo([...r.data]);
                    }else{
                        console.log("반이 없습니다");
                    }
                } )
                .catch( (e) => { console.log(e); } )

        // 시수 가져오기
        axios.get('/schedule//findPerHourSub/get.do' , {params : info})
                .then( (r) => {
                    if( r.data ){
                        setPerHourSubInfo([...r.data]);
                    }else{
                        console.log("시수가 없습니다");
                    }
                } )
                .catch( (e) => { console.log(e); } )

        // 시간표 가져오기
        axios.get('/schedule/read.do' , {params : info})
        .then( (r) => {
            if( r.data ){
                console.log("받아온 시간표 정보 " + JSON.stringify(r.data));
                setScheduleInfo([...r.data]);
            }else{
                console.log("시간표가 없습니다");
            }
        } )
        .catch( (e) => { console.log(e); } )
    }, []);


    function inputNname(stno, clno){
        for(let i=0; i<scheduleInfo.length; i++){
            if(scheduleInfo[i].stno == stno && scheduleInfo[i].clno == clno){
                return <div style={{
                    backgroundColor : scheduleInfo[i].backgroundcolor,
                    color : scheduleInfo[i].fontcolor
                }}>{scheduleInfo[i].nname}</div>;
            }
        }
        return <div><br/></div>;
    }

    function inputEtc(stno, clno){
        for(let i=0; i<scheduleInfo.length; i++){
            if(scheduleInfo[i].stno == stno && scheduleInfo[i].clno == clno){
                return <div>{scheduleInfo[i].etc}</div>
            }
        }
        return <div><br/></div>;
    }

    return (<>
        <div className='dragWrap'>

            <div className='scrollWrap'>
                <div className='exelWrap'>
                    {
                        dayList.map((day,dayindex)=>{
                            // console.log(day[dayindex])
                            return (<>
                                <div className='dayBox'>
                                    <div className='dayTop'><h3>{day}요일</h3></div>
                                    <div className='dayBtm'>
                                        <div className='classWrap'>
                                            <div className='classTime'>반</div>
                                            {
                                                classInfo.map((classinfo,classinfoindex)=>{
                                                    return (<>
                                                        <div key={classinfo.clname} className='clname containerBox'>{classinfo.clname}</div>
                                                    </>)
                                                })
                                            }
                                        </div>
                                        {
                                            classList.map((c,cindex)=>{
                                
                                                return (<>
                                                    <div className='timeLine'>
                                                        <div className='classTime'>{c}</div>
                                                        {
                                                            classInfo.map((data,index)=>{
                                                                return(<>
                                                                {/* {console.log(c[index])} */}
                                                                    <div className='containerWrap containerBox dataWrap'>
                                                                        <div className='inputWrap'>{inputNname((dayindex*11)+cindex+1, data.clno)}</div>
                                                                        <div className='inputWrap'>{inputEtc((dayindex*11)+cindex+1, data.clno)}</div>
                                                                    </div>
                                                                </>)
                                                            })
                                                        }
                                                    </div>
                                                </>)
                                            })
                                        }    
                                    </div>
                                </div>
                            </>)
                        })
                    }
                </div>
            </div>
        </div>
        <button type="button" onClick={(e)=>{navgation("/perhour")}}>뒤로가기</button>
    </>)
}