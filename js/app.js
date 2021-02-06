//DATA

//test object

const testObject = {
  score: 0,
  chances: 5

}





// =============
// functionality
// ==============
// function => start GAME
    // will prompt for name??  maybe not cause it's for pre - K
    // needs to be a 'start' button click

      //calls a random card function

      //calls a random drumsticks function to list plates
          // need a make plates function

// function => end game

// function => reset game
        // reset button click

// function random card


const cardNumber = []



const randomNumber = () => {
  return Math.floor(Math.random() * 10) + 1
}



const showRandomCard = () => {
  // something to clear element everytime called
  $('.column-left').empty()
  cardNumber.pop()
  const $div = $('<div>').attr('class', 'card')
  $div.text(randomNumber())
  $('.column-left').append($div)
  const str = $div.text()
  const number = parseInt(str)
  cardNumber.push(number)

}
console.log(cardNumber)

// function make plates
    // perhaps make a class w constructor


const makePlates = () => {
  // something to clear element everytime called
  $('.column-right').empty()
  for (let i = 0; i < 4; i++) {
    const $div = $('<div>').attr('class', 'plate')
    const randomDrumsticks = randomNumber()
    $div.text(randomDrumsticks) /////////// <<<---- STORE THIS A DIFF WAY? OR get rid of it?
    $div.data('number', randomDrumsticks)///<-----so far...USELESS
      for (let i = 0; i < randomDrumsticks; i++){
        const $drumDiv = $('<div>').attr('class', 'drumstick')
        $div.append($drumDiv)
      }

  $('.column-right').append($div)
  //return randomDrumsticks // <---randomDrumsticks is a number (there's a of them)
  const numOfDrums = $div.data().number
  console.log(numOfDrums)
  }


$('.plate').on('click', (e)=>{
    const currentPlateStr = e.currentTarget.innerText

    console.log('-----------------')
    console.log(`String is: ${currentPlateStr}`)

    const currentPlateNum = parseInt(currentPlateStr)

    console.log('Number is:')
    console.log(currentPlateNum)

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
      alert(`it's a match!`)
      testObject.score = testObject.score + num



    }else{
      alert('nope')
      testObject.chances = testObject.chances - 1

    }
    console.log(testObject)
}



// function => select plate
        // drag and drop

// playGame function

const playGame = () => {
  //set up first round
  makePlates()
  showRandomCard()


}




// function next plates
        // resets plates, calls make plates function
        // just call makePlates()

// jquery listners and callbacks go here
//--------------------------------------
$(()=>{

$('#playgame').on('click', ()=> playGame())


$('#reset').on('click', ()=> resetGame())


$('#makeplates').on('click', ()=> makePlates())


})
