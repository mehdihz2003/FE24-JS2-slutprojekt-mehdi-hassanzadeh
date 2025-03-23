export class Task {
    id?: string
    title: string;
    description: string;
    category: string;
    status: string;
    assigned: string;
    timestamp: string;
    isCompleted: boolean;

    constructor(data: {
        id?: string
        title: string;
        description: string;
        category: string;
        status: string;
        assigned: string;
        timestamp: string;
        isCompleted: boolean;

    }) {
        this.title = data.title;
        this.description = data.description;
        this.category = data.category;
        this.status = data.status;
        this.assigned = data.assigned;
        this.timestamp = data.timestamp;
        this.isCompleted = data.isCompleted;
    }
}

export class Member {
    name: string;
    role: string;

    constructor(name: string, role: string) {
        this.name = name;
        this.role = role;
    }

    updateRole(newRole: string) {
        this.role = newRole;
    }
}