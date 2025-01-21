<script lang="ts">
    import { authToken } from '$lib/auth';
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Label } from "$lib/components/ui/label";
    import * as InputOTP from "$lib/components/ui/input-otp/index";
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
    import {goto} from "$app/navigation";
    import ModeSwitch from "$lib/components/ModeSwitch.svelte";

    import {onMount} from "svelte";

    let phone = '';
    let otp = '';
    let showOTPInput = false;
    let loading = false;

    onMount(() => {
        if ($authToken) {
            goto('/dashboard');
        }
    });

    async function requestOTP() {
        loading = true;
        try {
            const res = await fetch('http://127.0.0.1:8000/api/auth/request-otp/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: phone })
            });
            if (res.ok) {
                showOTPInput = true;
            } else {
                const error = await res.json();
                alert(error.message || 'Failed to send OTP');
            }
        } catch (error) {
            alert('Failed to send OTP');
        } finally {
            loading = false;
        }
    }

    async function verifyOTP() {
        loading = true;
        try {
            const res = await fetch('http://127.0.0.1:8000/api/auth/verify-otp/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: phone, otp })
            });

            const data = await res.json();

            if (res.ok) {
                authToken.set(data.token); // Store token before navigation
                console.log(data.token);
                await goto(data.is_profile_complete ? '/dashboard' : '/complete-profile');
            } else {
                alert(data.error || 'Invalid OTP');
            }
        } catch (error) {
            alert('Failed to verify OTP');
        } finally {
            loading = false;
        }
    }

    function handleSubmit(e: Event) {
        e.preventDefault();
        if (!showOTPInput) {
            requestOTP();
        } else {
            verifyOTP();
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
            <p class="text-muted-foreground">Your Home Workers Management Solution</p>
        </div>

        <Card>
            <CardHeader class="space-y-3">
                <CardTitle class="text-2xl text-center">Welcome back</CardTitle>
                <CardDescription class="text-center text-base">
                    Login with your mobile number
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form on:submit={handleSubmit} class="space-y-6">

                    {#if !showOTPInput}
                        <div class="space-y-2">
                            <Label for="mobile" class="text-sm">Mobile Number</Label>
                            <Input
                                    type="tel"
                                    id="mobile"
                                    placeholder="Enter your mobile number"
                                    disabled="{loading}"
                                    bind:value={phone}
                                    class="h-12"
                            />
                            <p class="text-xs text-muted-foreground">
                                We'll send you a verification code
                            </p>
                        </div>
                        <Button type="submit" class="w-full h-12">
                            Continue
                        </Button>
                    {:else}
                        <div class="space-y-4">
                            <div class="flex justify-center">
                                <InputOTP.Root maxlength={6} bind:value={otp}>
                                    {#snippet children({ cells })}
                                        <InputOTP.Group>
                                            {#each cells.slice(0, 3) as cell}
                                                <InputOTP.Slot {cell} />
                                            {/each}
                                        </InputOTP.Group>
                                        <InputOTP.Separator />
                                        <InputOTP.Group>
                                            {#each cells.slice(3, 6) as cell}
                                                <InputOTP.Slot {cell} />
                                            {/each}
                                        </InputOTP.Group>
                                    {/snippet}
                                </InputOTP.Root>
                            </div>

                            <Button
                                    type="submit"
                                    disabled={loading || !otp}
                                    class="w-full"
                            >
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </Button>

                            <div class="flex justify-center text-sm text-muted-foreground">
                                <button
                                        type="button"
                                        class="underline underline-offset-4 hover:no-underline"
                                        on:click={requestOTP}
                                >
                                    Didn't receive the code? Resend
                                </button>
                            </div>
                        </div>
                    {/if}

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