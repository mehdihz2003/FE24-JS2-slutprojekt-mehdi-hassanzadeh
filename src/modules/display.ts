import { deleteTask, getAllTasks, assignTask, changeTaskStatus } from "./task-firebase.ts";
import { getAllMembers } from "./member-firebase.ts";
import { Task } from "./class.ts";

const assignBtn = document.querySelector('#assign-task-to-member-final') as HTMLButtonElement;
const taskSelect = document.querySelector("#assign-task-to-member-task") as HTMLSelectElement;
const memberSelect = document.querySelector("#assign-task-to-member-member") as HTMLSelectElement;
const filterMemberSelect = document.querySelector('#member-filter') as HTMLSelectElement;

export function displayAllTasks(taskArray: Task[]): void {
    const newTasksContainer = document.querySelector("#new-tasks") as HTMLDivElement;
    const inProgressContainer = document.querySelector("#in-progress-tasks") as HTMLDivElement;
    const completedTasksContainer = document.querySelector("#completed-tasks") as HTMLDivElement;

    newTasksContainer.innerHTML = '';
    inProgressContainer.innerHTML = '';
    completedTasksContainer.innerHTML = '';
    taskSelect.innerHTML = '';

    for (const task of taskArray) {
        const taskID = task.id || "unknown-id";

        const container = document.createElement('div');
        container.id = taskID;
        container.classList.add('task-card');

        container.append(
            createElement('h3', task.title),
            createElement('h4', `Description: ${task.description}`),
            createElement('p', `Category: ${task.category}`),
            createElement('p', `Assigned: ${task.assigned}`),
            createElement('p', `Timestamp: ${task.timestamp}`),
        );
        

        if (task.status === "in progress") {
            inProgressContainer.append(container);
            container.append(createCheckbox(taskID));
        } else if (task.status === "completed") {
            completedTasksContainer.append(container);
            container.append(createDeleteButton(taskID));
        } else {
            newTasksContainer.append(container);
            addTaskToSelect(task);
        }
    }
}

function createElement(tag: string, text: string): HTMLElement {
    const element = document.createElement(tag);
    element.innerText = text;
    return element;
}

function createCheckbox(taskID: string): HTMLElement {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.style.display = "flex";
    checkboxContainer.style.alignItems = "center";
    checkboxContainer.style.gap = "5px";

    const completedLabel = createElement('label', "Completed:");
    const completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';

    completedCheckbox.addEventListener('change', async () => {
        if (completedCheckbox.checked) {
            await changeTaskStatus(taskID, "completed");
            displayAllTasks(await getAllTasks());
        }
    });

    checkboxContainer.append(completedLabel, completedCheckbox);
    return checkboxContainer;
}

function createDeleteButton(taskID: string): HTMLElement {
    const deleteContainer = document.createElement('div');
    deleteContainer.style.display = "flex";
    deleteContainer.style.alignItems = "center";
    deleteContainer.style.gap = "5px";

    const deleteLabel = createElement('label', "Delete:");
    const delBtn = createElement('button', 'X') as HTMLButtonElement;

    delBtn.addEventListener('click', async () => {
        await deleteTask(taskID);
        displayAllTasks(await getAllTasks());
    });

    deleteContainer.append(deleteLabel, delBtn);
    return deleteContainer;
}

function addTaskToSelect(task: Task): void {
    const taskOption = document.createElement('option');
    taskOption.value = task.id as string;
    taskOption.innerText = task.title;
    taskSelect.append(taskOption);
}

export function displayAllMembers(memberObj: Object) {
    const containerAllMembers = document.querySelector("#membersContainer") as HTMLDivElement;
    containerAllMembers.innerHTML = '';
    memberSelect.innerHTML = '';
 
    filterMemberSelect.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.value = "all";
    allOption.innerText = "All";
    filterMemberSelect.appendChild(allOption);

    for (const firebaseID in memberObj) {
        const member = memberObj[firebaseID];
        const container = document.createElement('div');
        container.id = firebaseID;

        container.append(createElement('h3', member.name));
        container.append(createElement('p', `Role: ${member.role}`));
        containerAllMembers.append(container);

        addMemberToSelect(firebaseID, member.name);
        addMemberToFilter(firebaseID, member.name);
    }
}

function addMemberToSelect(id: string, name: string): void {
    const option = document.createElement('option');
    option.value = id;
    option.innerText = name;
    memberSelect.append(option);
    memberSelect.value = id;
}

function addMemberToFilter(id: string, name: string): void {
    const option = document.createElement('option');
    option.value = name;
    option.innerText = name;
    filterMemberSelect.append(option);
}

assignBtn.addEventListener('click', async event => {
    event.preventDefault();

    const selectedTaskID = taskSelect.value;
    const selectedMemberID = memberSelect.value;

    if (!selectedTaskID || !selectedMemberID) {
        console.log("Please select both a task and a member.");
        return;
    }

    const members = await getAllMembers();
    const tasks = await getAllTasks();
    const selectedMember = members[selectedMemberID];
    const selectedTask = tasks.find(task => task.id === selectedTaskID);

    if (!selectedTask) {
        console.log("Error: Selected task not found!");
        return;
    }

    if (selectedMember.role === selectedTask.category) {
        await assignTask(selectedTaskID, selectedMember.name);
        await changeTaskStatus(selectedTaskID, "in progress");
        displayAllTasks(await getAllTasks());
    } else {
        window.alert("Role of member does not match department of task");
    }
});
