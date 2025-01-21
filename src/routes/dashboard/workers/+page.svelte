<script lang="ts">
    import {onMount} from 'svelte';
    import {authToken} from '$lib/auth';
    import {goto} from '$app/navigation';
    import {Button} from "$lib/components/ui/button";

    let userData: any = null;

    onMount(async () => {
        const token = $authToken;
        if (!token) {
            goto('/auth');
            return;
        }

        try {
            console.log(token);
            const res = await fetch('http://localhost:8000/api/auth/profile/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (res.status === 401) {
                authToken.set(null);
                goto('/auth');
                return;
            }

            if (!res.ok) throw new Error('Failed to fetch profile');

            userData = await res.json();
        } catch (error) {
            console.error(error);
        }
    });

    function logout() {
        authToken.set(null);
        goto('/auth');
    }
</script>
<div class="container mx-auto p-6">
    {#if userData}
        <div class="max-w-md mx-auto  rounded-lg shadow p-6">
            <h1 class="text-2xl font-bold mb-4">Welcome, {userData.full_name}</h1>
            <button on:click={logout}>Logout</button>
            <div class="space-y-2">
                <p><span class="font-medium">Phone:</span> {userData.phone_number}</p>
                <p><span class="font-medium">Email:</span> {userData.email || 'Not provided'}</p>
            </div>
        </div>
    {:else}
        <div class="flex justify-center items-center h-[calc(100vh-4rem)]">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
    {/if}
</div>