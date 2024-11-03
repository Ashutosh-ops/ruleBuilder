console.log("This is working");

const source = document.getElementById("draggable");

function myFunction(event){
  // event.preventDefault();
  console.log("Inside myFun");
}

function myDragStartFun(event){
  console.log("Drag Start");
}

function myDragEndFun(event){
  console.log("Drag End");
}

function myDragFun(event){
  event.preventDefault();
  console.log("Drag In progress");
}

function myDropOverFun(event) {
  console.log("Drop Over");
  
}

  
