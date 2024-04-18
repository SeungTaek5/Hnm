import axios from 'axios';
import { useEffect, useState } from "react";
import style from "../css/ScheduleDrop.css";
import { useNavigate } from 'react-router-dom';

export default function ScheduleDrop(prop){
    // 시수디테일 state
    // const [scheduleBeforInfo,setScheduleBeforInfo]= useState({perHourSubInfo : [],classInfo:[]});
    const [perHourSubInfo,setPerHourSubInfo]= useState([]);
    const [classInfo,setClassInfo]= useState([]);
    const navgation = useNavigate();

    const dayList = ["월","화","수","목","금","토"];
    const classList = ["1교시","2교시","3교시","4교시","5교시","6교시","7교시","8교시","자주1","자주2","자주3"]


    useEffect(() => {
        let phno = window.location.pathname.split("/")[3];
        // let phno = 1
        axios.get("/schedule/findPerHourSub/get.do" ,{params : {phno : phno}})
        .then( response => {
            setPerHourSubInfo(response.data)
        },[])
        .catch(error=>{console.log(error)})

        axios.get("/schedule/findTermAndClass/get.do" ,{params : {phno : phno}})
        .then( response => {
            setClassInfo(response.data)
        },[])
        .catch(error=>{console.log(error)})

        // setScheduleBeforInfo({...scheduleBeforInfo})
    },[perHourSubInfo]);
    const draggables = document.querySelectorAll(".draggable");
    const containers = document.querySelectorAll(".container");

    containers.forEach(container => {
        container.addEventListener("dragover", e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientX);
            const draggable = document.querySelector(".dragging");
            if (afterElement === undefined) {
            container.appendChild(draggable);
            } else {
            container.insertBefore(draggable, afterElement);
            }
        });
    });

    function getDragAfterElement(container, x) {
        const draggableElements = [
            ...container.querySelectorAll(".draggable:not(.dragging)"),
        ];

        return draggableElements.reduce(
            (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            // console.log(offset);
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
            },
            { offset: Number.NEGATIVE_INFINITY },
        ).element;
    }

    const scheduleDrop = async (e)=>{
        let list = document.querySelectorAll(".dataWrap");
        let data = [];
        Array.from(list).map((day,index)=>{
            let week = parseInt(day.querySelector(".week").value)
            let classTime = parseInt(day.querySelector(".classTime").value)
            let classFk =parseInt(day.querySelector(".classFk").value)
            let scheduleNote = day.querySelector(".scheduleNote").value
            let phsno;
            if(day.querySelector(".container").childNodes.length > 0){
                phsno = parseInt(day.querySelector(".container .perHoirSub").value)
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
            <div className="container">
            {
                perHourSubInfo.map((perHourSub,index)=>{
                    return (<>
                        {
                            Array(perHourSub.perhour).fill().map(()=>{
                                return (<>
                                    <div 
                                        key={index}
                                        className="draggable dragBox" 
                                        draggable="true" 
                                        style={{backgroundColor:perHourSub.backgroundColor,color:perHourSub.fontColor}}
                                        onDragStart={(e)=>{e.target.classList.add("dragging");}}
                                        onDragEnd={(e)=>{e.target.classList.remove("dragging");}}
                                    >
                                        {perHourSub.nickname}
                                        <input type='hidden' className='perHoirSub' name='perHoirSub' value={perHourSub.phsno} />
                                    </div>
                                </>)
                            })
                        }
                    </>)
                })
            }
            </div>

            <div className='scrollWrap'>
                <div className='exelWrap'>
                    {
                        dayList.map((day,index)=>{
                            return (<>
                                <div className='dayBox' key={day+index}>
                                    <div className='dayTop'><h3>{day}요일</h3></div>
                                    <div className='dayBtm'>
                                        <div className='classWrap'>
                                            <div className='classTime'>반</div>
                                            {
                                                classInfo.map((classinfo,index)=>{
                                                    return (<>
                                                        <div key={classinfo.clname} className='clname containerBox'>{classinfo.clname}</div>
                                                    </>)
                                                })
                                            }
                                        </div>
                                        {
                                            classList.map((c,index1)=>{
                                                return (<>
                                                    <div className='timeLine' key={c+index1}>
                                                        <div className='classTime'>{c}</div>
                                                        {
                                                            classInfo.map((data,index2)=>{
                                                                return(<>
                                                                    <div className='containerWrap containerBox dataWrap'>
                                                                        <input type="hidden" className='week' value={index}/>
                                                                        <input type="hidden" className='classTime' value={index1+1}/>
                                                                        <input type="hidden" className='classFk' value={data.clno}/>
                                                                        <div className='container'></div>
                                                                        <div className='inputWrap'><input type="text" className='scheduleNote' name="" id="" placeholder='비고:강의실 등' /></div>
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

        <div className='btnWrap'>
            <button type='button' onClick={(e)=>{scheduleDrop(e)}}>등록</button>
            <button onClick={(e)=>{navgation("/perhour")}} type='button'>취소</button>
        </div>
    </>)
}