import { getAllTasks, postTask } from "./task-firebase.ts";
import { getAllMembers, postMembers } from "./member-firebase.ts";
import { displayAllTasks, displayAllMembers } from "./display.ts";
import { Member, Task } from "./class.ts";
import { sortAndFilter } from "./sort-filter.ts";

getAllTasks().then(displayAllTasks);
getAllMembers().then(displayAllMembers);

const taskForm = document.querySelector('#task-form') as HTMLFormElement;
const memberForm = document.querySelector('#member-form') as HTMLFormElement;
const filterForm = document.querySelector('#filter-form') as HTMLFormElement;

const taskCategorySelect = document.querySelector('#task-category-select') as HTMLSelectElement;
const memberSelect = document.querySelector('#member-select') as HTMLSelectElement;
const taskDescription = document.querySelector('#task-description') as HTMLInputElement;
const taskTitle = document.querySelector('#task-title') as HTMLInputElement;

taskForm.addEventListener('submit', async event => {
  event.preventDefault();

  const taskObj: Task = {
    title: taskTitle.value,
    isCompleted: false,
    category: taskCategorySelect.value,
    timestamp: new Date().toString(),
    status: 'new',
    assigned: 'none',
    description: taskDescription.value,
  };

  await postTask(taskObj);
  displayAllTasks(await getAllTasks());
});

memberForm.addEventListener('submit', async event => {
  event.preventDefault();

  const memberObj = new Member(
    memberForm.querySelector('input')!.value,
    memberSelect.value
  );

  await postMembers(memberObj);
  displayAllMembers(await getAllMembers());
});

filterForm.addEventListener('submit', async event => {
  event.preventDefault();

  const categoryFilter = (document.querySelector('#category-filter') as HTMLSelectElement).value;
  const memberFilter = (document.querySelector('#member-filter') as HTMLSelectElement).value;
  const sortBy = (document.querySelector('#sort-tasks') as HTMLSelectElement).value;

  sortAndFilter(await getAllTasks(), categoryFilter, memberFilter, sortBy);
});