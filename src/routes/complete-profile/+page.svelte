<script lang="ts">
    import {goto} from '$app/navigation';
    import {authToken} from '$lib/auth';
    import {Button} from "$lib/components/ui/button";
    import {Input} from "$lib/components/ui/input";
    import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "$lib/components/ui/card";
    import {Label} from "$lib/components/ui/label";
    import ModeSwitch from "$lib/components/ModeSwitch.svelte";

    let fullName = '';
    let email = '';
    let loading = false;

    async function handleSubmit(e: Event) {
        e.preventDefault();
        loading = true;
        try {
            const res = await fetch('http://127.0.0.1:8000/api/auth/complete-profile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${$authToken}`
                },
                body: JSON.stringify({
                    full_name: fullName,
                    email
                })
            });
            if (res.ok) {
                goto('/dashboard');
            } else {
                const error = await res.json();
                alert(error.message || 'Failed to update profile');
            }
        } catch (error) {
            alert('Failed to update profile');
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-background p-4">
    <div class="max-w-md w-full">
        <!-- Logo Section -->
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold mb-2">
                Payarole
            </h1>
            <p class="text-muted-foreground">Your Payroll Management Solution</p>
        </div>

        <Card>
            <CardHeader class="space-y-3">
                <CardTitle class="text-2xl text-center">Complete Profile</CardTitle>
                <CardDescription class="text-center text-base">
                    Complete your profile to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form on:submit={handleSubmit} class="space-y-6">
                    <div class="space-y-2">
                        <Input
                                type="text"
                                bind:value={fullName}
                                placeholder="Full Name"
                                required
                                disabled={loading}
                                class="h-12"
                        />
                        <Input
                                type="email"
                                bind:value={email}
                                placeholder="Email"
                                disabled={loading}
                                class="h-12"
                        />
                    </div>
                    <Button
                            type="submit"
                            disabled={loading || !fullName}
                            class="w-full h-10"
                    >
                        {loading ? 'Saving...' : 'Complete Profile'}
                    </Button>

                    <div class="text-center text-sm text-muted-foreground">
                        By continuing, you agree to our
                        <a href="/terms" class="underline underline-offset-4 hover:no-underline">Terms of Service</a>
                        and
                        <a href="/privacy" class="underline underline-offset-4 hover:no-underline">Privacy Policy</a>
                    </div>
                    <ModeSwitch/>
                </form>
            </CardContent>
        </Card>

        <!-- Support Section -->
        <div class="text-center mt-8 text-sm text-muted-foreground">
            Need help? <a href="/support" class="underline underline-offset-4 hover:no-underline">Contact Support</a>
        </div>
    </div>
</div>