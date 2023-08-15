import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import { fnGetTheme } from '../../js/compMenu';
import CompCoatchMark from './CompCoatchMark';

const fnSetshowCoatch = function(){
  return (window.localStorage.getItem('localCoach')? false : true)
}


const CompMenu = () => {

  const { _theme, _setTheme } = useContext(AppContext)
  const [_key, _setKey] = useState({ '1': true, '2': false, '3': false })
  const [_showCoatch, _setShowCoatch] = useState(fnSetshowCoatch())

  const fnChangeHandler = function (e) {

    let n = e.target.value
    let theme
    let obj = { '1': false, '2': false, '3': false } /* 초기 값을 다 꺼버린다 */
    obj[n] = true /* 변수로 키 값을 대체한다 , obj의 n번째만 true 로 바꾸겠다 */

    _setKey(prev => prev + 3)
    _setTheme(obj)

    localStorage.setItem('themeStorage', JSON.stringify(obj))

    if (n === '1') {
      theme = 'gray'
    } else if (n === '2') {
      theme = 'pink'
    } else {
      theme = 'skyblue'
    }

    document.body.setAttribute('class', theme)

  }//fnChangeHandler

  useEffect(() => {
    _setKey(prev => prev + 3)
  }, [])

  return (

    <section className='menu'>

      <h1>Neumorphi_Calc</h1>

      <form className="theme">
        <fieldset>
          <legend><i className="fa-solid fa-palette"></i>  Choice App Theme</legend>
          <div>
            <input key={_key} onChange={fnChangeHandler} defaultValue='1' defaultChecked={_theme['1']} id="radio1" type="radio" name="theme" />
            <label htmlFor="radio1"></label>
            <input key={_key + 1} onChange={fnChangeHandler} defaultValue='2' defaultChecked={_theme['2']} id="radio2" type="radio" name="theme" />
            <label htmlFor="radio2"></label>
            <input key={_key + 2} onChange={fnChangeHandler} defaultValue='3' defaultChecked={_theme['3']} id="radio3" type="radio" name="theme" />
            <label htmlFor="radio3"></label>
          </div>
        </fieldset>
      </form>

      <nav>
        <Link to="/calc"><i className="fa-solid fa-calculator"></i> calculator</Link>
        <Link to="/bmi"><i className="fa-solid fa-child"></i> bmi</Link>
        <Link to="/dday"><i className="fa-solid fa-calendar-days"></i> dday</Link>
      </nav>
      {(_showCoatch)&&<CompCoatchMark _setShowCoatch={_setShowCoatch} />}
    </section>
  );
};

export default CompMenu;