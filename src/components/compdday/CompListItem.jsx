import React, { useContext, useEffect, useState } from 'react';
import { fnGetDateInfo, fnTimer } from '../../js/dday';
import { DDayContext } from './CompDday';

const CompListItem = ({ item }) => {
  const [_remainDays, _setRemainDays] = useState(0)
  const [_remainHours, _setRemainHours] = useState(0)
  const [_remainMinutes, _setRemainMinutes] = useState(0)
  const [_remainSeconds, _setRemainSeconds] = useState(0)
  const [_stroke1, _setStroke1] = useState(300)
  const [_stroke2, _setStroke2] = useState(24)
  const [_stroke3, _setStroke3] = useState(60)
  const [_stroke4, _setStroke4] = useState(60)
  const [_isActive, _setIsActive] = useState('')
  const [_isDeActive, _setIsDeActive] = useState('')
  const { id, title, Dday } = item//item이란 props로 내려받은 객체{id, Dday}를 구조분해 
  const { day, year, month, date, ap, hour, min, sec, timeStamp } = fnGetDateInfo(Dday)
  const { _ddayArr, _setDdayArr, _ddayOutputArr, _setDdayOutputArr } = useContext(DDayContext)

  const fnTimerSetState = function () {
    let { remainDays, remainHours, remainMinutes, remainSecs } = fnTimer(timeStamp) /* 함수로 받아온 시간 */
    if (!remainDays && !remainHours && !remainMinutes && !remainSecs) _setIsDeActive(`deactive`)
    /* 얼마나 남았는지 초로 알려주는 것  */
    _setRemainDays(remainDays)
    _setRemainHours(remainHours)
    _setRemainMinutes(remainMinutes)
    _setRemainSeconds(remainSecs)
    _setStroke1(remainDays)
    _setStroke2(remainHours)
    _setStroke3(remainMinutes)
    _setStroke4(remainSecs)

  } // fnTimerSetState

  const fnMouseDownHandler = function () {
    _setIsActive(`active`)
  } //fnMouseDownHandler


  const fnDelHandler = function () {
    if (window.confirm('D-day목록을 삭제하시겠습니까?')) { // 예를 누르면
      const ddayArr = _ddayArr.filter(v => v.id !== id)
      _setDdayArr(ddayArr) // ddayArr 는 다음 화면에 바뀐다.
      _setDdayOutputArr(ddayArr)

      localStorage.setItem('ddayArrStorage', JSON.stringify(ddayArr))
    } else { // 아니오를 누르면
      _setIsActive(' ') // active없애기
    }
  }


  useEffect(() => {
    fnTimerSetState()

    let interverID
    interverID = setInterval(() => {
      fnTimerSetState()
    }, 1000)

    return (() => {
      clearInterval(interverID)
    })
  }) // useEffect

  return (
    <li className={_isActive + '' + _isDeActive} onMouseDown={fnMouseDownHandler} onClick={fnDelHandler}>
      <div className='meta'>
        <h3>{title}</h3>
        <p>
          <time className='date'>
            <em>{year}</em>-
            <em>{month}</em>-
            <em>{date}</em>-
            <small>{day}</small>
          </time>
          <time className='time'>
            <small>{ap}</small>
            <em>{hour}</em>:
            <em>{min}</em>:
            <em>{sec}</em>
          </time>
        </p>
      </div>

      <ul className='timer-output'>
        <li>
          <figure>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="47" />
              <circle cx="50" cy="50" r="47" pathLength="300" strokeDasharray="300" strokeDashoffset={_stroke1} />
            </svg>
            <figcaption>{_remainDays}</figcaption>
          </figure>
          <p>
            <em>day</em>
            <small>0 ~ 300</small>
          </p>
        </li>

        <li>
          <figure>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="47" />
              <circle cx="50" cy="50" r="47" pathLength="24" strokeDasharray="24" strokeDashoffset={_stroke2} />
            </svg>
            <figcaption>{_remainHours}</figcaption>
          </figure>
          <p>
            <em>Hour</em>
            <small>0 ~ 24</small>
          </p>
        </li>

        <li>
          <figure>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="47" />
              <circle cx="50" cy="50" r="47" pathLength="60" strokeDasharray="60" strokeDashoffset={_stroke3} />
            </svg>
            <figcaption>{_remainMinutes}</figcaption>
          </figure>
          <p>
            <em>Min</em>
            <small>0 ~ 60</small>
          </p>
        </li>

        <li>
          <figure>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="47" />
              <circle cx="50" cy="50" r="47" pathLength="60" strokeDasharray="60" strokeDashoffset={_stroke4} />
            </svg>
            <figcaption>{_remainSeconds}</figcaption>
          </figure>
          <p>
            <em>Sec</em>
            <small>0 ~ 60</small>
          </p>
        </li>

      </ul >
    </li >
  );
};

export default CompListItem;