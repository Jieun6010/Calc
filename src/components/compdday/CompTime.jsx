import React, { useEffect, useState } from 'react';
import { fnGetDateInfo } from '../../js/dday';

const CompTime = () => {
  const [_day, _setDay] = useState()
  const [_year, _setYear] = useState()
  const [_month, _setMonth] = useState()
  const [_date, _setDate] = useState()
  const [_ap, _setAP] = useState()
  const [_hour, _setHour] = useState()
  const [_min, _setMin] = useState()
  const [_sec, _setSec] = useState()

  // 스테이트를 변경하기위해 밖에서 함수를 만들어준다.
  const fnSetState = function () {
    const now = new Date()
    const { day, year, month, date, ap, hour, min, sec } = fnGetDateInfo(new Date())
    _setDay(day);
    _setYear(year);
    _setMonth(month);
    _setDate(date);
    _setAP(ap);
    _setHour(hour);
    _setMin(min);
    _setSec(sec);
  }

  /* 화면에 나타날때 딱 한번 */
  useEffect(() => {
    fnSetState() // 계속 해줘야하니까 변경할 수 있게 밖에서 함수를 만들어주고 호출해준거임
    let interverID
    interverID = setInterval(()=>{
      fnSetState()
    },1000)
    return (() => { // cleanUp 화면에서 다시 사라질때 ! display none이랑은 다른거임
      clearInterval(interverID)
      
    })
  }, [])


  return (
    <div className='now'>
      <time>
        <small>{_day}</small>
        <b>{_year}</b> -
        <b>{_month}</b> -
        <b>{_date}</b> 
      </time>

      <time>
        <small>{_ap}</small>
        <b>{_hour}</b> :
        <b>{_min}</b> :
        <b>{_sec}</b>
      </time>

    </div>
  );
};

export default CompTime;