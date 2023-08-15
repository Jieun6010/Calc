import React, { useContext, useState } from 'react';
import { DDayContext } from './CompDday';


const CompAdd = () => {
  const [_title, _setTitle] = useState('')
  const [_date, _setDate] = useState('')
  const [_time, _setTime] = useState('00:00')
  
  


  const { _showComp, _setShowComp, _ddayArr, _setDdayArr, _setDdayOutputArr, _ddayOutputArr } = useContext(DDayContext)


  const fnChangeHandler = function (e) {
    if (e.target.type === 'text') _setTitle(e.target.value)
    else if (e.target.type === 'date') _setDate(e.target.value)
    else _setTime(e.target.value)
  } // fnChangeHandler


  const fnSubmitHandler = function (e) {
    e.preventDefault()
    let dday = new Date(`${_date}T${_time}`) // 사용자가 입력한 yyyy-mm-ddT00:00
    let ddayStamp = parseInt(dday.getTime() / 1000)
    let nowStamp = parseInt(Date.now() / 1000)

    if (ddayStamp < nowStamp) { // 과거시간을 입력하면 경고창 출력
      alert('과거 시점은 D-day로 설정하실 수 없습니다.')
      return false
    } else if ((ddayStamp - nowStamp) / (60 * 60 * 24) > 300) {
      alert('300일 이후 시점은 D-day로 설정하실 수 없습니다.')
    }
    if (ddayStamp < nowStamp || (ddayStamp - nowStamp) / (60 * 60 * 24) > 300) {
      _setDate('')
      _setTime('00:00')
      return false
    }
    let DdayObj = {
      id: Date.now(),
      title: _title,
      Dday: `${_date}T${_time}`,
    }
    const ddayArr = [DdayObj, ..._ddayArr]
    localStorage.setItem('ddayArrStorage', JSON.stringify(ddayArr))
    _setDdayArr(ddayArr)
    _setDdayOutputArr(ddayArr)
    _setShowComp('list')
  } // fnSubmitHandler

  return (
    <form onSubmit={fnSubmitHandler} className='dday-add'>

      <p>
        <label htmlFor="input-id1" ><i className="fa-solid fa-pencil"></i>  D-day Title</label>
        <input id="input-id1" required onChange={fnChangeHandler} type="text" placeholder='일정명을 입력해주세요' value={_title} />
      </p>

      <p>
        <label htmlFor="input-id2"><i className="fa-regular fa-calendar-days"></i>  D-day Date</label>
        <input id="input-id2" required onChange={fnChangeHandler} type="date" value={_date} />
      </p>

      <p>
        <label htmlFor="input-id3"><i className="fa-regular fa-clock"></i>  D-day Time</label>
        <input id="input-id3" required onChange={fnChangeHandler} type="time" value={_time} />
      </p>

      <button>추가하기</button>
      <i onClick={()=>{_setShowComp('list')}} className="fa-solid fa-people-pulling"></i>
    </form>
  );
};

export default CompAdd;