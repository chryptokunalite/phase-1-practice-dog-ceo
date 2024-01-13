console.log('%c HI', 'color: firebrick')
//On Page Load
document.addEventListener("DOMContentLoaded", function () {


//FETCH DOG IMAGES
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

fetch(imgUrl)
  .then(function (response){
    return response.json(); 
  })
  .then(function (data){
    for (const url of data.message){
      let dogImage = document.createElement('img')
      dogImage.src = url
      document.getElementById('dog-image-container').append(dogImage)
    }
  });
  

  //FETCH DOG BREEDS AND CHECK FOR SUB-BREEDS & CHANGE COLOR ONCLICK
  const breedUrl = "https://dog.ceo/api/breeds/list/all";

  fetch(breedUrl)
  .then(function (response){
    return response.json();
  })
  .then(function (data){
    console.log(data)
    for (const breed in data.message){
      if (Array.isArray(data.message[breed])){
        for (const subBreed of data.message[breed]){ 
          let dogBreed = document.createElement('li');
          dogBreed.textContent = `${subBreed}-${breed}`;
          dogBreed.addEventListener('click', function () {
            this.style.color = 'green';
          })
          document.getElementById('dog-breeds').append(dogBreed)
        }
        } else {
          let dogBreed = document.createElement('li'); 
          dogBreed.textContent = breed; 
          dogBreed.addEventListener(function (){
            this.style.color = 'green';
          })
          document.getElementById('dog-breeds').append(dogBreed); 
        }
      }
    })

  // FILTER DOG BREEDS BY LETTER
  const dropdown = document.getElementById('breed-dropdown');
  const breedContainer = document.getElementById('dog-breeds');

  dropdown.addEventListener('change', function(){
    const selectedLetter = dropdown.value.toLowerCase();
 
    for (const breedElement of breedContainer.children){
      const breedName = breedElement.textContent.toLowerCase(); 
      if (breedName.startsWith(selectedLetter)){
        breedElement.style.display = 'block'; 
      } else {
        breedElement.style.display = 'none'; 
      }
    }
  
  })
})

