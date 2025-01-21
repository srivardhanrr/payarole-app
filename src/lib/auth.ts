// src/lib/auth.ts
import { writable } from 'svelte/store';

const getStoredToken = () => {
    // console.log('Getting stored token:', localStorage.getItem('token'));
    return localStorage.getItem('token');
};

export const authToken = writable<string | null>(getStoredToken());

authToken.subscribe((value) => {
    // console.log('Token value changed:', value);
    if (value) {
        localStorage.setItem('token', value);
        // console.log('Token stored:', localStorage.getItem('token'));
    } else {
        localStorage.removeItem('token');
    }
});