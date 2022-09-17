document.querySelector('i').addEventListener('click', randomMeal)

function randomMeal() {
  let meals = ['Salmon, Cauli, Salad', 
               'Chicken, Cauli', 
               'Taco Bowl',
               'Chicken Pita',
               'Chicken Cajun Pasta',
               'Bowtie Pasta',
               'Omelette',
               'Beef n Broc',
               'Chicken Salad, Asian Salad']

  let boxes = document.querySelectorAll('.mealText')

   for(i = 0; i < boxes.length; i++){
    boxes[i].innerText = meals[Math.floor(Math.random() * meals.length)]
  }

}