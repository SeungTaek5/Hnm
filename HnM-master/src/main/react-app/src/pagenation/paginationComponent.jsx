import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pagination from '../pagenation/pagination.css'
const PaginationComponent = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(page, size);
  }, [page, size]);


    // async -> 비동기 함수 

  const fetchData = async (pageNumber, pageSize) => {
    try {
    
      const response = await axios.get(`/entity?page=${pageNumber}&size=${pageSize}`); // 페이지 크기도 서버로 전달
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div> 
      {data.map((data) => (
            <div>출력부분이 들어가야 합니다.</div>
      ))}
      <div>
        {Array.from(Array(totalPages).keys()).map((pageNum) => (
          <button key={pageNum} onClick={() => handlePageChange(pageNum)}>
            {pageNum + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginationComponent;