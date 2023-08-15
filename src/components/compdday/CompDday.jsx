import React, { createContext, useState } from 'react';
import CompList from './CompList';
import CompAdd from './CompAdd';
import CompTime from './CompTime';
import { fnDdayArrInit } from '../../js/dday';

export const DDayContext = createContext()

/* 메인 */

const CompDday = () => {
  const [_showComp, _setShowComp] = useState('list') // 처음에 'list'이기때문에 CompList를 보여준다는 뜻
  const [_ddayArr, _setDdayArr] = useState(fnDdayArrInit()) // dday일정(객체)를 담고있는 배열 원본
  const [_ddayOutputArr, _setDdayOutputArr] = useState(_ddayArr) // dday일정(객체)를 가공해서 출력할 출력용 배열


  return (
    <DDayContext.Provider value={{
      _showComp, _setShowComp, //값이 'list'이면 CompList를 보여주고 값이 'add'면 CompAdd가 나옴
      _ddayArr, _setDdayArr,
      _ddayOutputArr, _setDdayOutputArr,
    }}>
      <section className='dday'>
        <h2>D-DAY</h2>
        <CompTime />
        {_showComp==='list' && <CompList />}
        {_showComp==='add' && <CompAdd />}
      </section>
    </DDayContext.Provider>
  );
};

export default CompDday;