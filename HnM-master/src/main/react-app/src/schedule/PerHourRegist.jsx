import { useState, useEffect } from "react";
import axios from "axios";
import '../css/PerhourRegist.css';
import { Form } from "react-router-dom";

export default function PerHour(props) {
    const [perhour, setPerhour] = useState('');
    const [selectedTerm, setSelectedTerm] = useState('');
    const [termList, setTermList] = useState([]);
    const [selectedNickname, setSelectedNickname] = useState('');
    const [nicknameList, setNicknameList] = useState([]);
    const [perHourSubList,setPerHourSubList] = useState([]);
    const [phsBackground,setPhsBackground] = useState('');
    const [phsFont,setPhsFont] = useState('');

    useEffect(() => {
        // 학기 목록 가져오기   
        axios.get('/perhour/perhourwithterm')
            .then(response => {
                setTermList(response.data);
            })
            .catch(error => {
                console.error('학기 목록을 가져오는 중 에러 발생:', error);
            });

        // 닉네임 목록 가져오기
        axios.get('/perhoursub/nickname/all')
            .then(response => {
                setNicknameList(response.data);
            })
            .catch(error => {
                console.error('닉네임 목록을 가져오는 중 에러 발생:', error);
            });
    }, []);

    const onChangePerhour = (event) => {
        setPerhour(event.target.value);
    }

    const onChangeTerm = (event) => {
        setSelectedTerm(event.target.value);
    }

    const onChangeNickname = (event) => {
        setSelectedNickname(event.target.value);
    }

    const addPerHourSubList = ()=>{
        console.log(selectedNickname)
        console.log(perhour)
        perHourSubList.push({nno: selectedNickname,perhour:perhour,fontColor:phsFont, backgroundColor: phsBackground})
        setPerHourSubList([...perHourSubList])
        console.log(perHourSubList)

    }

    const onRegist = () => {
        // 학기와 닉네임을 이용하여 데이터 전송
        if (!selectedTerm || !selectedNickname) {
            alert("학기와 강사를 모두 선택하세요.");
            return;
        }

        let data = { tno : selectedTerm , perHourSubDtoList : perHourSubList };
        console.log(data);

        axios.post('/perhour/regist.do',data)
            .then(response => {
                console.log(response);
                if (response.data) {
                    alert("등록에 성공했습니다.");
                } else {
                    alert("등록에 실패했습니다. 관리자에게 문의하세요.");
                }
            })
            .catch(error => {
                console.error('등록 에러:', error);
                alert("등록에 실패했습니다. 관리자에게 문의하세요.");
            });
    }

    return (
        <>
        <h1 className="titleperhour">시수 등록</h1>
            <table className="perhourRegistTable">
                <thead></thead>
                <tbody>
                    <tr className="term">
                        <td className="termfont">학기 선택  
                            <select value={selectedTerm} onChange={onChangeTerm} className="termSelect">
                                <option value="">학기를 선택하세요</option>
                                {termList.map(term => (
                                    <option key={term.tno} value={term.tno}>{term.tname}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr className="teacher">
                        <td className="teachermfont">강사 선택   
                            <select value={selectedNickname} onChange={onChangeNickname} className="teacherSelect">
                                <option value="">강사를 선택하세요</option>
                                {nicknameList.map(nickname => (
                                    <option key={nickname.nno} value={nickname.nno}>{nickname.nname}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="perhour">
                            시수  <input type="text" value={perhour} onChange={onChangePerhour} />
                        </td>

                        <td className="perhour">
                            배경색  <input type="color" value={phsBackground} onChange={(e)=>{setPhsBackground(e.target.value)}} />
                        </td>

                        <td className="perhour">
                            폰트색  <input type="color" value={phsFont} onChange={(e)=>setPhsFont(e.target.value)} />
                            <button className="perhourButton" type="button" onClick={addPerHourSubList}>추가</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="perhourButton" type="button" onClick={onRegist}>등록</button>
            {
                perHourSubList.map(perhourSub =>{
                    return (<><div>강사 : {perhourSub.nno} , 시수 : {perhourSub.perhour} , 배경색 : {perhourSub.backgroundColor} , 폰트색 : {perhourSub.fontColor} </div></>)
                })
            }
        </>
    );
}