import React, { useContext, useState } from 'react';
import { DDayContext } from './CompDday';
import CompListItem from './CompListItem';
import CompFilterForm from './CompFilterForm';

const CompList = () => {

  const [_filterActive, _setFilterActive] = useState('')
  const [_searchText, _setSeachText] = useState()

  const { _showComp, _setShowComp, _ddayArr, _setDdayArr, _ddayOutputArr, _setDdayOutputArr } = useContext(DDayContext)

  const fnfilterHandler = function (e) {
    e.currentTarget.classList.toggle(`active`)
    _setFilterActive(c => (c === '') ? `active` : '')
    _setSeachText('')
  } // fnfilterHandler

  return (
    <>
      <article className='dday-list'>

        <button onClick={fnfilterHandler} className='filter-btn'>
          <i className="fa-solid fa-magnifying-glass-plus"></i>
          <i className="fa-solid fa-magnifying-glass-minus"></i>
        </button>



        {
          /* _ddayOutputArr.length가 있으면(배열이 하나라도 있으면) 목록 출력*/
          (_ddayOutputArr.length)
            ?
            <ul>
              {_ddayOutputArr.map(v => <CompListItem key={v.id} item={v} />)}
            </ul>
            :     /* 목록이 비어있으면(false) 안내 멘트 출력 */
            <p className="no-msg">  D-day 일정이 존재하지 않습니다 ! </p>
        }


        <CompFilterForm _filterActive={_filterActive} _setFilterActive={_setFilterActive} _setSeachText={_setSeachText} _searchText={_searchText} />
      </article>
      <button onClick={() => { _setShowComp('add') }} className='btn-add'><img src={require('../../assets/img/timer-icon2.gif')} />D-day 추가하기</button>
    </>
  );
};

export default CompList;