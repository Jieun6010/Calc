/* 디폴트 체크 초기속성값을 객체로 리턴하는 함수만들어 */

export const fnSetObj = function (n) {
  let _chkObj = {}
  for (let i = 1; i <= 2; i++) {
    _chkObj[i] = false
  }
  _chkObj[n] = true
  return _chkObj
}
// export const fnSetDegree = (gender, bmi/* 사용자가 남자,여자인지 받아오고, 사용자의 bmi받아오기 */) => {
//   let min = (gender === 'male') ? 15 : 20
//   let max = (gender === 'male') ? 40 : 45
//   let ratio = (bmi - min) / (max - min)
//   if (ratio < 0) ratio = 0
//   if (ratio > 1) ratio = 1
//   let deg = ratio * 180
//   return deg
// }
export const fnCheckBMI = (gender, cm, kg) => {
  let m = cm * 0.01//(m/100)
  let bmi = (kg / (m * m)).toFixed(2)
  let fillColor
  let morphN // 사람번호
  let deg
  /* 사람클래스 이름, 사람색깔 */
  if ((gender === 'male' && bmi < 15) || (gender === 'female' && bmi < 20)) { //마름
    morphN = 1;
    fillColor = '#8eacc9'
  } else if ((gender === 'male' && bmi >= 15 && bmi < 20) || (gender === 'female' && bmi >= 20 && bmi < 25)) { //저체중
    morphN = 2;
    fillColor = '#99CC00'
  } else if ((gender === 'male' && bmi >= 20 && bmi < 25) || (gender === 'female' && bmi >= 25 && bmi < 30)) {//정상
    morphN = 3;
    fillColor = '#fdd500'
  } else if ((gender === 'male' && bmi >= 25 && bmi < 30) || (gender === 'female' && bmi >= 30 && bmi < 35)) {//과체중
    morphN = 4;
    fillColor = '#f5881f'
  } else {//비만
    morphN = 5;
    fillColor = '#ef5023'
  }

  /* 저울 각도 구하기 */
  let max = (gender === 'male') ? 35 : 40
  let min = (gender === 'female') ? 10 : 15
  deg = ((bmi - min) / (max - min)) * 180
  if (deg < 0) deg = 0
  if (deg > 180) deg = 180

  /* 에러 여부 확인*/
  // let err = (bmi <= 3 || bmi > 80)?true:false
  let err = (bmi < 8 || bmi > 60) && true // 위에꺼랑 같은 문법임 !

  if (!err) {
    let timeoutID
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      window.TweenMax.to('.manorg', 1, { morphSVG: `.man${morphN}`, fill: fillColor, ease: window.Linear.easeNone })
      window.TweenMax.to('.womanorg', 1, { morphSVG: `.woman${morphN}`, fill: fillColor, ease: window.Linear.easeNone })
    }, 500)
  }
  return { bmi, deg, err }
}

/* 
남자 bmi범위
20~40 경우
20(비율0)이 나오면 0
30(비율0.5)이 나오면 90
40(비율1)이 나오면 180


여자 bmi 범위
  30~50의 경우
  30(비율0)이 나오면 0
  40(비율0.5)이 나오면 90
  50(비율1)이 나오면 180
  
  비율 구하는 공식
  
  범위 : (bmi-min)/(max - min)
  
  비율 * 적용할 범위
  
  조건을 걸어서 0미만이나 1을 초과할 수 없게 해야 함
  */
