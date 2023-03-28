document.querySelector('.whiteBlock.inner').addEventListener('click', randomMeal)

let toDelete = document.querySelector('#mealDelete').innerText

const deleteButton = document.querySelector('.mealDelete')

function randomMeal() {
   fetch('/random-document')
    .then(res => res.json())
    .then(data => {
    
    let boxes = document.querySelectorAll('.mealText')

    for(i = 0; i < boxes.length; i++){
    boxes[i].innerText = data[Math.floor(Math.random() * data.length)].mealName
    }

    })
    .catch(err => console.error(err));
}

deleteButton.addEventListener('click', _ => {
  fetch('deleteMeals', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: toDelete
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    if (response === 'No Quote to delete') {
      messageDiv.textContent = 'No Darth Vader quote to delete'
    } else {
      window.location.reload()
    }
  })
})