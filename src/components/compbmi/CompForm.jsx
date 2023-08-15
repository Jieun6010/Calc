import React, { useContext } from 'react';
import { BMIContext } from './CompBmi.jsx';
import { fnCheckBMI, fnSetDegree, fnSetObj } from '../../js/bmi.js';

/* 입력양식 */

const CompForm = () => {

  const {
    _active, _setActive,
    _gender, _setGender,
    _cm, _setCm,
    _kg, _setKg,
    _chkObj, _setChkObj,
    _err, _setErr, _deg, _setDeg, _bmi, _setBmi } = useContext(BMIContext)


  /* 결과화면 출력 */
  const fnSubmliHandler = function (e) {
    e.preventDefault()
    const { bmi, deg, err } = fnCheckBMI(_gender, _cm, _kg) // 에러 여부까지 리턴하게해야함 //{bmi수치, 각도}를 객체로 리턴, morph애니메이션 설정
    _setErr(err)
    _setActive('active') // 결과화면이 튀어나옴
    _setDeg(deg)
    _setBmi(bmi)
  } // fnSubmliHandler


  /* 성별 State 변경 */
  const fnChangeHandler = function (e) {
    _setChkObj(fnSetObj(e.target.getAttribute("data-n")))
    _setGender(e.target.value)
  } // fnChangeHandler


  /* 입력할때마다 바뀌게  */
  const fnInputHandler = function (e) {
    //신장 입력 시
    if (e.target.id === 'tall') {
      _setCm(parseFloat(e.target.value)) // cm state를 e.target.value로 변경

      //체중 입력 시
    } else {
      _setKg(parseFloat(e.target.value)) // kg state를 e.target.value로 변경
    }
  }



  /*
  1.처음에는 디폴트로  male이 체크가 되어야 한다.  디폴트 체크나 디폴트 밸류 사용 X ! 
  2.체크가 변경이 가능해야함
  3.결과화면(Result 컴포넌트 클릭 시 )에서 다시 측정하기를 누르면 원래대로 male이 체크되어있는 상태로 돌아와야 한다.
  */

  return (
    <form onSubmit={fnSubmliHandler}>
      <div className='radios'> {/* 라디오 선택 버튼 */}
        <label><i className="fa-solid fa-venus-mars"></i>성별을 입력하세요</label>
        <p>
          <input onChange={fnChangeHandler} checked={_chkObj[1]} value="male" data-n="1" name="gender" id="male" type="radio" className="gender" required />
          <label htmlFor="male"><i className="fa-solid fa-person"></i>male</label> 
          <input onChange={fnChangeHandler} checked={_chkObj[2]} value="female" data-n="2" name="gender" id="female" type="radio" className="gender" required />
          <label htmlFor="female"><i className="fa-solid fa-person-dress"></i>female</label>
        </p>
      </div>

      <div> {/* 신장, */}
        <label htmlFor="tall"><i className="fa-solid fa-ruler-vertical"></i>신장을 입력하세요</label>
        <input id="tall" onInput={fnInputHandler} value={_cm || ''} type="number" required min="30" max="500" step="0.1" placeholder='cm단위로 입력해주세요' />
      </div>                                     {/* _cm가 값이 없어졌을때는 '' 빈 따옴표로 값을 대체하자. 그럼 언디파인드가 안뜸 */}

      <div>  {/* 몸무게 */}
        <label htmlFor="weight"><i className="fa-solid fa-weight-scale"></i>체중을 입력하세요</label>
        <input id="weight" onInput={fnInputHandler} value={_kg || ''} type="number" required min="30" max="500" step="0.1" placeholder='kg단위로 입력해주세요' />
      </div>

      <button>측정하기</button>
    </form>
  );
};

export default CompForm;