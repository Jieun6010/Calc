const btnArr = [
  { type: 'clear', char: <i className="fa-solid fa-trash-can"></i>, id: '1', },
  { type: 'string', char: '(', id: '2', },
  { type: 'string', char: ')', id: '3', },
  { type: 'string', char: '/', id: '4', },
  { type: 'string', char: '7', id: '5', },
  { type: 'string', char: '8', id: '6', },
  { type: 'string', char: '9', id: '7', },
  { type: 'string', char: '*', id: '8', },
  { type: 'string', char: '4', id: '9', },
  { type: 'string', char: '5', id: '10', },
  { type: 'string', char: '6', id: '11', },
  { type: 'string', char: '-', id: '12', },
  { type: 'string', char: '1', id: '13', },
  { type: 'string', char: '2', id: '14', },
  { type: 'string', char: '3', id: '15', },
  { type: 'string', char: '+', id: '16', },
  { type: 'del', char: <i className="fa-solid fa-eraser"></i>, id: '17', },
  { type: 'string', char: '0', id: '18', },
  { type: 'string', char: '.', id: '19', },
  { type: 'equal', char: '=', id: '20', },
]

const fnSetOutput = (output, char, type) => {
  let showModal = false
  let errMsg

  if (type === 'string') {
    if (output.length >= 30) {
      showModal = true
      errMsg = '계산식이 너무 길어요'
    }else {
      output += char
    }

  } else if (type === 'clear') {
    output = ''
  } else if (type === 'del') {
    /* 
    slice
    str = '가나다라'
    str.slice(0,-1) //뒤에 한글자가 지워짐. -2는 두글자 지움
    str.slice(1,str.length-1)
    str.slice(1,2) -> '나다'
    str.slice(0,2) -> '가나다'
    */
    output = output.slice(0, -1) // 뒤에 글자 하나 잘라서 다시 output이 받아먹고 리턴
  } else {
    // new Function 문자열을 스크립트로 리터럴? 해줌
    const result = '(1+1)/3'

    try {//예외처리구문 // 일단 시도해라 라는 뜻 !
      const fnCalc = new Function(`return ${output}`) // const fnClac = function(){return output}
      const prevOutput = output
      output = fnCalc() // 2.12345


      if (output < Math.pow(10, 21)) {
        output = parseInt(output * 100000)
        output = output / 100000
      }
      output = String(output)

      if (output.length >= 30) {
        errMsg = '계산식이 너무 길어요'
        showModal = true
        output = prevOutput
      }
    } catch { // 에러가 잡히면 이거 할게 ! 라는 뜻
      errMsg = '계산식이 잘못 되었습니다.'
      showModal = true
    }
  } // else


  return {output,showModal,errMsg}

}

export { btnArr, fnSetOutput };