import { useEffect, useRef, useState } from "react";
import axios from 'axios'; 
import { Link } from "react-router-dom";
import styles from '../css/Student.css';
import StudentInfo from "./StudentInfo";
/*global daum*/

export default function RegStudent(props){
    const [studentInfo,setStudentInfo]= useState({ sid : '',sname:'',sgender:'',sgrade:'',sbirth:'',
    semail:'',sclass:'',smajor:'',sschool:'',sphone:'',saddress:'',
    sparentphone:'',sparentname:'',sparentrelation:'' ,sfile:''})
    const [classData, setClassData] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedGender, setSelectedGender] = useState(''); // 성별 상태 추가
    const [previewImage, setPreviewImage] = useState('/image/default.jpg');
    
    const fetchData = async () => {
        try {
            const response = await axios.get("/student/all/get.do");  
            setClassData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        fetchData(); 
    }, []);
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const formRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);
    };

    const regStudent = () => {
        axios.post("/student/reg/post.do",formRef.current)
            .then(response => {
                if (response.data === 0) {
                    alert('등록되었습니다.');
                    window.location.href="/student"
                } else {
                    alert('등록에 실패하였습니다.');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    function execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 주소 정보를 받아와서 입력 필드에 설정
                document.getElementById('sample6_postcode').value = data.zonecode; // 우편번호
                document.getElementById("sample6_address").value = data.address; // 주소
                document.getElementById("sample6_detailAddress").focus(); // 상세주소 입력 필드로 포커스 이동
            }
        }).open();
    }

    // 학번 자동 부여
    useEffect(() => {
        const currentYear = new Date().getFullYear(); // 현재 연도 가져오기
        // 현재 연도를 기반으로 학번 생성
        const newSid = `${currentYear}-${Math.floor(10000 + Math.random() * 90000)}`;
        setStudentInfo(prevStudentInfo => ({
            ...prevStudentInfo,
        
            sid: newSid // 생성된 학번으로 설정
        }));
        console.log(newSid);
        console.log(StudentInfo.sid);
    }, []);

    return (
        
        <><script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
            <section className="contain-header">
                <h3 className="title">::::: 학원생 <strong>등록</strong></h3>
            </section>
            <section className="contain-body">
                <form ref={formRef}>
                    <div className="cont-head">
                        <h4 className="title">● 기본정보</h4>
                    </div>
                    <article className="article-type1">
                        <div className="regist-photo">
                            {previewImage && <img id="preivew-image" src={previewImage} alt="이미지 미리보기" style={{maxWidth: '200px'}} />}
                            <div className="box-form">
                                <p className="title">사진 업로드</p>
                                <label className="form-addfile">
                                    <input type="text"/> {/* <button type="button" className="btn-type2">파일첨부</button>*/} 
                                </label> 
                                <input type="file"className="btn-type2" name="sfile" onChange={handleImageChange} accept="image/*"/>                         
                            </div>
                        </div> 
                        <table className="table-form">
                            <tbody>
                                <tr>
                                    <th><label>학번:</label></th>
                                    <td><input type="text"  name="sid" value ={ studentInfo.sid }   readOnly  /></td>
                                    <th><label>이름:</label></th>
                                    <td><input type="text" name="sname"  value={ studentInfo.sname } onChange= { (e) => setStudentInfo({...studentInfo,sname:e.target.value} )}/></td>
                                    <th></th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th><label>성별:</label></th>
                                    <td>
                                        <input type="radio" name="sgender" value="남자" onChange={handleGenderChange}/>남 
                                        <input type="radio" name="sgender" value="여자" onChange={handleGenderChange} />여 
                                    </td>
                                    <th><label>학년:</label></th>
                                    <td><input type="text" name="sgrade" onChange= { (e) => setStudentInfo({...studentInfo,sgrade:e.target.value} )} /></td>
                                    <th></th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th><label>생년월일:</label></th>
                                    <td><input type="date" name ="sbirth" value={studentInfo.sbirth}  onChange= { (e) => setStudentInfo( {...studentInfo,sbirth:e.target.value})} /></td>
                                    <th><label>이메일:</label></th>
                                    <td><input type="text" name="semail"  value={ studentInfo.semail } onChange= { (e) => setStudentInfo( {...studentInfo,semail:e.target.value} )}/></td>
                                    <th></th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th><label>입학반:</label></th>
                                    <td>
                                        <select name="sclass" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                                            {classData.map((Class) => (
                                                <option key={Class.clno} value={Class.clno}>{Class.termEntityList.tname}/{Class.clname}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <th><label>계열:</label></th>
                                    <td> 
                                        <select name="smajor" onChange= { (e) => setStudentInfo( {...studentInfo,smajor:e.target.value} )}>
                                            <option>인문</option>
                                            <option>자연</option>
                                            <option>예체능(인)</option>
                                            <option>예체능(자)</option>
                                            <option>직업</option>
                                        </select><br/>
                                    </td>
                                    <th></th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th><label>출신학교:</label></th>
                                    <td><input type="text" name="sschool" value={ studentInfo.sschool } onChange= { (e) => setStudentInfo( {...studentInfo,sschool:e.target.value} )}/></td>
                                    <th><label>연락처 본인:</label></th>
                                    <td><input type="text" value={ studentInfo.sphone } name="sphone" onChange= { (e) => setStudentInfo({...studentInfo,sphone:e.target.value} )}/></td>
                                    <th></th>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table-form">
                            <tbody>
                                <tr>
                                    <th>연락처(보호자)</th>
                                    <td><input type="text" name="sparentphone" value={ studentInfo.sparentphone } onChange= { (e) => setStudentInfo(  {...studentInfo,sparentphone:e.target.value})}  /> </td>
                                    <th>보호자이름</th>
                                    <td><input type="text" name= "sparentname" value={ studentInfo.sparentname } onChange= { (e) => setStudentInfo(  {...studentInfo,sparentname:e.target.value} )} /> </td>
                                    <th>관계</th>
                                    <td><input type="text" name=" sparentrelation" value={ studentInfo.sparentrelation } onChange= { (e) => setStudentInfo( {...studentInfo,sparentrelation:e.target.value})} /> </td>
                                </tr>
                                <tr>
                                    <th><label>주소</label></th>
                                    <td>
                                        <div className="contain-address">
                                            <input type="text"   id="sample6_postcode" placeholder="우편번호"/>
                                            <input type="button" className="btn-type2" onClick={execDaumPostcode} value="주소검색"/><br/>
                                            <input type="text" name="saddress" value={ studentInfo.saddress } onChange= { (e) => setStudentInfo(  {...studentInfo,saddress:e.target.value})}  id="sample6_address" placeholder="주소"/><br/>
                                            <input type="text" name="saddress"  id="sample6_detailAddress" placeholder="상세주소"/>
                                            <input type="text" name="saddress"  id="sample6_extraAddress" placeholder="참고항목"/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </article>
                    <div className="box-button-action">
                        <button type="button" className="btn-big-type1" onClick={regStudent}>확인</button>
                        <button type="button" className="btn-big-type2" onClick={()=>{window.location.href="/student"}}>취소</button>
                    </div>
                </form>
            </section>
        </>
    );
}
