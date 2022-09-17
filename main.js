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
               'Chicken Salad, Asian Salad' ]

  let boxes = document.querySelectorAll('.dayText')

  boxes.forEach((x, i) => {
   boxes[i] =  meals[Math.floor(Math.random() * meals.length)]
  })
 
}