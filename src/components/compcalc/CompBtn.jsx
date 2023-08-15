import React, { useContext } from 'react';
import { CalcContext } from './CompCalc';
import { errMsg, fnSetOutput } from '../../js/Btns'

const CompBtn = ({ data }) => {
  const { _setOutput, _output, _showModal, _setShowModal, _setErrMsg } = useContext(CalcContext)
  const { type, char } = data

  const fnClickHandler = function () {
    const { output, showModal, errMsg} = fnSetOutput(_output, char, type)
      _setOutput(output)
      _setShowModal(showModal)
      _setErrMsg(errMsg)
  }


  return (
    <li>
      <button onClick={fnClickHandler}>{char}</button>
    </li>
  );
};

export default CompBtn;