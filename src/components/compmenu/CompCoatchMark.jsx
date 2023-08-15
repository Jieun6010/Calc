import React, { useState } from 'react';

const CompCoatchMark = ({ _setShowCoatch }) => {
  const [_isActive, _setIsActive] = useState('')

  const fnSetLocalCoatch = function (e) {
    if (e.target.checked) {
      window.localStorage.setItem('localCoach', ' ')
    } else {
      window.localStorage.removeItem('localCoach')
    }
  }

  return (
    <figure onTransitionEnd={() => { _setShowCoatch(false) }} className={`coatch-mark ${_isActive}`}>
      <img src={require('../../assets/img/end.png')} alt="" />
      <figcaption>
        <p>
          <input onChange={fnSetLocalCoatch} type="checkbox" />
          코치마크 비활성화
        </p>
        <button onTransitionEnd={(e) => { e.stopPropagation() }} onClick={() => { _setIsActive(`active`) }}>skip</button>
      </figcaption>
    </figure>
  );
};

export default CompCoatchMark;