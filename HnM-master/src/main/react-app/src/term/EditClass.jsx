import { useEffect, useState } from "react";
import axios from 'axios'; 
import styles from '../css/Class.css';
import { useNavigate } from "react-router-dom";


export default function EditClass(props){
    const [className, setClassName] = useState('');
    const [selectedTerm, setSelectedTerm] = useState('');
    const [term, setTerm] = useState([]);
    const [classInfo,setClassInfo]= useState();
    const clno= window.location.pathname.split("/")[3];
    console.log(clno);
    const navgation = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get("/class/all/get.do");
            setTerm(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchData2 = async () => {
        try {
            const response = await axios.get("/class/info/get.do",{params: { clno: clno }});
            setSelectedTerm(response.data.termEntityList.tno);
            setClassName(response.data.clname);
        } catch (error) {
            console.log(error);
        }
    };

    

    useEffect(() => {
        fetchData(); 
        fetchData2();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const info = {
                tno: selectedTerm,
                clname: className,
                clno: clno
            };
            // 서버로 데이터 전송
            const response = await axios.post("/class/edit/post.do", info);
            if(response.data){
                alert("수정성공")
                navgation("/class")
            }else{
                alert('해당학기에 같은이름의 반 이미 존재합니다')
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <>
            <main className="area-content">
                <section className="contain-header">
                    <h3 className="title">::::: 입학반 
                        <strong>리스트</strong>
                    </h3>
                </section>
                <section className="contain-body">
                    <div className="cont-head">
                        <h4 className="title">● 수정</h4>
                    </div>
                </section>
                <form name="writeform" >
                    <article className="article-type1">
                        <div className="table-form">                        
                            <table>
                                <caption></caption>                     
                                <tbody>
                                    <tr>
                                        <th><label>학기</label></th>
                                        <td>
                                            <select name="tno_fk" value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
                                                {term.map((term) => (
                                                    <option key={term.tno} value={term.tno}>{term.tname}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>  
                                    <tr>
                                        <th><label>반</label></th>
                                        <td>              
                                            <input type="text" name="clname" id="clname" value={className} onChange={(e) => setClassName(e.target.value)} />
                                        </td>  
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="box-button-action">
                            <button type="button" onClick={handleSubmit} className="btn-big-type1">확인</button>
                            <button type="button" onClick={()=>{navgation("/class")}} className="btn-big-type2">취소</button>
                        </div>
                    </article>
                </form>
            </main>
        </>
    );
}
