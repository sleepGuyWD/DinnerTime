document.querySelector('.whiteBlock.inner').addEventListener('click', randomMeal)

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


