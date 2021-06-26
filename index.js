// Parent element to store cards
const taskContainer = document.querySelector(".task__container");
// Global Store
let globalStore = [];

const newCard = ({
  id,
  imageUrl,
  taskTitle,
  taskDescription,
  taskType,
}) => `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success">
      <i class="fas fa-pencil-alt"></i>
    </button>
    <button type="button" id=${id} class="btn btn-outline-danger" onclick="deleteCard.apply(this, arguments)">
      <i class="fas fa-trash-alt" id=${id} onclick="deleteCard.apply(this, arguments)"></i>
    </button>
  </div>
  <img
    src=${imageUrl}
    class="card-img-top"
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">
      ${taskDescription}
    </p>
    <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted">
    <button type="button" class="btn btn-outline-primary float-end">
      Open Task
    </button>
  </div>
</div>
</div>`;

//Refresh Feature//
const loadInitialTaskCards = () => {
  // access localStorage
  const getInitialData = localStorage.getItem("tasky");
  if(!getInitialData) return;

  //convert stringified-object to object
  const { cards } = JSON.parse(getInitialData);

  //map around the array to generate HTML card and inject it to DOM
  cards.map((cardObject) => {
    const createNewCard = newCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(cardObject);
  });
};

const updateLocalStorage = () =>  {
  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore}));
};

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, // unique number for card id
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
  };
  
  //HTML Code
  const createNewCard = newCard(taskData);

  taskContainer.insertAdjacentHTML("beforeend", createNewCard);
  globalStore.push(taskData);
  
  // Add to lacal storage
  updateLocalStorage(); 
};

//Delete Feature//
const deleteCard = (event) => {
  //id
  event = window.event;
  const targetId = event.target.id; 
  const tagname = event.target.tagName;

  //search the global store, remove the object which matches with the id
  globalStore = globalStore.filter((cardObject)=> cardObject.id !== targetId);
  updateLocalStorage();
  //access the DOM to remove them
  if(tagname === "BUTTON") {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  }
  return taskContainer.removeChild(
    event.target.parentNode.parentNode.parentNode.parentNode
  );
  
};
