import axios from "axios";
import { useEffect, useRef, useState } from "react";
import StudentInfo from "./StudentInfo";
import styles from '../css/Student.css';
/*global daum*/

export default function EditStudent(props){

    const [studentInfo, setStudentInfo] = useState({ 
        sno:'', sid: '', sname: '', sgender: '', sgrade: '', sbirth: '',
        semail: '', sclass: '', smajor: '', sschool: '', sphone: '', saddress: '',
        sparentphone: '', sparentname: '', sparentrelation: '', simage: ''
    });
    const formRef = useRef(null);
    const [selectedClass, setSelectedClass] = useState('');
    const [classData, setClassData] = useState([]);
    const [previewImage, setPreviewImage] = useState('image/default.jpg');
    const sno = window.location.pathname.split("/")[3];
    console.log(classData)

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        axios.get("/student/info/get.do",{params: { sno: sno }})
            .then(response => {
                setStudentInfo(response.data);
                if (response.data.simage != null) {
                    setPreviewImage(`/image/${response.data.simage}`);
                }
                studentData();
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        const genderRadio = document.querySelector(`input[name="sgender"][value="${studentInfo.sgender}"]`);
        if (genderRadio) {
            genderRadio.checked = true;
        }
    }, [studentInfo.sgender]);

    const studentData = async () => {
        try {
            const response = await axios.get("/student/all/get.do");
            setClassData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

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

    const doEdit = () => {
        axios.put("/student/edit/put.do", formRef.current)
            .then(response => { 
                if (response.data) {
                    alert('수정성공')
                } else {
                    alert('수정에 실패하였습니다.')
                }
            })
            .catch(error => {
                console.log(error)
            })
    };

    function execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                document.getElementById('sample6_postcode').value = data.zonecode;
                document.getElementById("sample6_address").value = data.address;
                document.getElementById("sample6_detailAddress").focus();
            }
        }).open();
    }



        return(<>
         <section className="contain-header">
            <h3 className="title">::::: 학원생 <strong>수정</strong></h3>
        </section>
        <section className="contain-body">
        <form ref={formRef}>
            <div className="cont-head">
                <h4 className="title">● 기본정보</h4>
                <p name="sno" value={sno}>{sno}</p>
            </div>
            <article className="article-type1">
            <div className="regist-photo">
            {previewImage ? (
                    <img src={previewImage} alt="" style={{maxWidth: '200px'}} />
                ) : (
                    <img src={studentInfo.simage ? `/image/${studentInfo.simage}` : ''} alt="기존 이미지" style={{maxWidth: '200px'}} />
                )}
                <div className="box-form">
                            <p className="title">사진 업로드</p>
                            <label className="form-addfile"><input type="text"/> {/*<button type="button" className="btn-type2">파일첨부</button>*/} 
                            </label>
                            {/* <span className="text-infor">(jpg, gif, png 포맷)</span> */}
                            <input type="file" className="imgInput" name="sfile" onChange={handleImageChange} accept="image/*"/>                         
                </div>
            </div>          
            <table className="table-form" >
            <tbody>
            <tr>
                <th>
                    <label>
                        학번:
                    </label> 
                </th>
                <td>
                    <input  type="text" name="sid" disabled value={ studentInfo.sid} onChange= { (e) => setStudentInfo(...studentInfo,{sid:e.target.value}) }  />  
                </td>
                <th>
                    <label>
                        이름:
                    </label> 
                </th>
                <td> 
                    <input type="text" name="sname"  value={ studentInfo.sname } onChange= { (e) => setStudentInfo(...studentInfo,{sname:e.target.value} )} /> 
                </td>
            </tr>
            <tr>
                <th>
                    <label>
                    성별:
                    </label> 
                </th>
                <td>
                    <input className="man" type="radio" name="sgender" value="남자" onChange= { (e) => setStudentInfo({...studentInfo,sgender:e.target.value} )}/>남 
                    <input className="woman" type="radio" name="sgender" value="여자" onChange= { (e) => setStudentInfo({...studentInfo,sgender:e.target.value} )}/>여 
                </td>
                <th>
                    <label>
                    학년:
                    </label> 
                </th>
                <td> 
                    <input type="text" name="sgrade" value={ studentInfo.sgrade } onChange= { (e) => setStudentInfo({...studentInfo,sgrade:e.target.value} )} /> 
                </td>
            </tr>
            <tr>
                <th>
                    <label>
                        생년월일:
                    </label> 
                </th>
                <td>
                    <input type="date" name="sbirth"  value={studentInfo.sbirth}  onChange= { (e) => setStudentInfo( {...studentInfo,sbirth:e.target.value})}/>
                </td>
                <th>
                    <label>
                    이메일:
                    </label> 
                </th>
                <td> 
                    <input type="text" name="semail"  value={ studentInfo.semail } onChange= { (e) => setStudentInfo( {...studentInfo,semail:e.target.value} )} /> 
                </td>
            </tr>
            <tr>
                <th>
                    <label>
                        입학반:
                    </label> 
                </th>
                <td>
                {classData.length > 0 && (
                <select name="sclass" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                    {classData.map((Class) => (
                    <option key={Class.clno} value={Class.clno}>{Class.termEntityList.tname}/{Class.clname}</option>
                    ))}
                </select>
                )}
                </td>
                <th>
                    <label>
                    계열:
                    </label> 
                </th>
                <td> 
                <select value={studentInfo.smajor} name="smajor"  onChange= { (e) => setStudentInfo( {...studentInfo,smajor:e.target.value} )}>
                <option>인문</option>
                <option>자연</option>
                <option>예체능(인)</option>
                <option>예체능(자)</option>
                <option>직업</option>
                    </select><br/>
                </td>
            </tr>
            <tr>
                <th>
                    <label>
                    출신학교:
                    </label> 
                </th>
                <td>
                    <input type="text" value={ studentInfo.sschool } name="sschool"   onChange= { (e) => setStudentInfo( {...studentInfo,sschool:e.target.value} )}/> 
                </td>
                <th>
                    <label>
                    연락처 본인:
                    </label> 
                </th>
                <td> 
                    <input type="text" value={ studentInfo.sphone } name="sphone"  onChange= { (e) => setStudentInfo({...studentInfo,sphone:e.target.value} )} />
                </td>
            </tr>
            
            </tbody>
            </table>
            <table className="table-form">
                <tbody>
                    <tr>
                        <th>연락처(보호자)</th>
                        <td><input type="text" value={ studentInfo.sparentphone } name="sparentphone"  onChange= { (e) => setStudentInfo(  {...studentInfo,sparentphone:e.target.value})} /> </td>
                        <th>보호자이름</th>
                        <td><input type="text" value={ studentInfo.sparentname } name="sparentname" onChange= { (e) => setStudentInfo(  {...studentInfo,sparentname:e.target.value} )} /> </td>
                        <th>관계</th>
                        <td><input type="text" value={ studentInfo.sparentrelation } name="sparentrelation" onChange= { (e) => setStudentInfo( {...studentInfo,sparentrelation:e.target.value})} /> </td>
            
                        </tr>
                </tbody>
            </table>
            <table className="table-form">
                <tbody>
                <tr>
                    <th><label>주소</label></th>
                                    <td>
                                        <div className="contain-address">
                                            <input type="text"   id="sample6_postcode" placeholder="우편번호"/>
                                            <input type="button" className="btn-type2" onClick={execDaumPostcode} value="주소검색"/><br/>
                                            <input type="text" name="saddress" value={ studentInfo.saddress } onChange= { (e) => setStudentInfo(  {...studentInfo,saddress:e.target.value})}  id="sample6_address" placeholder="주소"/><br/>
                                            <input type="text" name="saddress" id="sample6_detailAddress" placeholder="상세주소"/>
                                            <input type="text" name="saddress"  id="sample6_extraAddress" placeholder="참고항목"/>
                                        </div>
                                    </td>
                                </tr>
                </tbody>
            </table>

        </article>
            <div className="box-button-action">
                        <button type="button" className="btn-big-type1" onClick={ doEdit }>확인</button>
                        <button type="button" className="btn-big-type2">취소</button>
            </div>
            {/* <Link to="/student/view">취소</Link> */}
            </form>
            </section>
        </>);
    
}

