import React, { useContext } from 'react';
import { CalcContext } from './CompCalc';

const Compoutput = () => {
 const {_output} = useContext(CalcContext)
  return (
    <p className="output">
      <span>
        {_output}
      </span>
    </p>
  );
};

export default Compoutput;