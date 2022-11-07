//bugs: player can overwrite bot FIXED
//bugs: tie doesn't happen FIXED
//bugs: if bot wins at end it doens't win FIXED
//bugs: If you win at the end it still says try again FIXED


//make a clickable event for each block
document.querySelectorAll('.block').forEach(element => {
  //querySelector returns an array
  element.addEventListener('click',playerTurn)
});
function youWin(){
          const wins = parseFloat(document.querySelector('.wins').innerText)
          fetch('wins', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'wins':wins,
            })
          })
          .then(response => {
            if (response.ok) return response.json()
          })
          .then(data => {
            setTimeout(() => {
                window.location.reload(true)
            }, 1000);
          })
}
function youLose(){
          const loss = parseFloat(document.querySelector('.loss').innerText)
          fetch('loss', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'loss':loss,
            })
          })
          .then(response => {
            if (response.ok) return response.json()
          })
          .then(data => {
            setTimeout(() => {
                window.location.reload(true)
            }, 1000);
          })
          
}
function youTie(){
setTimeout(() => {
        window.location.reload(true)
    }, 1000); 
}
let blocks = Array.from(document.querySelectorAll('.block'))
//FIX: changed blocks from nodeList to Array so filter would work on it

function playerTurn(evt){
  evt.target.innerText = 'x'
//(event).target returns the element that is clicked on
  evt.target.removeEventListener('click',playerTurn)
  //when player clicks on grid it adds an X and removes the event listener so it can't do it again
  blocks = blocks.filter(el => el !== evt.target)
  //created a new array called blocks that contains what was filtered out

  // Fix: only call when there is an aviable space
  if(blocks.length !== 0){
      botTurn()
      checkWinner()
  }else if(!checkWinner()){
      document.querySelector('#result').innerText = 'It\'s a Tie! Try Again!'
      youTie()
    //   alert('You Win! You Lose! Play Again!')
      reload()
  }
}

function botTurn(){
  const random = Math.floor(Math.random() * blocks.length)
  //random number of block of the grid that havent been chosen by the player.
  blocks[random].innerText = 'o'
  blocks = blocks.filter(el => el !== blocks[random])
  document.querySelectorAll('.block').forEach( el => {
      //removes ability for player to click on something the bot clicked on
      if(el.innerText !== ''){
          el.removeEventListener('click',playerTurn)
      }
  })

  //if no winner
  // if (blocks[random] === undefined){
  //     alert('Try Again')
  // }
}

function checkWinner(){
  let one = document.querySelector('#one').innerText,
      two = document.querySelector('#two').innerText,
      three = document.querySelector('#three').innerText,
      four = document.querySelector('#four').innerText,
      five = document.querySelector('#five').innerText,
      six = document.querySelector('#six').innerText,
      seven = document.querySelector('#seven').innerText,
      eight = document.querySelector('#eight').innerText,
      nine = document.querySelector('#nine').innerText
  
  switch (true){
      case (one === two && one === three):
          if(one === 'x'){
          document.querySelector('#result').innerText = 'You Win!'
          youWin()
          alert('You Win! Play Again?')
          reload()
          return true
          }
          else if(one === 'o'){
              document.querySelector('#result').innerText = 'You Lose!'
              youLose()
              alert('You Lose! Play Again!')
              reload()
              return true
          }
      break;
      case (four === five && four === six):
          if(four === 'x'){
          document.querySelector('#result').innerText = 'You Win!'
          youWin()
          alert('You Win! Play Again?')
          reload()
          return true
          }
          else if(four === 'o'){
              document.querySelector('#result').innerText = 'You Lose!'
              youLose()
              alert('You Lose! Play Again!')
              reload()
              return true
          }
      break;
      case (seven === eight && seven === nine):
          if(seven === 'x'){
          document.querySelector('#result').innerText = 'You Win!'
          youWin()
          alert('You Win! Play Again?')
          reload()
          return true
          }
          else if(seven === 'o'){
              document.querySelector('#result').innerText = 'You Lose!'
              youLose()
              alert('You Lose! Play Again!')
              reload()
              return true
          }
      break;
      case (one === four && one === seven):
          if(one === 'x'){
          document.querySelector('#result').innerText = 'You Win!'
          youWin()
          alert('You Win! Play Again?')
          reload()
          return true
          }
          else if(one === 'o'){
              document.querySelector('#result').innerText = 'You Lose!'
              youLose()
              alert('You Lose! Play Again!')
              reload()
              return true
          }
      break; 
      case (two === five && two === eight):
          if(two === 'x'){
          document.querySelector('#result').innerText = 'You Win!'
          youWin()
          alert('You Win! Play Again?')
          reload()
          return true
          }
          else if(two === 'o'){
              document.querySelector('#result').innerText = 'You Lose!'
              youLose()
              alert('You Lose! Play Again!')
              reload()
              return true
          }
      break;
      case (three === six && three === nine):
          if(three === 'x'){
          document.querySelector('#result').innerText = 'You Win!'
          youWin()
          alert('You Win! Play Again?')
          reload()
          
          return true
          }
          else if(three === 'o'){
              document.querySelector('#result').innerText = 'You Lose!'
              youLose()
              alert('You Lose! Play Again!')
              reload()
              return true
          }
      break;
      case (one === five && one === nine):
          if(one === 'x'){
          document.querySelector('#result').innerText = 'You Win!'
          youWin()
          alert('You Win! Play Again?')
          reload()
          return true
          }
          else if(one === 'o'){
              document.querySelector('#result').innerText = 'You Lose!'
              youLose()
              alert('You Lose! Play Again!')
              reload()
              return true
          }
      break;      
      case (three === five && three === seven):
          if(three === 'x'){
          document.querySelector('#result').innerText = 'You Win!'
          youWin()
          alert('You Win! Play Again?')
          reload()
          return true
          }
          else if(three === 'o'){
              document.querySelector('#result').innerText = 'You Lose!'
              youLose()
              alert('You Lose! Play Again!')
              reload()
              return true
          }
      break; 
  }
  return false
}

// var thumbUp = document.getElementsByClassName("fa-thumbs-up");
// var thumbDown = document.getElementsByClassName("fa-thumbs-down");
// var trash = document.getElementsByClassName("fa-trash-o");

// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('thumbUp', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp,
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// Array.from(thumbDown).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
//     fetch('thumbDown', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbDown':thumbDown,
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
