import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pagination from '../pagenation/pagination.css'
import  '../css/StudentView_PN.css'
import ExcelUpload from '../member/ExcelUpload';
import { Link } from 'react-router-dom';
import * as xlsx from 'xlsx';
import icon_exel from '../img/icon_exel.png'
import icon_upload from '../img/icon_upload.png';
import icon_download from '../img/icon_download.png';


// 엑셀 정렬 순서 map 방식
let excelHeader = {학번:'학번',학생이름:'학생이름',성별:'성별',학년:'학년',생년월일:'생년월일',
                   이메일:'이메일',입교반:'입교반',계열:'계열',출신학교:'출신학교',연락처:'연락처',
                   주소:'주소',"":'',보호자성명:'보호자성명',보호자관계:'보호자관계',보호자연락처:'보호자연락처'};


const PaginationComponent = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    Data(page, size, search);
  }, [page, size, search]);

  const Data = async (pageNumber, pageSize, search) => {
    try {
      const response = await axios.get(`/entity?page=${pageNumber}&size=${pageSize}&sname=${search}`);
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    setPage(0);
    Data(0, size, search); 
  }

  const handleDelete = () =>{
    axios.post("/student/delete/delete.do", selectedStudents )
    .then(response =>{
      console.log(response);
      // 삭제 후에 데이터 다시 불러오기
      Data(page, size, search);
    })
    .catch(error=> {console.log(error);})
  }
  
  const toggleStudentSelection = (sno) => {
    const selectedIndex = selectedStudents.indexOf(sno);
    let newSelectedStudents = [...selectedStudents];
    if (selectedIndex === -1) {
      newSelectedStudents.push(sno);
    } else {
      newSelectedStudents.splice(selectedIndex, 1);
    }
    setSelectedStudents(newSelectedStudents);
  };

  let count = page*size;
  



  /*********************** 승택 추가 ****************************/
  const [ExcelUploadOpen, setExcelUploadOpen] = useState(false);
  const openExcelUploadModal = ( ) =>{ setExcelUploadOpen(true); }
  const closeExcelUploadModal = ( ) =>{setExcelUploadOpen(false); }

  const download = ( data ) =>{
    const today = new Date();
    const todayDate = `${today.getFullYear()}년${today.getMonth() + 1}월${today.getDate()}일`;

    const ws = xlsx.utils.json_to_sheet(data ,{header : 0, skipHeader:true})
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, "학원생목록_"+todayDate+".xlsx");
  }

  const doDownload = () =>{
      axios.get('/excel/student/get.do')
            .then( (r) => { 
                r.data.unshift(excelHeader); // 헤더 추가
                download(r.data);
            } )
            .catch( (e) => { console.log(e); } )
  }
  /*************************************************************/
  return (<>
    <div>
        <div className="studentView-header">
          <div>
            <button type="button" className="btn-type-upload" onClick={openExcelUploadModal}>
              <img className="excel-icon" src={icon_exel} />
              <img src={icon_upload} />
            </button>
          </div>
          <div>
            <button type="button" className="btn-type-upload" onClick={doDownload}>
              <img className="excel-icon" src={icon_exel} />
              <img src={icon_download} />
            </button>
          </div>
          <div className='searchBox'>
            학생 검색 : <input className='searchSTBox' type='text' value={search} onChange={(event)=> setSearch(event.target.value)}/>
          </div>
        </div> 
      
      <div className="btnWrap">
      <button type='button' onClick={() => { window.location.href = '/student/write' }}>등록</button>
      <button type='button' onClick={handleDelete}>삭제</button>
      </div>

      <div className='pagination_PN'>
        {Array.from(Array(totalPages).keys()).map((pageNum) => (
          <button key={pageNum} onClick={() => handlePageChange(pageNum)}>
            {pageNum + 1}
          </button>
        ))}
      </div>


      <table className='studentTable'>
        <thead></thead>
      <tbody>
      {data.map((data) => ( <>

        <tr className='tr1'>
           
           <td rowSpan="5" className='firstBox'>
               <input type="checkbox" 
                      name={`prodcheck_${data.sno}`} 
                      id={`prodcheck_${data.sno}`}
                      checked={selectedStudents.includes(data.sno)}
                      onChange={() => toggleStudentSelection(data.sno)} />
           </td>
           <td rowSpan="5" className='secondBox'>
              {data.sno}                                         </td>
           <td rowSpan="5" >
               <center>
               <div className="box-photo">
                   <img id="preview-image" src={"/image/"+ data.simage} alt="" className="photo"/>
               </div>
               </center>
           </td>
       </tr>
       <tr className='tr2'>
           <th className='defaultdata'>
               입교일
           </th>
           <td>
               2024-01-01
            </td>
           <th className='defaultdata'>
               학년
           </th>
           <td>
           <div className="grade">{data.sgrade}</div>                                   </td>
           <th className='defaultdata'>
               입교반
           </th>
           <td>
                시작반
           </td>
           <th className='defaultdata'>
               국어
           </th>
           <td>
                                                       </td>
       </tr>
       <tr className='tr3'>
           <th className='defaultdata'>
               학번
           </th>
           <td>
           <div className="id">{data.sid}</div>
             </td>
           <th className='defaultdata'>
               계열
           </th>
             <td>
             <div className="major">{data.smajor}</div>
             </td>
           <th className='defaultdata'>
               현재반
           </th>
           <td>
               {data.sclass}                                        </td>
           <th className='defaultdata'>
               수학
           </th>
           <td>
    
           </td>
       </tr>
       <tr className='tr4'>
           <th className='defaultdata'>
               이름
           </th>
             <td>
             <div className="name"><Link to={`/student/view/${data.sno}`} state={{ sno: data.sno }}> {data.sname} </Link></div>
             </td>
           <th className='defaultdata'>
               학과담임
           </th>
           <td>
               김영진
           </td>
           <th className='defaultdata'>
               숙소
           </th>
           <td>
                    </td>
           <th className='defaultdata'>
               탐구1
           </th>
           <td>
    
           </td>
       </tr>
       <tr className='tr5'>
           <th className='defaultdata'>
               성별
           </th>
           <td>
           <div className="gender">{data.sgender}</div>                                        </td>
           <th className='defaultdata'>
               전략담임
           </th>
           <td>
    
           </td>
           <th className='defaultdata'>
               부모님연락처
           </th>
           <td>
           <div className="pphone">{data.sparentphone}</div>
           </td>
           <th className='defaultdata'>
               탐구2
           </th>
           
       </tr>
       <tr>
       <td className='nullpage' ></td>
       </tr>
      
       </>
      ))}
      </tbody>
      </table>
      
    </div>
    <ExcelUpload isOpen={ExcelUploadOpen} onCancel={closeExcelUploadModal}/>
    </>
  );
};

export default PaginationComponent;