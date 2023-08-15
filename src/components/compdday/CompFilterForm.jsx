import React, { useContext } from 'react';
import { DDayContext } from './CompDday';

const CompFilterForm = ({ _filterActive, _setFilterActive, _searchText, _setSeachText }) => {

  const {
    _ddayArr, _setDdayArr,
    _ddayOutputArr, _setDdayOutputArr,
    // _searchText, _setSeachText
  }
    = useContext(DDayContext)


  /* sort함수  ---------------------------- */
  const fnSortHandler = function (e) {
    const sortType = e.currentTarget.value
    let ddayArrCopy = [..._ddayArr]
    let sortedArr
    if (sortType === 'latest') { // 최신등록순
      sortedArr = [..._ddayArr]
    } else if (sortType === 'time') { // 시간정렬
      sortedArr = [..._ddayArr].sort((a, b) => {
        if (a.Dday > b.Dday) {
          return 1
        } else if (a.Dday < b.Dday) {
          return -1
        } else {
          return 0
        }
      })
    } else if (sortType === 'title') {
      sortedArr = [..._ddayArr].sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1
        } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1
        } else {
          return 0
        }
      }) // sort end
    } // if sortType

    _setDdayOutputArr(sortedArr) // 정렬된걸로 출력을 바꾸겠다.
    _setFilterActive('')
    document.querySelector(`.filter-btn`).classList.remove(`active`)
  } // fnSortHandler


  /*  search 함수 ------------------------------------- */
  const fnSearchHandler = function (e) {
    let searchText = e.target.value
    _setSeachText(searchText)
    let searchArr = (searchText)
      ? _ddayArr.filter(v => v.title.includes(searchText))
      : [..._ddayArr]
    _setDdayOutputArr(searchArr)
  } // fnSearchHandler

  /* submit 함수 ------------------------------------------ */
  const fnSubmitHandler = function (e) {
    e.preventDefault()
    _setSeachText('')
    _setFilterActive('')
    document.querySelector(`.filter-btn`).classList.remove(`active`)
  } // fnSubmitHandler

  return (
    <form onSubmit={fnSubmitHandler} className={`filter-form ${_filterActive}`} >

      <fieldset>
        <legend><i className="fa-solid fa-list"></i> 정렬</legend>
        <button type='button' onClick={fnSortHandler} value='latest'>최신등록순</button>
        <button type='button' onClick={fnSortHandler} value='time'>D-day시간</button>
        <button type='button' onClick={fnSortHandler} value='title'>D-day제목</button> {/* 여기서 버튼으로 바꿨기때문에 엔터를 쳐도 서브밋 이벤트가 실행이 안됨 ~! */}
      </fieldset>

      <fieldset>
        <legend><i class="fa-solid fa-magnifying-glass"></i> 검색</legend>
        <input value={_searchText} onInput={fnSearchHandler} type="text" />{/* 기본타입이 서브밋임 ! 그래서 엔터를 치면 서브밋 이벤트가 발생 */}
      </fieldset>

    </form>
  );
};

export default CompFilterForm;