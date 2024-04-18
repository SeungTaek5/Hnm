import Modal from "react-modal";
import axios from "axios";
import * as xlsx from 'xlsx';


/* 
    const [ExcelUploadOpen, setExcelUploadOpen] = useState(false);
    const openExcelUploadModal = ( ) =>{ setExcelUploadOpen(true); }
    const closeExcelUploadModal = ( ) =>{setExcelUploadOpen(false); }

    <ExcelUpload isOpen={ExcelUploadOpen} onCancel={closeExcelUploadModal}/>
*/

export default function ExcelUpload(props){

    let {isOpen, onCancel} = props;

    const close = () =>{
        onCancel();
    }

    // 엑셀 파일 등록
    const doUpload = () =>{

        const excel = document.querySelector('#excelFile');
        const file = excel.files[0];
        const reader = new FileReader();
    
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = xlsx.read(data, { type: 'array' });
    
          // 첫 번째 시트를 가져옴
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
          // 셀 데이터를 파싱하여 출력
          const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 0 });
          //console.log(jsonData);

          axios.post('/excel/student/post.do', jsonData)
              .then( (r) => { //console.log(r);
                  alert(r.data + "명의 학생이 신규 등록되었습니다");
              } )
              .catch( (e) => { console.log(e); } )
        };
    
        reader.readAsArrayBuffer(file);

    }

    return(<>
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
                <h3 className="title">Excel Upload</h3>
            </div>
            <div className="popup-content">
                <input className="selectFile-btn" type="file" id="excelFile" />
            </div>
            <div className="signup-footer">
                    <button type="button" className="btn-signup" onClick={doUpload}>등록</button>
                    <button className="btn-signup" onClick={close}>닫기</button>
            </div>

        </Modal>
    </>)
}