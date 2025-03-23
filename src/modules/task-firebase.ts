import { Task } from "./class.ts";

const URL = 'https://scrum-board-slutproject-js2-default-rtdb.europe-west1.firebasedatabase.app/assignments';

export async function getAllTasks(): Promise<Task[]> {
    const result = await fetch(`${URL}.json`);
    const task = await result.json();

    if (!task) {
        return [];
    }

    return Object.entries(task).map(([firebaseID, obj]) => ({
        ...(obj as Task),
        id: firebaseID || "UNKNOWN_ID"
    }));
}

export async function postTask(task: Task): Promise<void> {
    await fetch(`${URL}.json`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-type': 'application/json' }
    });
}

export async function patchCompleted(id: string, isCompleted: boolean): Promise<void> {
    await fetch(`${URL}/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ isCompleted }),
        headers: { 'Content-type': 'application/json' }
    });
}

export async function deleteTask(id: string): Promise<void> {
    await fetch(`${URL}/${id}.json`, { method: 'DELETE' });
}

export async function assignTask(id: string, assigned: string): Promise<void> {
    await fetch(`${URL}/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ assigned }),
        headers: { 'Content-type': 'application/json' }
    });
}

export async function changeTaskStatus(id: string, status: string): Promise<void> {
    await fetch(`${URL}/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
        headers: { 'Content-type': 'application/json' }
    });
}
