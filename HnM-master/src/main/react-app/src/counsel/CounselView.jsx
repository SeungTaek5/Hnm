import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useNavigate } from 'react-router-dom'


export default function CounselView(props) {
    const [pageDto, setPageDto] = useState({
        page: 1, count: 0, data: []
    });
    const [page,setPage]= useState(1);
    const [selectedItems, setSelectedItems] = useState([]);    
    const [sidValue, setSidValue] =useState();
    const [snameValue, setSnameValue] =useState();
    const [ctitleValue, setCtitleValue] =useState();


    const navigate = useNavigate();	    //장은경 작성 : 상세페이지 진입용

    const [searchValues, setSearchValues]= useState({a:"",b:"",c:""});
    //검색클릭시
    
    useEffect(() => {
        const info = { page:pageDto.page, view: 5, sid:searchValues.a, sname:searchValues.b, ctitle:searchValues.c };
        console.log(info)
        axios.get("/counsel/get.do", { params: info })
        .then(
            (response) => {
                console.log(response.data);
                setPageDto(response.data);
            }
        )
        .catch ((error)=>{
            console.log(error);
        });
    },[pageDto.page,searchValues])


    const handleChange = (event, value) => {
        pageDto.page=value;
        setPage({...pageDto});
      };
      
    const toggleCheckbox = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const deleteSelectedItems = async () => {
        try {
            const response = await axios.post("/counsel/delete.do",  selectedItems )
                                .then(response => {
                                    if(response){
                                        alert("삭제성공");
                                    }else{alert("삭제실패")}
                                },[])
            // fetchData(pageDto.page); // 삭제 후에 데이터를 다시 불러오기
            setSelectedItems([]); // 선택된 아이템들 초기화
        } catch (error) {console.error( error);}
    };

    

    return (
        <>
        <main className="area-content">
            <section className="contain-header">
                <h3 className="title">::::: <strong>상담일지</strong></h3>
                <form name="searchform">
                    <div className="contain-search-local">
                        <label>학번 :</label>
                        <input type="text" className="sid" name="sid" value={sidValue} onChange={(e)=> setSidValue(e.target.value)} />
                        <label>이름 :</label>
                        <input type="text" className="sname" name="sname" value={snameValue} onChange={(e)=> setSnameValue(e.target.value)} />
                        <label>제목 :</label>
                        <input type="text" className="ctitle"  name="ctitle" value={ctitleValue} onChange={(e)=> setCtitleValue(e.target.value)} />
                        <button type="button"  className="btn-type1" onClick={()=>{let values={ a : sidValue,  b : snameValue, c : ctitleValue  } ; setSearchValues(values);}}>검색</button>
                    </div>
                </form>
            </section>
            <section className="contain-body">
                <div className="cont-block">
                    <div className="pagination"><Pagination count={pageDto.count} page={pageDto.page} onChange={handleChange} /></div>
                    <div className="contain-utils">
                        <p className="total"></p>
                        <div className="box-button">
                            <button type="button" className="btn-type1" onClick={()=>{navigate("/counsel/counselInsert")} }>등록</button>
                            <button type="button" className="btn-type2" onClick={deleteSelectedItems}>삭제</button>
                        </div>
                    </div>
                </div>          
                <form>
                    <div className="table-type1">
                    <table >
                    <caption></caption>
                    <colgroup>
                        <col />
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                            <th>상담번호</th>
                            <th>구분</th>
                            <th>제목</th>
                            <th>이름</th>
                            <th>계열</th>
                            <th>상담선생님</th>
                            <th>등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                         {pageDto.data&&pageDto.data.map((counsel) => (
                            <tr key={counsel.cno}>
                                <td><input type="checkbox" name="prodcheck_0" id="prodcheck_0" value={counsel.cno} onChange={() => toggleCheckbox(counsel.cno)} /></td>
                                <td>{counsel.cno}</td>
                                <td>{counsel.cdivision}</td>
                                <td onClick={ ()=>{navigate("/counsel/counselDetail",{ state : {cno : counsel.cno} })} }>
                                    {counsel.ctitle}
                                </td>
                                <td>{counsel.sname}({counsel.sid})</td>
                                <td>{counsel.smajor}</td>
                                <td>{counsel.aname}</td>
                                <td>{counsel.centerdate}</td>
                            </tr>
                        ))} 
                    </tbody>
                </table>
                </div>
                <div className="cont-block">
                    <div className="pagination"><Pagination count={pageDto.count} page={pageDto.page} onChange={handleChange} /></div>
                    <div className="contain-utils">
                        <p className="total"></p>
                        <div className="box-button">
                            <button type="button" className="btn-type1" onClick={()=>{navigate("/counsel/counselInsert")} }>등록</button>
                            <button type="button" className="btn-type2" onClick={deleteSelectedItems}>삭제</button>
                        </div>
                    </div>
                </div>   
                </form>           
                </section>    
            </main>
        </>
    );
}
