export const fnGetDateInfo = function (yymmdd) {
  let dday = new Date(yymmdd) // new Date(`2024-01-01T00:00`)
  let dayArr = ['sun', 'mon', 'tue', 'wed', 'thr', 'fri', 'sat']
  let day = dayArr[dday.getDay()]
  let year = dday.getFullYear()
  let month = dday.getMonth() + 1
  month = (month < 10) ? '0' + month : month
  let date = dday.getDate()
  date = (date < 10) ? '0' + date : date
  let ap = (dday.getHours() < 12) ? 'AM' : 'PM'
  let hour = (dday.getHours() <= 12) ? dday.getHours() : dday.getHours() - 12
  hour = (hour < 10) ? '0' + hour : hour
  let min = dday.getMinutes()
  min = (min < 10) ? '0' + min : min
  let sec = dday.getSeconds()
  sec = (sec < 10) ? '0' + sec : sec
  let timeStamp = dday.getTime()

  return { day, year, month, date, ap, hour, min, sec, timeStamp }
} // fnGetDateInfo


/* 로컬스토리지에 값이 있는지 없는지 알아보기 */
export const fnDdayArrInit = function () {
  /* 로컬스토리지에 값 가져오기 */
  let ddayArrStorage = localStorage.getItem('ddayArrStorage')
  /* ddayArrStorage가 트루라면 JSON.parse로 바꿔서 ddayArr에 넣고, false면 빈 배열을 출력하기*/
  let ddayArr = (ddayArrStorage)
    ? // 사용자 dday배열이 로컬스토리지에 존재한다면
    JSON.parse(ddayArrStorage) // 로컬스토리지 배열을 리턴한다.
    : //사용자 dday배열이 로컬스토리지에 없다면
    [
      {
        id: Date.now(),
        title: ' 새해 (Sample data)',
        Dday: new Date().getFullYear() + 1 + '-01-01T00:00' // 다음년도 1월1일
      },
    ]
  return ddayArr
} // fnDdayArrInit

/*  */
export const fnTimer = function (DdayTimeStamp) {
  let diffTimeStamp = DdayTimeStamp - Date.now()
  let diffSec = parseInt(diffTimeStamp / 1000) // 1초를 1000으로 계산하니까 나눠야한다.
  let remain
  let remainDays = parseInt(diffSec / (60 * 60 * 24))
  remain = parseInt(diffSec % (60 * 60 * 24))
  let remainHours = parseInt(remain / (60 * 60))
  remain = parseInt(remain % (60 * 60))
  let remainMinutes = parseInt(remain / 60)
  let remainSecs = parseInt(remain % 60) // 더이상 나눌 수 없음 / 최종적으로 구해진 값 ! 초
  if (diffTimeStamp < 0) {
    remainDays = 0; remainHours = 0; remainMinutes = 0; remainSecs = 0
  }

  return { remainDays, remainHours, remainMinutes, remainSecs }
} // fnTimer
