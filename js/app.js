
const testObject = {
  score: 0,
  chances: 5
}

const $imgClosed = $('<img>').attr('src', 'images/Dino 1.png')
$imgClosed.attr('class', 'trex')

const $imgOpen = $('<img>').attr('src', 'images/Dino 2.png')
$imgOpen.attr('class', 'trex2')

const cardNumber = []

const randomNumber = () => {
  return Math.floor(Math.random() * 10) + 1
}

const showRandomCard = () => {

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
}

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
}
// function make plates

const makePlates = () => {

  $('.column-right').empty()

    for (let i = 0; i < 4; i++) {
      const $div = $('<div>').attr('class', 'plate')
      const randomDrumsticks = randomNumber()
      $div.text(randomDrumsticks) /////////// <<<---- STORE THIS A DIFF WAY? OR get rid of it?
      //$div.data('number', randomDrumsticks)///<-----so far...USELESS
      $div.draggable({
        revert: 'invalid',
        // stop: function (e, ui) {
        //   alert('stopped')


        //}
      })
      //console.log($div.draggable())
          for (let i = 0; i < randomDrumsticks; i++){
            const $drumDiv = $('<img>').attr('src', 'images/Drumstick.png')//<---make img from here?
            $drumDiv.attr('class', 'drumstick')
            $div.append($drumDiv)
          }
          // $div.draggable({
          //   //revert: 'invalid',
          //   stop: function (e, ui) {
          //     alert('stopped')
          //     const thisPlate = e.target
          //     console.log(thisPlate)
          //     //thisPlate.draggable('destroy')
          //     thisPlate.css('background', 'yellow')
          //   }
          // })


    $('.column-right').append($div)
    //const numOfDrums = $div.data().number
    //console.log(numOfDrums)
    console.log($div)
    }



    // $('.plate').on('click', (e)=>{
    //         const currentPlateStr = e.currentTarget.innerText
    //
    //         const currentPlateNum = parseInt(currentPlateStr)
    //
    //         checkMatch(currentPlateNum)
    //           if (testObject.score >= 20 && testObject.chances > 0) {
    //             alert ('YOU WIN')
    //             resetGame()
    //             return
    //           }
    //           if (testObject.chances <= 0) {
    //             alert ('BETTER LUCK NEXT TIME')
    //             resetGame()
    //             return
    //           }
    //
    //         showRandomCard()
    //         makePlates()
    //       })


          $('.trex').droppable( {
              drop: function (e, ui) {




                ui.draggable.remove()
                console.log(ui.draggable)
                const currentPlate = ui.draggable
                console.log(currentPlate.text())
                const currentPlateStr = currentPlate.text()

                const currentPlateNum = parseInt(currentPlateStr)
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

       //<---- perhaps a modal
      testObject.score = testObject.score + num
      alert(`It's a match! You have ${testObject.score} bones!`)
      $('.scorebox').text(`Bones: ${testObject.score}`)
      $('.chancebox').text(`Chances Left: ${testObject.chances}`)
    }else{
       // <---- modal
      testObject.chances = testObject.chances - 1
      alert(`Sorry! You have ${testObject.chances} chances left`)
      $('.scorebox').text(`Score: ${testObject.score}`)
      $('.chancebox').text(`Chances Left: ${testObject.chances}`)
    }

}



// function => select plate
        // drag and drop

// playGame function

const playGame = () => {
  $('.container').append($imgClosed)
  showRandomCard()
  makePlates()
}


// jquery listners and callbacks go here
//--------------------------------------
$(()=>{

$('#playgame').on('click', ()=> playGame())


$('#reset').on('click', ()=> resetGame())
//$('#reset').on('click', ()=> chompingTrex())

$('#makeplates').on('click', ()=> makePlates())

    // $('.trex').droppable( {
    //     drop: function (e, ui) {
    //       alert('DROPPED')
    //     }
    //   })

})
