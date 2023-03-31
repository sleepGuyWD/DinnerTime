let deleteBtn = document.querySelectorAll('.icon-span')

Array.from(deleteBtn).forEach((e) => {
    e.addEventListener('click', deleteMeal)
})

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

 async function deleteMeal() {
    const mealText = this.parentNode.childNodes[1].innerText

   try { 
        const res = await fetch('deleteMeal', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': mealText
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }

   
}