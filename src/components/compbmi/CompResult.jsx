import React, { useContext, useEffect, useState } from 'react';
import { BMIContext } from './CompBmi';
import { fnSetDegree, fnSetObj } from '../../js/bmi';
import CompMorph from './CompMorph';

/* 결과화면 */

const CompResult = () => {

  const {
    _active, _setActive,
    _gender, _setGender,
    _cm, _setCm,
    _kg, _setKg,
    _chkObj, _setChkObj,
    _err, _setErr, 
    _deg, _setDeg, 
    _bmi, _setBmi } = useContext(BMIContext)

  /* 값이 변할때마다 변하도록 디그리?를 설정해줄거임 */
  useEffect(() => {

  })

  /* bmi 결과창 폼 양식을 초기화하고 다시 재 검사할 수 있도록 함------------------------------------------------------------------------------- */
  const fnResetHandler = function () {
    _setActive('') // 화면 바깥쪽으로 이동한다.
    _setChkObj(fnSetObj(0)) // 폼 양식의 남녀체크 모두 해제
    _setCm('') // 폼 양식의 cm input 내용 초기화
    _setKg('') // 폼 양식의 kg input 내용 초기화
    _setDeg(90)
    window.TweenMax.to('.manorg', 1, { morphSVG: `.man3`, fill: '#000', ease: window.Linear.easeNone })
    window.TweenMax.to('.womanorg', 1, { morphSVG: `.woman3`, fill: '#000', ease: window.Linear.easeNone })

  }


  return (
    <div className={`bmi-result ${_active}`}> {/* 정상적인 결과화면 */}
      <h2>BMI Rerult</h2>
      {
        (_err)
          ? // 에러가 폴스라면 ! 에러가 없다면 
          <div className="output err"> {/* 비 정상적 결과화면 */}
            <p>
              <i className="fa-solid fa-weight-scale"></i>
              <i className="fa-solid fa-xmark"></i>
            </p>
            <p>측정할 수 없는 BMI수치결과입니다.</p>
          </div>
          :
          <div className="output result">
            <CompMorph />
            <figure className="board">
              <img className='pin' style={{ transform: `translate(7%,50%) rotate(${_deg}deg)` }} src={require(`../../assets/img/bmiPin.svg`).default} alt="" />
              <img src={require(`../../assets/img/bmiBoard.svg`).default} alt="" />
            </figure>
            <p>{_bmi}</p>
          </div>
      }

      <button onClick={fnResetHandler}>
        <i className="fa-solid fa-rotate-right"></i> 다시 측정하기
      </button>
    </div>
  );
};

export default CompResult;

