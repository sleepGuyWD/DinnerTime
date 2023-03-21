document.querySelector('i').addEventListener('click', randomMeal)

function randomMeal() {
  let meals = ['Salmon, Cauli, Salad', 
               'Chicken, Cauli', 
               'Taco Bowl',
               'Chicken Cajun Pasta',
               'Bowtie Pasta',
               'Omelette',
               'Beef n Broc',
               'Chicken Salad, Asian Salad',
               'Chicken Curry'
              ]

  let boxes = document.querySelectorAll('.mealText')

   for(i = 0; i < boxes.length; i++){
    boxes[i].innerText = meals[Math.floor(Math.random() * meals.length)]
  }

}