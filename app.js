// Selectors
const todoInput = document.querySelector('.todo-input');
const todoSubmit = document.querySelector('.todo-submit');
const todoList = document.querySelector('.todo-list');

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoSubmit.addEventListener("click",addTodo);                     // to add a new to do
todoList.addEventListener("click",deleteCheck);                   // to remove or check mark the to do 


//Function

/* for adding the new to do we use addTodo function */
function addTodo(event){
   
	//Prevent from default actions like form submitting 
	event.preventDefault();
	
	//Creating Div
	const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    
	//Creating li
	const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;

	// local storage saving todo
	saveLocalTodos(todoInput.value);

    newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);

	//Creating button for checking
	const checkButton = document.createElement('button');
	checkButton.innerHTML = '<i class="fas fa-check"></i>';
	checkButton.classList.add("checked-btn");
	todoDiv.appendChild(checkButton);

	//Creating button for deletion
	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
	todoDiv.appendChild(deleteButton);

	//appending the tododiv created to todolist
	todoList.appendChild(todoDiv);

	// clearing the todoInput value 
	todoInput.value = '';

};

/*for removing or checking the todo we are using deleteCheck funtion */

function deleteCheck(event){
     
	const item = event.target;
   
	/* deletion of the toDo*/ 
	if(item.classList[0] == 'delete-btn'){
		const todo = item.parentElement;
		todo.classList.add("fall");
		
		//remove the todo 
		removeLocalTodos(todo);

		//use this function to remove/do the function after the transition is over
		todo.addEventListener("transitionend", function(){
			todo.remove();
		});
	}

	if(item.classList[0] == 'checked-btn'){
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}

};


// local storage

function saveLocalTodos(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
	  todos = [];
	} else {
	  todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
	  todos = [];
	} else {
	  todos = JSON.parse(localStorage.getItem("todos"));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));

}
  
function getTodos() {
	
	let todos;
	if (localStorage.getItem("todos") === null) {
	  todos = [];
	} else {
	  todos = JSON.parse(localStorage.getItem("todos"));
	}
	
	todos.forEach(function(todo) {
	  //Create todo div
	  const todoDiv = document.createElement("div");
	  todoDiv.classList.add("todo");
	  //Create list
	  const newTodo = document.createElement("li");
	  newTodo.innerText = todo;
	  newTodo.classList.add("todo-item");
	  todoDiv.appendChild(newTodo);
	  todoInput.value = "";
	  //Creating button for checking
	  const checkButton = document.createElement('button');
	  checkButton.innerHTML = '<i class="fas fa-check"></i>';
	  checkButton.classList.add("checked-btn");
	  todoDiv.appendChild(checkButton);
	  
	    //Creating button for deletion
	  const deleteButton = document.createElement('button');
	  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.classList.add("delete-btn");
	  todoDiv.appendChild(deleteButton);


	  //attach final Todo
	  todoList.appendChild(todoDiv);
	});

  }


 
