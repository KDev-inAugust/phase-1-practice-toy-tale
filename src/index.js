let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


});

//----------------------card for each toy-------------
let collection = document.getElementById('toy-collection');


fetch('http://localhost:3000/toys')
.then(res => res.json())
.then(data=> {
  data.forEach(toy => {
    renderCard(toy)})
  
  }
  
  )
  
function renderCard(toy)
{
  let img = document.createElement('img');
  let div = document.createElement('div');
  let h2= document.createElement('h2');
  let p = document.createElement('p');
  let button = document.createElement('button');
  h2.innnerText=toy.name;
  collection.append(div);
  div.className='card';
  div.append(h2);
  div.append(img);
  div.append(p);
  div.append(button);
  button.className="like-btn";
  button.innerText=`toy ID ${toy.id}`;
  p.innerText=`${toy.likes} likes`;
  img.className="toy-avatar";
  h2.innerText=toy.name;
  img.src=toy.image; 
  console.log(toy.name)

  button.addEventListener('click', ()=> {
    fetch(`http://localhost:3000/toys/${toy.id}`)
    .then(res => res.json())
    .then(data=> {increaseLikes(toy.id, data.likes); p.innerText=`${data.likes+1} likes`});
  
  })
}


//------------------------add a new toy-----------------
const nameField = document.getElementsByName('name');
const imageFiled = document.getElementsByName('image');
const submit = document.getElementsByClassName('submit');

const createToyBtn = document.getElementsByClassName('submit');
document.querySelector('form').addEventListener('submit', (e)=> {
  e.preventDefault();
  const nameData=e.target.name.value;
  const imageURLData=e.target.imageURL.value;
  console.log(nameData);
  console.log(imageURLData);
  postToy(nameData, imageURLData);
})


function postToy (name, url){

  fetch('http://localhost:3000/toys',{
    method:'POST',
    headers:
    {
    "Content-Type": "application/json",
    Accept: "application/json"
    },
    body: JSON.stringify
  
    ({
    "name":`${name}` ,
    "image":`${url}` ,
    "likes": 0
    })

  })
  renderPostedToy()
}

function renderPostedToy(){

  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(
    data=>{
      renderCard(data[data.length -1])
      console.log(data[data.length-1])
    }
  
  )
}

//------------------------Update Likes on a Card------------------------------


function increaseLikes (id, likes){
  

  fetch(`http://localhost:3000/toys/${id}`,{
    method:'PATCH',
    headers:
        {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
      body: JSON.stringify
  
      ({
      "likes": likes+1,
      })

  })
  .then(fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data=> {console.log(`${data[id-1].likes}`); }))

}



//--------------------figure out how to isolate likes to a variable
function getLikes(id){
  return fetch(`http://localhost:3000/toys/${id}`)
    .then(res => res.json())
    .then(data => console.log(data.likes))
  }





