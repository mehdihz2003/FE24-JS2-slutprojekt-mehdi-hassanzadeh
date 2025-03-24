import { Task } from "./class";
import { displayAllTasks } from "./display";

const filterByCategory = (tasks: Task[], category: string): Task[] =>
    category !== "all" ? tasks.filter(task => task.category === category) : tasks;

const filterByMember = (tasks: Task[], member: string): Task[] =>
    member !== "all" ? tasks.filter(task => task.assigned === member) : tasks;

const sortTasks = (tasks: Task[], sortBy: string): Task[] => {
    const newTasks = [...tasks];
    switch (sortBy) {
        case "Date (oldest to newest)":
            return newTasks.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        case "Date (newest to oldest)":
            return newTasks.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        case "Alphabetical order (ascending)":
            return newTasks.sort((a, b) => a.title.localeCompare(b.title));
        case "Alphabetical order (descending)":
            return newTasks.sort((a, b) => b.title.localeCompare(a.title));
        default:
            return newTasks;
    }
};

export function sortAndFilter(
    tasks: Task[],
    categoryFilter: string,
    memberFilter: string,
    sortBy: string
): void {
    const filteredTasks = sortTasks(
        filterByMember(
            filterByCategory(tasks, categoryFilter),
            memberFilter
        ),
        sortBy
    );

    displayAllTasks(filteredTasks);
}
