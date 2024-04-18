//page url : /adminManaging
import React, { useEffect, useState } from "react";
import axios from 'axios';
import AdminList from "./AdminList";
import Modal from 'react-modal';
import "../css/AdminManagement.css";
import AuthInsert from "./AuthInsert";
import SelectGroup from "./SelectGroup";

export default function AdminManagement(props){
    const [adminList, setAdminList] = useState([]); //admin info 출력
    const [gauthmodalIsOpen, setGauthModalIsOpen] = useState(false);    //group auth부여 모달창
    const [agroupmodalIsOpen, setAgroupmodalIsOpen] = useState(false);  //admin 부서선택 모달창
    const [agroupValue, setAgroupValue] = useState(0);  //admin 부서선택 시 부서 선택
    const [radioCheck, setradioCheck] = useState(0);   //group auth부여 시 group 선택
    const [adminCheck, setAdminCheck] = useState([]);   //admin 부서선택 시 admin 선택
    const [checkBoxValue, setcheckBoxValue] = useState([]); //group auth부여 시 subcategory 선택
    const [subList, setSubList] =useState([]);
    const [manageSubBox, setManageSubBox]=useState([]); //그룹subcategory 체크 여부    
    const [mainCategoryCheck, setMainCategoryCheck]=useState({mcno : 0, check : "없음"});   //메인메뉴 선택
    console.log(mainCategoryCheck);

    //esc 클릭 시 모달창 닫힘
    window.onkeyup=(e)=>{
        if(e.keyCode==27){
            setGauthModalIsOpen(false);
            setAgroupmodalIsOpen(false);
        }
    }
    //처음 실행 시 관리자 리스트 출력
    useEffect ( () => {
        
        axios.get('/adminManaging/adminList/get.do')
            .then(response => {
                setAdminList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    //그룹권한부여 그룹 선택1
    const radioChange=async(e)=>{
        console.log(e.target.value);
        setradioCheck(e.target.value);
        setMainCategoryCheck({mcno : 0, check : null});
    }

    //그룹권한부여 그룹 선택2
    const selectGroup= async()=>{
        await axios.get(`/adminManaging/groupSubList/get.do?radioCheck=${radioCheck}`)
            .then(response => {
                setSubList(response.data);
                setcheckBoxValue(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    //그룹권한부여 그룹 선택2 useEffect에 적용
    useEffect(()=>{selectGroup()},[radioCheck])

    //그룹권한 checkbox change
    const checkBoxChange=(event)=>{
        let count=event.target.name;
        const { value, checked } = event.target;
        if (!manageSubBox[count]) {
            setcheckBoxValue((checkBoxValue) => [...checkBoxValue, value]);

            //checkbox 체크 배열 재렌더링
            let slist=[...manageSubBox];
            slist[count]=!manageSubBox[count];
            setManageSubBox(slist);
        } 
        else {
            setcheckBoxValue(checkBoxValue.filter((param) => {return( param != value);}));

            //checkbox 체크 배열 재렌더링
            let slist=[...manageSubBox];
            slist[count]=!manageSubBox[count];
            setManageSubBox(slist);
        }
    }

    //admin 정보 checkbox 선택 시
    const checkAdmin=(e)=>{
        const { value, checked } = e.target;
        if (checked) {
            setAdminCheck((adminCheck) => [...adminCheck, value]);
          } 
        else {
            setAdminCheck(adminCheck.filter(item => item !== value));
        }
    }

    //부서별 권한등록 클릭
    const insertAuth = () => {
        let Info={
            gno_fk: radioCheck,
            scnoList: checkBoxValue
        }
    
        axios.post('/adminManaging/admingroup/auth/post.do',Info)
        .then(response => {
            alert("권한부여 성공");
        })
        .catch(error => {
            console.log(error);
        });
    }

    //admin 그룹부여 확인버튼 클릭 시
    const insertGroup=()=>{
        let Info={
            ano : adminCheck[0], 
            gno : agroupValue
        };
        axios.put('/adminManaging/adminGroup/put.do',Info)
        .then((response)=>{
            if(response.data){
                alert("그룹부여 성공");
                window.location.href="/adminManaging";
            }
            else{
                alert("그룹부여 실패");
            }
        })
        .catch((error)=>{console.log(error);})
    }//m end

    //관리자 그룹부여 모달 open
    let updateGroup=()=>{
        if(adminCheck.length<1){
            alert("관리자를 선택 해 주십시오.");
            return;
        }
        if(adminCheck.length>1){
            alert("관리자를 한명만 선택 해 주십시오.");
            return;
        }
        setAgroupmodalIsOpen(true);
    }//m end

    
    return(<>
    <div class="authBtnDiv">
        <button class="authBtn" onClick={updateGroup}>그룹부여</button>
        <button class="authBtn" onClick={()=> setGauthModalIsOpen(true)}>그룹설정</button>
    </div>

    {/* 그룹부여 모달 */}
    <Modal className="adminGroupModal" isOpen={agroupmodalIsOpen}>
        <div className="adminGroupModal_inner">
            <h3 class="insertGroupHeader">그룹부여</h3>
            <SelectGroup agroupValue={agroupValue}
                        setAgroupValue={setAgroupValue} />
            <div class="insertGroupFooter">
                <button class="insertGroupFooterBtn" onClick={insertGroup}>확인</button>
                <button class="insertGroupFooterBtn" onClick={()=> setAgroupmodalIsOpen(false)}>취소</button>
            </div>
        </div>
    </Modal>
    
    {/* 그룹설정 모달 */}
    <Modal className="adminManageModal" isOpen={gauthmodalIsOpen}>
        <div id="authChoose" >
            <h3> 그룹설정 </h3>

            <div class="authInsertMain">
                <AuthInsert radioChange={radioChange}
                            checkBoxChange={checkBoxChange}
                            checkBoxValue={checkBoxValue}
                            subList={subList}
                            radioCheck={radioCheck}
                            manageSubBox={manageSubBox}
                            setManageSubBox={setManageSubBox}
                            mainCategoryCheck={mainCategoryCheck}
                            setMainCategoryCheck={setMainCategoryCheck}
                            setcheckBoxValue={setcheckBoxValue}
                            />
            </div>
            
            <div class="insertAuthFooter">
                <button onClick={insertAuth}>확인</button>
                <button onClick={()=> {setGauthModalIsOpen(false); setradioCheck(0);}}>취소</button>
            </div>        
        </div>
    </Modal>
        
    
    <AdminList  
        checkAdmin={checkAdmin}
        adminList={adminList}
        adminCheck={adminCheck}/>
    </>);
}