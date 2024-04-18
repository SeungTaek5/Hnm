//url : 15/counselDetail
import axios from "axios"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import '../css/counselInsert.css'

export default function CounselDetail(props){
  console.log("counselDetail Page");
  const [counselDetail, setCounselDetail] = useState({}); //상담 세부 정보
  const navigate = useNavigate();	//수정페이지 전환 시 사용

  const location = useLocation();
  const cno=location.state.cno;

  //처음 실행 시 상담 세부 정보 호출
  useEffect(()=>{
    axios.get("/counsel/counselDetail/get.do",{params : {cno : cno}})
    .then((response)=>{
      setCounselDetail(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])

  //수정버튼 클릭 시 (로그인아이디==작성자아이디) 유효성검사
  const clickUpdateBtn=()=>{
    axios.get("/counsel/writer/get.do",{params : {cno : cno}})
    .then(async(response)=>{
      let ano_fk=response.data;
      let ano=0;
      console.log(ano_fk);

      await axios.get("/counsel/loginInfo/get.do")
      .then((r)=>{
        ano=r.data.ano;
      })
      .catch((e)=>{
        console.log(e);
      })
      
      if(ano==ano_fk){
        //수정페이지 전환 시 cno 매개변수로 보내기
        navigate("/counsel/counselUpdate",{ state : {cno : cno} });
      }
      else{
        alert('본인이 작성한 내역만 수정 가능합니다.');
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  return(<>
  <h3 class="cdHeader">● 상담정보</h3>
  <div class="cdMainWrap">
    <div class="sdInnerWrap">
      <div class="sdInner">
        <div class="cdElement">
          <div class='cInsertIndexName cdIndexName'>
            <div class='ciNameIcon'></div>
            <div class='ciName'><div>학생 정보</div> <div> : </div></div>
          </div>
          <div>{counselDetail.sname+" ("+counselDetail.sid+") "+counselDetail.sgender}</div>
        </div>

        <div class="cdElement">
          <div class='cInsertIndexName cdIndexName'>
            <div class='ciNameIcon'></div>
            <div class='ciName'><div>반</div> <div> : </div></div>
          </div>
        <div>{counselDetail.sclass}</div>
        </div>

        <div class="cdElement">
          <div class='cInsertIndexName cdIndexName'>
            <div class='ciNameIcon'></div>
            <div class='ciName'><div>상담 선생님</div> <div> : </div></div>
          </div>
          <div>{counselDetail.aname}</div>
        </div>
      </div>
      
      <div class="sdInner">
        <div class="cdElement">
          <div class='cInsertIndexName cdIndexName'>
            <div class='ciNameIcon'></div>
            <div class='ciName'><div>계열</div> <div> : </div></div>
          </div>
          <div>{counselDetail.smajor}</div>
        </div>

        <div class="cdElement">
          <div class='cInsertIndexName cdIndexName'>
            <div class='ciNameIcon'></div>
            <div class='ciName'><div>구분</div> <div> : </div></div>
          </div>
          <div>{counselDetail.cdivision}</div>
        </div>
        
        <div class="cdElement">
          <div class='cInsertIndexName cdIndexName'>
            <div class='ciNameIcon'></div>
            <div class='ciName'><div>상담날짜</div> <div> : </div></div>
          </div>
          <div>{counselDetail.centerdate}</div>
        </div>
      </div>
    </div>

    <div class="sdInner_bottom">
      <div class="cdElement">
        <div class='cInsertIndexName cdIndexName'>
          <div class='ciNameIcon'></div>
          <div class='ciName'><div>상담 제목</div> <div> : </div></div>
        </div>
        <div>{counselDetail.ctitle}</div>
      </div>

      <div class="cdElement cdContentWrap">
        <div class='cInsertIndexName cdIndexName '>
          <div class='ciNameIcon'></div>
          <div class='ciName'><div>상담 내용</div> <div> : </div></div>
        </div>
        <div class="cdContentTextarea">{counselDetail.ccontent}</div>
      </div>
    </div>
  </div>

  <div class="cdBtnBox">
    <button class="cdUpdateBtn" type="button" onClick={clickUpdateBtn}>수정</button>
    <button class="cdShowListBtn" type="button" onClick={()=>{navigate("/counsel")}}>전체 리스트 보기</button>
  </div>
  </>);
}