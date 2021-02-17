
const testObject = {
  score: 0,
  chances: 5
}


const $imgClosed = $('<img>').attr('src', 'images/Dino 1.png')
$imgClosed.attr('class', 'trex')


const $imgOpen = $('<img>').attr('src', 'images/Dino 2.png')
$imgOpen.attr('class', 'trex2')


// holds single number to match to generated from showRandomCard()
const cardNumber = []

//temporarily stores random plates of drumsticks including correct plate
let plates = []


// shuffle plates function <-- credit: stackoverflow
// const shuffle = (arr) => {
//     let currentIndex = arr.length, temporaryValue, randomIndex
//         // While there remain elements to shuffle...
//         while (0 !== currentIndex) {
//           // Pick a remaining element...
//           randomIndex = Math.floor(Math.random() * currentIndex)
//           currentIndex -= 1
//           // And swap it with the current element.
//           temporaryValue = arr[currentIndex]
//           arr[currentIndex] = arr[randomIndex]
//           arr[randomIndex] = temporaryValue
//         }
//         return arr
// }

// a different way to shuffle plates using .sort()

const randomNumber = () => {
  return Math.floor(Math.random() * 10) + 1
}


// number in talk bubble to match to function
const showRandomCard = () => {
  plates = []
  $('.column-left').empty()
  cardNumber.pop()

  const $div = $('<div>').attr('class', 'card')
  $div.text(randomNumber())

  const $littleDiv = $('<div>').attr('class', 'triangle')

  $('.column-left').append($div)
  $('.column-left').append($littleDiv)

  const str = $div.text()
  const number = parseInt(str)

  cardNumber.push(number)

// must make one plate here with same value and push to plates[]
  const $divAnswer = $('<div>').attr('class', 'plate')
  $divAnswer.text($div.text())

  $divAnswer.draggable({
    revert: 'invalid'
  })
  for (let i = 0; i < number; i++){
    const $drumDiv = $('<img>').attr('src', 'images/Drumstick.png')//<---make img from here?
    $drumDiv.attr('class', 'drumstick')
    $divAnswer.append($drumDiv)
  }
  plates.push($divAnswer)

}
console.log(plates)



// function chompingTrex
const chompingTrex = () => {

    $('.trex').hide()
    $('.container').append($imgOpen)
    setTimeout(()=> {$($imgOpen).hide()}, 500)
    setTimeout(()=> {$('.trex').show()}, 500)
    setTimeout(()=> {$($imgOpen).show()}, 1000)
    setTimeout(()=> {$('.trex').hide()}, 1000)
    setTimeout(()=> {$($imgOpen).hide()}, 1500)
    setTimeout(()=> {$('.trex').show()}, 1500)
    setTimeout(()=> {$($imgOpen).show()}, 2000)
    setTimeout(()=> {$('.trex').hide()}, 2000)
    setTimeout(()=> {$($imgOpen).hide()}, 2500)
    setTimeout(()=> {$('.trex').show()}, 2500)
    setTimeout(()=> {$($imgOpen).show()}, 3000)
    setTimeout(()=> {$('.trex').hide()}, 3000)
    setTimeout(()=> {$($imgOpen).hide()}, 3500)
    setTimeout(()=> {$('.trex').show()}, 3500)
    setTimeout(()=> {$($imgOpen).show()}, 4000)
    setTimeout(()=> {$('.trex').hide()}, 4000)
    setTimeout(()=> {$($imgOpen).hide()}, 4500)
    setTimeout(()=> {$('.trex').show()}, 4500)
}



// function make plates
const makePlates = () => {

  $('.column-right').empty()
  showRandomCard()

    for (let i = 0; i < 3; i++) {
      const $div = $('<div>').attr('class', 'plate')
      const randomDrumsticks = randomNumber()
      $div.text(randomDrumsticks)
      $div.draggable({
        revert: 'invalid'
      })
          for (let i = 0; i < randomDrumsticks; i++){
            const $drumDiv = $('<img>').attr('src', 'images/Drumstick.png')//<---make img from here?
            $drumDiv.attr('class', 'drumstick')
            $div.append($drumDiv)
          }
          //$div.effect('bounce', {times: 10}, 'slow')
          plates.push($div)
        }

  //randomly append ALL plates including the answer
  //let shuffledPlates = shuffle(plates) //<--had to use this from stackoverflow

  // a different way to shuffle plates using .sort()
  let shuffledPlates = plates.sort( (a, b) => {
    return .5 - Math.random()
  })

  for (let i = 0; i < shuffledPlates.length; i++) {// tried and WANTED to achieve same result with just the for loop, I will revisit
      $('.column-right').append(shuffledPlates[i])
      shuffledPlates[i]//.effect('bounce', {distance: 30, times: 30}, 2000) <--this made draggable buggy
  }

  // drop to eventlistener
  $('.trex').droppable( {
        drop: function (e, ui) {

            const currentPlate = ui.draggable
            const currentPlateStr = currentPlate.text()
            const currentPlateNum = parseInt(currentPlateStr)

            if (currentPlateNum === cardNumber[0]) {
              currentPlate.hide('explode', {pieces: 20}, 3000)
            }else{
              currentPlate.remove()
            }

            checkMatch(currentPlateNum)

                if (testObject.score >= 25 && testObject.chances > 0) {
                    $('.card').text('YOU WIN!')
                    setTimeout(()=> {resetGame()}, 3000)
                    return
                    }
                if (testObject.chances <= 0) {
                  $('.card').text('sorry GAME OVER')
                  setTimeout(()=> {resetGame()}, 3000)
                    return
                    }
                    makePlates()
        }
    })
}


// function reset GAME
const resetGame = () => {
  $('.column-left').empty()
  $('.column-right').empty()
  $('.scorebox').empty()
  $('.chancebox').empty()
  testObject.score = 0
  testObject.chances = 5
  console.log(testObject)
}



// function to check match
const checkMatch = (num) => {//pass in value from .plate div

    if (num === cardNumber[0]) {
      chompingTrex()
      testObject.score = testObject.score + num
      alert(`It's a match! You've earned ${cardNumber[0]} bones!`)
      $('.scorebox').text(`Bones: ${testObject.score}`)
      $('.chancebox').text(`Chances Left: ${testObject.chances}`)
    }else{
      testObject.chances = testObject.chances - 1
      alert(`Sorry! You have ${testObject.chances} chances left`)
      $('.scorebox').text(`Score: ${testObject.score}`)
      $('.chancebox').text(`Chances Left: ${testObject.chances}`)
    }

}


// playGame function

const playGame = () => {

  $('.container').append($imgClosed)
  makePlates()
}


// jquery listners and callbacks go here
//--------------------------------------
$(()=>{

$('#playgame').on('click', ()=> playGame())


$('#reset').on('click', ()=> resetGame())


})
