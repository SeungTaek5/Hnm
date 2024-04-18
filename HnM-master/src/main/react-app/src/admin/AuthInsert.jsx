//그룹권한부여 모달
import axios from "axios";
import { useEffect, useState } from "react";

export default function AuthInsert(props){
    const [groupList, setGroupList]=useState([]);   //그룹 리스트
    const [authList, setAuthList]=useState([]);     //카테고리 출력
    const [newGname, setNewGname] = useState("");


    let count=0;

    //그룹출력
    useEffect ( () => {
        //출력시 radio default값
        // let groupRadioList=document.querySelectorAll(".groupRadio");
        // groupRadioList.forEach((gList)=>{
        //     if(gList.value==2){
        //         gList.checked="true";
        //     }
        // })

        axios.get('/adminManaging/group/get.do')
            .then(response => {
                setGroupList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [groupList]);

    //카테고리 출력
    useEffect ( () => {

        axios.get('/adminManaging/selectCategory/get.do')
            .then(response => {
                setAuthList(response.data);                
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    //선택한 그룹의 접근 가능 카테고리 목록 mount시, 그룹선택 변경시에 출력
    useEffect(()=>{
        let subCheckList=[];        
        let inputList= document.querySelectorAll(".subListInput");

        inputList.forEach((element)=>{
            let no=false;
            for(let i=0; i<props.subList.length; i++){
                if(element.value==props.subList[i]){
                    no=true;
                    break;  //일치하는 번호가 있으면 for문 탈출
                }
            }//for end

            subCheckList.push(no);
        })//for each end
        props.setManageSubBox(subCheckList);

    },[props.subList]);

    //그룹 등록
    const insertGroup=()=>{
        axios.post("/adminManaging/insertGroup/post.do",newGname)
        .then(r=>{
            console.log(r.data);
            if(r.data){
                alert("그룹 등록 성공");
                setNewGname("");
            }
            else{
                alert("그룹 등록 실패");
            }
        })
        .catch(e=>{
            console.log(e);
        });
    }

    //그룹 삭제
    const deleteGroup=(gno)=>{
        if(gno==1){            
            alert("삭제가 불가능한 그룹입니다.");
            return;
        }
        axios.delete("/adminManaging/deleteGroup/delete.do",{params : {gno : gno}})
        .then(r=>{
            console.log(r.data);
            if(r.data){
                alert("삭제 성공");
            }
            else{
                alert("삭제 실패");
            }
        })
        .catch(e=>{
            console.log(e);
        });
    }
    

    return(<>
        <div class="insertAuthGroup">
            {/* 그룹 등록 */}
            <div class="updateGroupDiv">
                <h3>● 그룹 생성/수정/삭제</h3>
                <div class="updateGroupBtnDiv">
                    <input class="updateGroupInput" type="text" value={newGname} onChange={(e)=>{setNewGname(e.target.value);}}/>
                    <button className="updateGroupBtn" type="button" onClick={insertGroup}></button>
                </div>
            </div>

            {/* 그룹출력 */}
            <div>
                {
                    groupList.map((g, index)=>{
                        return(<>
                                <div class={index==(groupList.length-1) ? "authGroupListDiv authGroupListDiv_last" : "authGroupListDiv"}>    
                                    <div>
                                        <div class="groupRadioDiv">
                                            <input className="groupRadio" type="radio" name="groupRadio" value={g.gno}  onChange={props.radioChange}/>
                                        </div>
                                        
                                        <div class="authGroupListName"> {g.gname} </div>
                                    </div>

                                    <button class="deleteGroupBtn" type="button" onClick={()=>{deleteGroup(g.gno)}}></button>        
                                </div>        
                        </>);
                    })
                }
            </div>
        </div>

        {/* mainCategory 출력 */}
        <div class="authCategoryWrap">            
            <h3>● 그룹 권한 설정</h3>
            <div class="authCategory_inner">
                {
                    authList.map((category)=>{
                        return(<>
                            <div class="categoryList_block">
                                <div class="mainCategory_header">
                                    {/* <input 
                                        type="checkBox" 
                                        name={category.mcname} 
                                        value={category.mcno} 
                                        onChange={(e)=>{
                                                if(e.target.checked){
                                                    props.setMainCategoryCheck({mcno : category.mcno, check : true});
                                                }
                                                else if(e.target.checked==false){
                                                    props.setMainCategoryCheck({mcno : category.mcno, check : false});
                                                }
                                            }}/> */}
                                    {category.mcname} 
                                </div>
                                
                                <div class="subCategoryList_block">
                                    {
                                        // 서브카테고리 출력
                                        category.subcategoryList.map((subCList)=>{
                                            return(<>
                                                <div class="subCategory_element">
                                                    <input 
                                                        className="subListInput" 
                                                        type="checkBox" 
                                                        name={count} 
                                                        value={subCList.scno} 
                                                        // checked={currentMcno==props.mainCategoryCheck.mcno ? props.mainCategoryCheck.check : props.manageSubBox[count++]}  
                                                        checked={props.manageSubBox[count++]}  
                                                        onChange={props.checkBoxChange}/>
                                                    <div>{subCList.scname}</div>
                                                </div>
                                            </>);
                                        })
                                    }
                                </div>
                                
                            </div>
                        </>);
                    })
                } 
            </div>   
        </div>
    </>);
}