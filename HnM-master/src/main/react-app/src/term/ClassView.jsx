import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ClassView(props) {
    const [pageDto, setPageDto] = useState({
        page: 1, count: 0, data: []
    });
    const [selectedItems, setSelectedItems] = useState([]);
    const navgation = useNavigate();

    const fetchData = async (page) => {
        try {
            const info = { page, view: 10 };
            const response = await axios.get("/class/get.do", { params: info });
            setPageDto(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData(pageDto.page);
    }, [pageDto.page]);

    const handleChange = (e, value) => {
        setPageDto(prevState => ({
            ...prevState,
            page: value
        }));
    };

    const toggleCheckbox = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const deleteSelectedItems = async () => {
        const confirmation = window.confirm("선택된 항목을 삭제하시겠습니까?");
        if (!confirmation) return;

        try {
            await axios.post("/class/delete.do", selectedItems);
            fetchData(pageDto.page);
            setSelectedItems([]);
            alert("삭제 성공");
        } catch (error) {
            console.error(error);
            alert("삭제 실패");
        }
    };

    const handleEditButtonClick = () => {
        if (selectedItems.length === 1) {
            const selectedItemId = selectedItems[0]; // 선택된 항목의 ID 가져오기
            navgation("/class/update/"+selectedItemId);
            
        } else {
            alert("수정할 항목을 하나만 선택해주세요.");
        }
    };
    const handleRegisterButtonClick = () => {
        navgation("/class/insert");        
    };


    return (
        <>  <main className="area-content">
            <section className="contain-header">
                <h3 className="title">::::: <strong>입학반 리스트</strong></h3>
            </section>
            <section className="contain-body">
                <div className="cont-block">
                    <div className="pagination">
                        <Pagination count={pageDto.count} page={pageDto.page} onChange={handleChange} />
                    </div>
                    <div className="contain-utils">                                            
                        <p className="total"></p>
                        <div className="box-button">
                            <button type="button" className="btn-type1" onClick={handleRegisterButtonClick}>등록</button>
                            <button type="button" className="btn-type2" onClick={handleEditButtonClick}>수정</button>
                            <button type="button" className="btn-type2" onClick={deleteSelectedItems}>삭제</button>
                        </div>                       
                    </div>
                </div>
                <form name="partnet_form">
                    <div className="table-type1">
                <table>
                    <caption></caption>
                    <colgroup>
                        <col width={"10%"} />
                        <col width={"20%"} />
                        <col width={"35%"} />
                        <col width={"35%"} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                            <th>반번호</th>
                            <th>학기명</th>
                            <th>반이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageDto.data.map((Class) => (
                            <tr key={Class.clno}>
                                <td><input type="checkbox" name="prodcheck_0" id="prodcheck_0" value={Class.clno} onChange={() => toggleCheckbox(Class.clno)} /></td>
                                <td>{Class.clno}</td>
                                <td>{Class.termEntityList.tname}</td>
                                <td>{Class.clname}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                </form>
                <div className="cont-block">
                    <div className="pagination">
                            <Pagination count={pageDto.count} page={pageDto.page} onChange={handleChange} />
                        </div>
                    <div className="contain-utils">
                        <p className="total"></p>
                        <div className="box-button">
                            <button type="button" className="btn-type1" onClick={handleRegisterButtonClick}>등록</button>
                            <button type="button" className="btn-type2" onClick={handleEditButtonClick}>수정</button>
                            <button type="button" className="btn-type2" onClick={deleteSelectedItems}>삭제</button>
                        </div>
                    </div>
                </div>
            </section>
            </main>
        </>
    );
}
