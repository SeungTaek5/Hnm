import Modal from "react-modal";
import axios from "axios";
import React, {useState} from "react";

export default function FindId(props){

    let {isOpen, onCancel} = props;

    const close = () =>{
        onCancel();
    }

    const onFindId = ( ) => {
      const aname = document.querySelector('#aname').value;
      const aemail = document.querySelector('#aemail').value;
      if(aname == "" || aemail == ""){ return; }
      let info = {aname : aname, aemail : aemail};

      axios.get('/admin/findId/get.do' , {params : info})
              .then( (r) => { 
                  if( r.data == ""){
                      alert("일치하는 정보가 없습니다.");
                  }else{
                      alert('아이디는' + r.data);
                  }
              } )
              .catch( (e) => { console.log(e); } )
    }

    return(
        <Modal 
        style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: "translate(-50%,-50%)",
              width : 500,
              height : 500,
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '0px'
            }
          }} 
            isOpen={isOpen}>
            <div className="popup-header">
                <h3 className="title">아이디 찾기</h3>
            </div>

            <div className="popup-content">
                <form id="findIdForm" className="inner-modal">
                    {/* 이름 : <input type="text" name="aname" id="aname" /> <br/>
                    이메일 : <input type="text" name="aemail" id="aemail"/> <br/> */}

                    <table>
                        <tbody>
                            <tr>
                                <th>이름</th>
                                <td>
                                    <input type="text" name="aname" id="aname" />
                                </td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td><input type="text" name="aemail" id="aemail"/></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <div className="signup-footer">
                <button type="button" className="btn-signup" onClick={onFindId}>확인</button>
                <button className="btn-signup" onClick={close}>닫기</button>
            </div>
            
        </Modal>

    )
}