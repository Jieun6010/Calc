import React, { createContext, useState } from 'react';
import CompForm from './CompForm';
import CompResult from './CompResult';
import { fnSetObj } from '../../js/bmi';

/* 메인 컴포넌트*/

export const BMIContext = createContext()

const CompBmi = () => {
  const [_active, _setActive] = useState('')   /* _active 스테이트를 변경하는 함수, secActive(`active`) 로 할 경우 결과화면이 나온다. */
  const [_gender, _setGender] = useState() /* 남녀 스테이트를 변경하는 함수 (male,female) 체크, 라디오버튼(value를 넣어놓고) change할때마다 스테이트 변경이 일어남. _secGender(e.target.value)를 이용*/
  const [_chkObj, _setChkObj] = useState(fnSetObj(0)) /* 남,녀 라디오버튼 체크 상태를 관리하는 객체 state. fnSetObj(n) 함수를 이용해서 n번째 버튼의 check값만 true로 전달. 1이나 2를 입력하면 male이나 female이 눌려진 상태가 디폴트로 설정됨 */
  const [_cm, _setCm] = useState('')   /* cm 스테이트, input에 값이 입력될때마다 input의 value값으로 변경 */
  const [_kg, _setKg] = useState('')   /* kg 스테이트, input에 값이 입력될때마다 input의 value값으로 변경 */ 
  const [_err, _setErr] = useState(false) /* */
  const [_deg, _setDeg] = useState(90) /* 저울, 각도 스테이트 */
  const [_bmi, _setBmi] = useState('') 

  return (
    <BMIContext.Provider value={{
      _active,_setActive,
      _gender,_setGender,
      _cm,_setCm,
      _kg, _setKg,
      _chkObj, _setChkObj,
      _err, _setErr,
      _deg, _setDeg,
      _bmi, _setBmi,
      }}>
        
      <section className='bmi'>
        <h2>bmi</h2>
        <CompForm />
        <CompResult />
      </section>
    </BMIContext.Provider>
  );
};

export default CompBmi;
