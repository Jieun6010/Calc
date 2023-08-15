import React, { createContext, useState } from 'react';
import Compoutput from './Compoutput';
import CompBtnContainer from './CompBtnContainer';
import CompModal from './CompModal';

export const CalcContext = createContext()

const CompCalc = () => {
  const [_output, _setOutput] = useState(' ')
  const [_showModal, _setShowModal] = useState(false)
  const [_errMsg, _setErrMsg] = useState()
  return (
 
    <section className="calc">
      <h2>Calculator</h2>
      <CalcContext.Provider value={{ _output, _setOutput, _showModal, _setShowModal, _errMsg, _setErrMsg }}>
        <Compoutput />
        <CompBtnContainer />
        {_showModal&&<CompModal />}
      </CalcContext.Provider>
    </section>

  );
};

export default CompCalc;