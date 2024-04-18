import * as xlsx from 'xlsx';
import React, { useEffect, useState } from 'react';
import icon_exel from '../img/icon_exel.png'
import download from '../img/download.png'
import axios from "axios";

export default function StudentCounselExel(props){ 
    
    const [lastDate, setLastDate] = useState(''); //장은경 작성 : 출력 마지막 날짜
    const [startDate, setStartDate] = useState(''); //장은경 작성 : 출력 시작 날짜
    const [downLoadArr, setDownLoadArr] = useState([]); //다운로드받을 상담내역

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const startMonth = String(today.getMonth()).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        const formattedLastDate = `${year}-${month}-${day}`;
        const formattedStartDate = `${(today.getMonth())==0 ? (year-1)+"-"+12 : year+"-"+startMonth}-${day}`;
        setLastDate(formattedLastDate);
        setStartDate(formattedStartDate);
    }, []);

    useEffect(()=>{
        getExelInfo();
    },[lastDate, startDate])

    //다운받을 내역 가져오기
    const getExelInfo=()=>{
        let info={
            sno :  props.sno,
            startdate : startDate,
            enddate : lastDate
        }

        axios.post("/excel/studentCounsel/get.do",info)
        .then(r=>{
            console.log(r.data);
            
            let newArr=[]
            r.data.map((v,i)=>{
                let content={
                    번호 : (i+1)
                }
                Object.assign(content, v);
                newArr.push(content);
            });
            console.log(newArr);
            setDownLoadArr(newArr);
        })
        .catch(e=>{
            console.log(e);
        })
    }
    
    //엑셀 다운로드
    const clickBtn=(arr)=>{
        let headerInfo={이름: props.sname,학번 : props.sid};

        // key와 value를 가로로 배치할 데이터 배열 생성
        const data = Object.keys(headerInfo).map(key => [key, headerInfo[key]]);
        console.log(data);

        const ws = xlsx.utils.aoa_to_sheet(data);

        // 'value' 데이터가 들어간 다음 행부터 데이터 추가
        xlsx.utils.sheet_add_json(ws, arr, { origin: {r: 3, c: 0} });

        // 번호 열에 대한 스타일 설정
        const range = xlsx.utils.decode_range(ws['!ref']);
        for (let i = range.s.r + 2; i <= range.e.r; i++) {
            const cellAddr = xlsx.utils.encode_cell({ r: i, c: 0 });
            if (!ws[cellAddr]) continue;
            ws[cellAddr].s = { alignment: { horizontal: 'center' } }; // 번호 열에 가운데 정렬 스타일 적용
            console.log(ws[cellAddr]); // 가운데 정렬 스타일이 제대로 적용되었는지 확인하기 위한 로그  
        }

        const wb = xlsx.utils.book_new();   //엑셀 객체
        xlsx.utils.book_append_sheet(wb, ws, "Sheet1"); //변환한 json을 엑셀 객체에 넣기
        xlsx.writeFile(wb, "Test.xlsx");    //실행 시 브라우저에서 파일 다운로드
    }

    return(<>
    <div class="counselExelwrap">
        <h3>● 상담내역</h3>
            
        <div class='counselExelPrint'>
                <div class="counselExleH">출력 기간 : </div>
                <input type="date" value={startDate} onChange={(e)=>{setStartDate(e.target.value)}}/> ~ <input type="date" value={lastDate} onChange={(e)=>{setLastDate(e.target.value)}}/>
            
            <button class="counselExelDownloadBtn" type='button' onClick={()=>{clickBtn(downLoadArr)}}>
                <img class="exel_img" src={icon_exel} />
                <img class="download_img" src={download} />
            </button>
        </div>
    </div>
    </>);

}