import * as xlsx from 'xlsx';
import axios from "axios";

// 엑셀 정렬 순서 map 방식
let excelHeader = {학번:'학번',학생이름:'학생이름',성별:'성별',학년:'학년',생년월일:'생년월일',
                   이메일:'이메일',입교반:'입교반',계열:'계열',출신학교:'출신학교',연락처:'연락처',
                   주소:'주소',"":'',보호자성명:'보호자성명',보호자관계:'보호자관계',보호자연락처:'보호자연락처'};

// dto 방식
let studentHeader = {sid:'학번',sname:'학생이름',sgender:'성별',sgrade:'학년',sbirth:'생년월일',
                     semail:'이메일',sclass:'입교반',smajor:'계열',sschool:'출신학교',sphone:'연락처',
                     saddress:'주소',"":'',sparentname:'보호자성명',sparentrelation:'보호자관계',sparentphone:'보호자연락처'};

// map 방식 헤더 직접 지정 {header : order}
let order = ["학번","학생이름","성별","학년","생년월일","이메일","입교반","계열","출신학교","연락처","주소","","보호자성명","보호자관계","보호자연락처"];

export default function ExcelTest(){

    const arr = [{age : 10, gender:'Male', name:'홍길동'},
                 {age : 20, gender:'FeMale', name:'심청'},
                 {age : 30, gender:'Male', name:'곰돌이'}];

    // 키, 값, 객체, 배열 전부 새로 만들기?
    let value = "";
    let key = "";
    let obj = {};
    let array = [];

    value = arr[0].gender;
    key = arr[0].name;
    obj[key] = value;

    console.log(obj);

    const download = ( data ) =>{
        const today = new Date();
        console.log(today);
        const todayDate = `${today.getFullYear()}년${today.getMonth() + 1}월${today.getDate()}일`;
        console.log(todayDate);

        const ws = xlsx.utils.json_to_sheet(data ,{header : 0, skipHeader:true})
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
        xlsx.writeFile(wb, "학원생목록_"+todayDate+".xlsx"); // 저장 이름 바꿔야함
    }

    const dataTest = () =>{
        axios.get('/excel/student/get.do')
              .then( (r) => {
                  //console.log(r.data);
                  r.data.unshift(excelHeader); // 헤더 추가
                  //console.log(r.data);
                  download(r.data);
              } )
              .catch( (e) => { console.log(e); } )
    }

    const dataTest2 = () =>{

        const excel = document.querySelector('#excelFile');
        const file = excel.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = xlsx.read(data, { type: 'array' });

          // 첫 번째 시트를 가져옴
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];

          // 셀 데이터를 파싱하여 출력
          const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 0 });
          console.log(jsonData);

          axios.post('/excel/student/post.do', jsonData)
              .then( (r) => { console.log(r);
                  console.log(r.data + "명의 학생이 신규 등록되었습니다");
              } )
              .catch( (e) => { console.log(e); } )
        };

        reader.readAsArrayBuffer(file);

    }

    const upload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = xlsx.read(data, { type: 'array' });
    
          // 첫 번째 시트를 가져옴
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
          // 셀 데이터를 파싱하여 출력
          const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 0 });
          console.log(jsonData);
        };
    
        reader.readAsArrayBuffer(file);
      };

    return (<>
        <div>
            데이터 테스트
            <button type="button" onClick={dataTest}>데이터테스트</button>
        </div>

        <div>
            데이터 테스트2
            <button type="button" onClick={dataTest2}>데이터테스트2</button>
        </div>


        <div>
            엑셀 다운로드
            <button type="button" onClick={download}>download</button>
        </div>

        <div>
            엑셀 업로드
            <input type="file" id="excelFile" onChange={upload} />
        </div>
    </>)
}