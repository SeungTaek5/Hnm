import axios from "axios";
import React, {useState, useEffect} from "react";
import styles from "./ScheduleInsert.css"
import { useNavigate } from "react-router-dom";

export default function ScheduleInsert(){

    const dayList = ['월', '화', '수', '목', '금', '토'];
    const classList = ['1교시','2교시','3교시','4교시','5교시','6교시','7교시','8교시','자주1','자주2','자주3']
    const arr = [{'닉네임':'홍길동', '시수':10, '기타':'등등'},
        {'닉네임':'구준표', '시수':5, '기타':'등등'},
        {'닉네임':'이승기', '시수':1, '기타':'등등'}];

    // let phno = 1;

    const [perHourSubInfo, setPerHourSubInfo] = useState([]);
    const [countList, setCountList] = useState([]);
    const [classInfo, setClassInfo] = useState([]);
    const navgation = useNavigate();

    useEffect( ()=>{ 
        let phno = window.location.pathname.split("/")[3]; 
        let info = {phno : phno};
        // 반 가져오기
        axios.get('/schedule/findTermAndClass/get.do' , {params : info})
                .then( (r) => {
                    if( r.data ){
                        //console.log("정보" + JSON.stringify(r.data));
                        setClassInfo([...r.data]);
                    }else{
                        console.log("반이 없습니다");
                    }
                } )
                .catch( (e) => { console.log(e); } )

        // 시수 가져오기
        axios.get('/schedule/findPerHourSub/get.do' , {params : info})
                .then( (r) => {
                    if( r.data ){
                        //console.log("정보" + JSON.stringify(r.data));
                        setPerHourSubInfo([...r.data]);

                        for(let i=0; i<r.data.length; i++){
                            countList.push({'nickname':r.data[i].nickname, 'perhour':0});
                        }
                        setCountList([...countList]);

                    }else{
                        console.log("시수가 없습니다");
                    }
                } )
                .catch( (e) => { console.log(e); } )

    }, []);

    const inputCountList = ()=>{

        for(let i=0; i<countList.length; i++){
            countList[i].perhour = 0;
        }
        for(let i=0; i<dayList.length; i++){
            for(let j=0; j<classList.length; j++){
                for(let k=0; k<classInfo.length; k++){               
                    if(!document.querySelector(`#input-${dayList[i]}-${classList[j]}-${classInfo[k].clname}`).value){
                        continue;
                    }
                    else{
                        for(let l=0; l<countList.length; l++){
                            if(document.querySelector(`#input-${dayList[i]}-${classList[j]}-${classInfo[k].clname}`).value == countList[l].nickname){
                                countList[l].perhour++;
                            }
                        }
                    }
                }
            }
        }
        setCountList([...countList]);
    }

    const schedulePost = async (e)=>{

        let resultCount = 0;
        for(let i=0; i<perHourSubInfo.length; i++){
            for(let j=0; j<countList.length; j++){
                if(perHourSubInfo[i].nickname==countList[j].nickname && perHourSubInfo[i].perhour == countList[j].perhour){
                    resultCount ++;
                }
            }
        }
        if(resultCount == countList.length){
            console.log("일치합니다")
        }
        else{
            alert("시수표와 일치하도록 시간표 등록을 해주세요.");
            return;
        }
        
        let list = document.querySelectorAll(".dataWrap");
        let data = [];
        Array.from(list).map((day,index)=>{
            let week = parseInt(day.querySelector(".week").value)
            let classTime = parseInt(day.querySelector(".classTime").value)
            let classFk =parseInt(day.querySelector(".classFk").value)
            let scheduleNote = day.querySelector(".scheduleNote").value
            let phsno;
            if(day.querySelector(".inputData").value){
                for(let i=0; i<perHourSubInfo.length; i++){
                            if(day.querySelector(".inputData").value == perHourSubInfo[i].nickname){
                                phsno = perHourSubInfo[i].phsno
                            }
                        }
            }
            data.push({clno : classFk, stno : (week*11)+classTime, etc: scheduleNote,phsno:phsno})

        })
        await axios.post("/schedule/post.do",data)
        .then(r=>{
            console.log(r)
            navgation("/perhour")
        })
        .catch()
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
                                            <div className='classTime'></div>
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
                                                                        {/* <div>{index}</div> */}
                                                                        <input type="hidden" className='week' value={dayindex}/>
                                                                        <input type="hidden" className='classTime' value={cindex+1}/>
                                                                        <input type="hidden" className='classFk' value={data.clno}/>
                                                                        <div className='inputWrap'><input type="text" className="inputData" onChange={inputCountList} id={`input-${day}-${c}-${data.clname}`}/></div>
                                                                        <div className='inputWrap'><input type="text" className="scheduleNote" id="" placeholder='비고:강의실 등' /></div>
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
        
        <div className="comparePerHour">
            <div className="perHour1">
                <div className="textBold">시수표</div> <hr />
                {
                    perHourSubInfo.map((p, i) => {
                        return (<>
                            <div>{p.nickname} : {p.perhour}</div>

                        </>);

                    })
                }
            </div>
        
            <div className="perHour2">
                <div className="textBold">입력한 시수</div> <hr />
                {
                    countList.map((c, i) => {
                        return (<>
                            <div>{c.nickname} : {c.perhour}</div>
                        </>);

                    })
                }
            </div>
        </div>

        <div className='btnWrap perHourBtn'>
            <button type='button' onClick={(e)=>{schedulePost(e)}}>등록</button>
            <button onClick={(e)=>{navgation("/perhour")}} type='button'>취소</button>
        </div>
    </>)
}