// src/lib/stores/user.ts
import { writable } from 'svelte/store';

export interface UserData {
    full_name: string;
    phone_number: string;
    email: string | null;
}

export const userData = writable<UserData | null>(null);