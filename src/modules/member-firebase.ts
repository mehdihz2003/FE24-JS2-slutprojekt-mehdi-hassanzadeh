import { Member } from "./class";

const URL = 'https://scrum-board-slutproject-js2-default-rtdb.europe-west1.firebasedatabase.app/members';

export async function getAllMembers(): Promise<Member[]> {
    const result = await fetch(`${URL}.json`);
    const member: Record<string, { name: string, role: string }> = await result.json();

    if (!member) {
        return [];
    }

    return Object.entries(member).map(([id, obj]) => {
        return new Member(obj.name, obj.role);
    });
}

export async function postMembers(member: Member): Promise<void> {
    await fetch(`${URL}.json`, {
        method: 'POST',
        body: JSON.stringify({ name: member.name, role: member.role }),
        headers: { 'Content-type': 'application/json' }
    });
}
