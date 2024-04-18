import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaidChart from './PaidChart';
import './Paidacademyfee.css';

function Fee() {
  const [fees, setFees] = useState([]);
  const [customSubmitFee, setCustomSubmitFee] = useState('');

  const getFees = () =>{
    axios.get('/fee/payall')
    .then(response => {
      console.log(response);
      if (response.data) {
        setFees(response.data);
      }
    })
    .catch(error => {
      console.log(error);
    });  
  }

  useEffect(() => { getFees(); }, []);

  // 제출 수강료를 변경하는 함수
  const handleCustomSubmitFeeChange = (event, index) => {
    const updatedFees = [...fees];
    updatedFees[index].submitfee = event.target.value;
    setFees(updatedFees);
  };

  // 저장 버튼을 누를 때 실행되는 함수
  const handleSave = () => {

    const updateFees = fees.map(fee => ({
      feeno : fee.feeno,
      submitfee : fee.submitfee
    }));

    axios.put('/fee/update',updateFees)
      .then(response => {
        console.log("저장 : ", response.data)
        alert('저장되었습니다.')
        getFees();
      })
      .catch(error => {console.log(error);})
  };
  // 상태 갯수 카운트 하는 함수
  const countByStatus = (status) => {
    return fees.filter(fee => {
      if (status === '수납완료') {
        return fee.tuitionfee === fee.submitfee;
      } else if (status === '수납중') {
        return fee.tuitionfee !== fee.submitfee;
      }
      return false;
    }).length;
  };
  // 전체 학원비 & 제출된 학원비 출력하는 문법
  const totalSubmitPay = fees.reduce((total,fee)=> total+fee.submitfee,0);
  const totaltuitionfee = fees.reduce((total,fee)=>total+fee.tuitionfee,0);
  return (
    <div>
      <h1 className='titleFee'>수강료 목록</h1>
      <div>
        <button onClick={handleSave} className='saveButton'>저장</button>
      </div>

      <p className='totaltuitionFee'>총 학원 수강료 : {totaltuitionfee}</p>
      <p className='totalSubmitPay'>결제된 학원 수강료 : {totalSubmitPay}</p>

      <div className='countbystate'>
        <p className='completesubmit'>수납완료 : {countByStatus('수납완료')}</p>
        <p className='incompletesubmit'>수납미완료 : {countByStatus('수납중')}</p>
      </div>
      <ul className='ulacademyfee'>
        {fees.map((fee, index) => (
          <li key={fee.feeno} style={{ margin: 50 }} className='liacademyfee'>
            <div className='Psname'>학생 이름 : {fee.sno.sname}</div>
            <div className='Ptuitionfee'>수강료 : {fee.tuitionfee}</div>
            <div className='Psubmitfee'>
              제출 수강료:{" "}
              <input
                type="number"
                value={fee.submitfee}
                onChange={(event) => handleCustomSubmitFeeChange(event, index)} className='Psubmitfeeinput'
              />
            </div>
            <div className='Pnotsubmitted'>남은 수강료 : {fee.tuitionfee - fee.submitfee}</div>
            <div className='Pstate'>상태: {fee.tuitionfee === fee.submitfee ? '수납완료' : '수납중'}</div>
          </li>
        ))}
      </ul>
      <PaidChart fees={fees}/>
        
    </div>


  );
}

export default Fee;