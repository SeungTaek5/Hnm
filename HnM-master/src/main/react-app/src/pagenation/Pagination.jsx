

import React, {useState} from "react";  // 컴포넌트 선언
import './pagination.css';

const Pagination = ({data, itemPerPage, RenderComponent  }) => { // data, itemperpage, rendercomponent를 prop

    const [Page, setPage] = useState(1); //  PAGE 상태 선언?? 초기값 1 
    const LastItem = Page*itemPerPage; //마지막 정보
    const FirstItem = LastItem-itemPerPage; //처음 정보
    const currentItem = data.slice(FirstItem, LastItem) // 현재 페이지 출력할 항목들 .slice메서드로 가져오기
    console.log(currentItem);
    const handlePageChange= (pageNumber) => { // 페이지 변경시 호출 
        setPage(pageNumber); // 현재페이지 상태 변경? (set 사용)
    };

    return (<>
        
        
          
          {currentItem.map((item, index) => (
            <RenderComponent key={index} data={item} />
          ))}

                                                                   
          

    

            {/* Array.from(인수1,인수2) => 배열로 변환하기..??
                          인수 1 = 변환하고자 하는 배열의 길이 
                          인수 2 = 변환된 배열의 각 요소를 생성하는 함수 
            */}
            {Array.from({ length: Math.ceil(data.length / itemPerPage) }, (_, i) => (

              // _ : 첫 번째 인수로 전달된 배열의 길이만큼의 길이를 가진 배열을 생성. _는 일반적으로 사용되지 않는 변수 이름, 이 코드에서는 배열의 요소값을 사용X -> 무시하는 데에 활용
               /*: Array.from() 함수는 배열의 요소를 변환하는 함수를 사용하여 새로운 배열을 생성합니다.
                 그런데, 만약 변환 함수에서 두 번째 매개변수를 사용하지 않는다면, 일반적으로 언더스코어 _를 사용하여 해당 매개변수를 나타냅니다.*/

              // i : 현재 요소의 인덱스

              <button key={i} onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </button>
            ))}
          
          </>
      );
    };
    

    export default Pagination;



