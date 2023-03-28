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

document.getElementById('.mealDelete').addEventListener('click', async deleteTime) 

function deleteTime() {
  const foodName = document.getElementById('food-name').innerText;
  console.log(foodName)
  try {
      const response = await fetch(`deleteMeals/${encodeURIComponent(foodName)}`, { method: 'DELETE' });
      if (response.ok) {
          alert('Food deleted successfully!');
          window.location.reload()
      } else {
          alert('Failed to delete the food.');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Error deleting the food.');
  }
};