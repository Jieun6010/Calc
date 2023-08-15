import React from 'react';
import { btnArr } from '../../js/Btns';
import CompBtn from './CompBtn';

const CompBtnContainer = () => {
  
  return (
    <ul className="btn-container">
    {
      btnArr.map(v => <CompBtn key={v.id} data={v} />)
    }
  </ul>
  );
};

export default CompBtnContainer;