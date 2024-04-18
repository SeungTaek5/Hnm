import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../css/Term.css';
import { useNavigate } from "react-router-dom";

export default function EditTerm(props) {
    const [gbAllCheck, setGbAllCheck] = useState(false);
    const [checkedValues, setCheckedValues] = useState([]);
    const [termName, setTermName] = useState('');
    const [classData, setClassData] = useState([]);
    const tno =window.location.pathname.split("/")[3];
    console.log(tno);
    const navgation = useNavigate()

    useEffect(() => {
        
        axios.get("/term/info/get.do", { params: { tno: tno } })
            .then(response => {
                console.log(response.data);
                setTermName(response.data.tname);
                // 가져온 데이터에서 대상 반 정보를 설정
                setClassData(response.data.classEntity.map(classItem => classItem.clname));
                // 가져온 데이터를 기반으로 선택된 대상 반 설정
                const selectedClasses = response.data.classEntity.map(classItem => classItem.clname);
                setCheckedValues(selectedClasses);
            })
            .catch(error => { console.log(error); })
    }, []);

    function SetToAll() {
        const nTotalCheck = 26;
        const newCheckedValues = [];

        for (let i = 0; i < nTotalCheck; i++) {
          const nTarget = `target_ban_${i}`;
          const checkbox = document.getElementById(nTarget);
          
          if (checkbox) {
            checkbox.checked = !gbAllCheck;
            if (!gbAllCheck) {
              newCheckedValues.push(checkbox.value);
            }
          }
        }
      
        setGbAllCheck(!gbAllCheck);
        setCheckedValues(newCheckedValues);
    }
    function handleCheckboxChange(event) {
        const { checked, value } = event.target;
        let newCheckedValues = [...checkedValues];

        if (checked) {
            newCheckedValues.push(value);
        } else {
            newCheckedValues = newCheckedValues.filter(val => val !== value);
        }

        setCheckedValues(newCheckedValues);
    }

    function postTerm() {
        const info = { tno:tno, tname: termName, classList: checkedValues }
        console.log(info);
        axios.put("/term/put.do", info)
            .then(response => {
                if (response.status == 200) {
                    alert('수정 성공');
                    navgation("/term")
                } else {
                    alert('수정 실패')
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
        <main className="area-content">
            <section className="contain-header">
            </section>

            <section className="contain-body">
                <div className="cont-head">
                    <h4 className="title">● 수정</h4>
                </div>

                <form name="writeform">
                    <article className="article-type1">
                        <div className="table-form">
                            <table>
                                <tbody>
                                    <tr>
                                        <th><label>학기명</label></th>
                                        <td>
                                            <input type="text" name="tname" id="tname" value={termName} onChange={(e) => setTermName(e.target.value)} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    <tr>
                                        <th><label>대상 반</label></th>
                                        <td>
                                            <br />
                                            <input type="checkbox" onClick={SetToAll} name="" value="" /> 전체&nbsp;
                                            <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_0" name="target_ban_array[]" value="H1" checked={checkedValues.includes("H1")} /> H1&nbsp;
                                            <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_1" name="target_ban_array[]" value="H2" checked={checkedValues.includes("H2")} /> H2&nbsp;
                                            <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_2" name="target_ban_array[]" value="H3" checked={checkedValues.includes("H3")} /> H3&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_3" name="target_ban_array[]" value="H4" checked={checkedValues.includes("H4")}/> H4&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_4" name="target_ban_array[]" value="H5" checked={checkedValues.includes("H5")} /> H5&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_5" name="target_ban_array[]" value="S1" checked={checkedValues.includes("S1")} /> S1&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_6" name="target_ban_array[]" value="S2" checked={checkedValues.includes("S2")} /> S2&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_7" name="target_ban_array[]" value="S3" checked={checkedValues.includes("S3")} /> S3&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_8" name="target_ban_array[]" value="S4" checked={checkedValues.includes("S4")} /> S4&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_9" name="target_ban_array[]" value="SH1" checked={checkedValues.includes("SH1")} /> SH1&nbsp;
                                        <br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                                             <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_10" name="target_ban_array[]" value="SH2" checked={checkedValues.includes("SH2")} /> SH2&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_11" name="target_ban_array[]" value="SH3"checked={checkedValues.includes("SH3")} /> SH3&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_12" name="target_ban_array[]" value="SH4"checked={checkedValues.includes("SH4")} /> SH4&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_13" name="target_ban_array[]" value="SH5"checked={checkedValues.includes("SH5")} /> SH5&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_14" name="target_ban_array[]" value="SH6"checked={checkedValues.includes("SH6")} /> SH6&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_15" name="target_ban_array[]" value="SH7"checked={checkedValues.includes("SH7")} /> SH7&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_16" name="target_ban_array[]" value="M1"checked={checkedValues.includes("M1")} /> M1&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_17" name="target_ban_array[]" value="M2"checked={checkedValues.includes("M2")} /> M2&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_18" name="target_ban_array[]" value="SM1"checked={checkedValues.includes("SM1")} /> SM1&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_19" name="target_ban_array[]" value="SM2"checked={checkedValues.includes("SM2")} /> SM2&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_20" name="target_ban_array[]" value="3-1"checked={checkedValues.includes("3-1")} /> 3-1&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_21" name="target_ban_array[]" value="3-2"checked={checkedValues.includes("3-2")} /> 3-2&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_22" name="target_ban_array[]" value="3-3"checked={checkedValues.includes("3-3")} /> 3-3&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_23" name="target_ban_array[]" value="반수반"checked={checkedValues.includes("반수반")} /> 반수반&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_24" name="target_ban_array[]" value="1-1" checked={checkedValues.includes("1-1")}/> 1-1&nbsp;
                                        <input type="checkbox" onChange={handleCheckboxChange} id="target_ban_25" name="target_ban_array[]" value="2-1"checked={checkedValues.includes("2-1")} /> 2-1&nbsp;
                                        <input type="hidden" name="ban_total_record" value="26" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="box-button-action">
                            <button type="button" onClick={postTerm} className="btn-big-type1">수정</button>
                            <button type="button" onClick={(e)=>{navgation("/term")}} className="btn-big-type2">취소</button>
                        </div>
                    </article>
                </form>
            </section>
            </main>
        </>
    )
}
