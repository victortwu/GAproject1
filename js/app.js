
const testObject = {
  score: 0,
  chances: 5
}

const cardNumber = []

const randomNumber = () => {
  return Math.floor(Math.random() * 10) + 1
}

const showRandomCard = () => {

  $('.column-left').empty()
  cardNumber.pop()

  const $div = $('<div>').attr('class', 'card')
  $div.text(randomNumber())

  $('.column-left').append($div)

  const str = $div.text()
  const number = parseInt(str)

  cardNumber.push(number)
}


// function make plates

const makePlates = () => {

  $('.column-right').empty()

    for (let i = 0; i < 4; i++) {
      const $div = $('<div>').attr('class', 'plate')
      const randomDrumsticks = randomNumber()
      $div.text(randomDrumsticks) /////////// <<<---- STORE THIS A DIFF WAY? OR get rid of it?
      $div.data('number', randomDrumsticks)///<-----so far...USELESS
          for (let i = 0; i < randomDrumsticks; i++){
            const $drumDiv = $('<div>').attr('class', 'drumstick')//<---make img from here?
            $div.append($drumDiv)    // $div.append('img id='image' src='theimage.png')
          }

    $('.column-right').append($div)
    const numOfDrums = $div.data().number
    console.log(numOfDrums)
    }

        $('.plate').on('click', (e)=>{
            const currentPlateStr = e.currentTarget.innerText

            const currentPlateNum = parseInt(currentPlateStr)

            checkMatch(currentPlateNum)
              if (testObject.score >= 20 && testObject.chances > 0) {
                alert ('YOU WIN')
                resetGame()
                return
              }
              if (testObject.chances <= 0) {
                alert ('BETTER LUCK NEXT TIME')
                resetGame()
                return
              }

            showRandomCard()
            makePlates()
          })
}

// function reset GAME

const resetGame = () => {
  $('.column-left').empty()
  $('.column-right').empty()
  testObject.score = 0
  testObject.chances = 5
  console.log(testObject)
}


// function to check match

const checkMatch = (num) => {//pass in value from .plate div

    if (num === cardNumber[0]) {
      alert(`it's a match!`) //<---- perhaps a modal
      testObject.score = testObject.score + num
    }else{
      alert('nope') // <---- modal
      testObject.chances = testObject.chances - 1
    }
    console.log(testObject)
}



// function => select plate
        // drag and drop

// playGame function

const playGame = () => {
  showRandomCard()
  makePlates()
}


// jquery listners and callbacks go here
//--------------------------------------
$(()=>{

$('#playgame').on('click', ()=> playGame())


$('#reset').on('click', ()=> resetGame())


$('#makeplates').on('click', ()=> makePlates())


})
