//create an empty array that will contain the list elements
let todoItems = [];

// Create a function to render the to-do list items on the page
//get  the value of the input field
//create an ew list item
//create a checkbox element and add it to the list item element
//create a text node with the input value and add it to the list item element
//add the list item element to the to-do list on the page

function renderToDo() {
  const inputValue = document.querySelector("#inputTask").value;
  const addItem = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      addItem.style.textDecoration = "line-through";
    } else {
      addItem.style.textDecoration = "none";
    }
  });


  addItem.appendChild(checkbox);
  const text = document.createTextNode(inputValue);
  addItem.appendChild(text);

  //Create a remove button element with a click event listener to remove the list item and update the array
  //Append the new list item element to the to-do list on the page

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-button");
  removeButton.addEventListener("click", function () {
    addItem.remove();
    const index = todoItems.findIndex(function (item) {
      return item.id === id;
    });
    todoItems.splice(index, 1);
  });
  addItem.appendChild(removeButton);
  document.querySelector("#todo-list").appendChild(addItem);
}

//Create a factory function to create a new to-do item object
//get the value of the input field
//create a new to-do item object with 3 properties(use a variable toDo)
//push the new to-do item object to the todoItems array and render it on the page. return it

function addToDo(text) {
  const inputValue = document.querySelector("#inputTask").value;
  const toDo = {
    text: text,
    checked: false,
    id: Date.now(),
  };
  todoItems.push(toDo);
  console.log(todoItems);
  renderToDo();
  return toDo;
}

//create a variable  for the button id and add click-event listener
const addTaskButton = document.querySelector("#addTask");
addTaskButton.textContent = "Add";
addTaskButton.addEventListener("click", addItem);

//create an addItem function
//clear the input field with empty value, and add focus() to input field
//The trim() method removes whitespace from both ends of a string.

function addItem() {
  const inputValue = document.querySelector("#inputTask").value.trim();
  const text = document.createTextNode(inputValue);
  if (inputValue === "") {
    alert("Please add something");
  } else {
    addToDo(inputValue);
    document.querySelector("#inputTask").value = "";
    document.querySelector("#inputTask").focus();
  }
}
console.log(todoItems);

//create and append removeTaskButton and add click event listener to remove last added todo item
//select the last li element using :last-child, and remove it using remove() method
//then remove the corresponding item from the todoItems array using the pop() method.

const removeTaskButton = document.createElement("button");
removeTaskButton.textContent = "Remove";
document.querySelector("#input-container").appendChild(removeTaskButton);

removeTaskButton.addEventListener("click", function () {
  if (todoItems.length === 0) {
    alert("No tasks");
  } else {
    {
      let lastItem = document.querySelector("#todo-list li:last-child");
      lastItem.remove();
      todoItems.pop();
    }
  }
});

//create removeCompletedButton and add to the input container
// Add an event listener to the "Remove Completed" button.
//Using foreach(), loop through each completed item to remove it from the page.
//use findIndex() to get index of the item to remove, the splice() is used to remove 1 item from the array in that index

const removeCompletedButton = document.createElement("button");
removeCompletedButton.textContent = "Completed";
document.querySelector("#input-container").appendChild(removeCompletedButton);
removeCompletedButton.addEventListener("click", function () {
  const completedItems = document.querySelectorAll(
    "#todo-list li input[type='checkbox']:checked"
  );

  completedItems.forEach(function (item) {
    item.parentElement.remove();
    const index = todoItems.findIndex(function (todo) {
      return todo.id === parseInt(item.parentElement.id);
    });
    todoItems.splice(index, 1);
  });
});



// create a "Print" button and add it to the printing container
// add a click event listener to the "Print" button
 // create a printable version of the to-do list using the todoItems array

const printButton = document.createElement("button");
printButton.textContent = "Print";
document.querySelector("#printing").appendChild(printButton)

let printList = "";

printButton.addEventListener("click", function(){
  printList = todoItems.map(function(item){
    if(item.checked) {
      return "- " + item.text + " (completed)";
    }else {
      return "- " + item.text;
    }
  }).join("\n")

// open a new window with the printable list
const printWindow = window.open("", "Print", "width=500,height=500");
printWindow.document.write("<pre>" + printList + "</pre>");
printWindow.print();
})


