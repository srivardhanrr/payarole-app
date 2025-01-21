<script lang="ts">
    import AppSidebar from "$lib/components/app-sidebar.svelte";
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
    import {Separator} from "$lib/components/ui/separator";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import {goto} from "$app/navigation";
    import {authToken} from "$lib/auth";
    import { onMount } from 'svelte';
    import { userData } from '$lib/stores/user';
    import ModeSwitch from "$lib/components/ModeSwitch.svelte";
    let { children } = $props();

    onMount(() => {
        if (!$authToken) {
            goto('/auth');
        }
    })
</script>

<Sidebar.Provider>
    <AppSidebar/>
    <Sidebar.Inset>
        <header class="flex h-16 shrink-0 items-center gap-2">
            <div class="flex items-center gap-2 px-4">
                <Sidebar.Trigger class="-ml-1"/>
                <ModeSwitch />
                <Separator orientation="vertical" class="mr-2 h-4"/>
                <Breadcrumb.Root>
                    <Breadcrumb.List>
                        <Breadcrumb.Item class="hidden md:block">
                            <Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator class="md:block"/>
                        <Breadcrumb.Item>
                            <Breadcrumb.Page>Overview</Breadcrumb.Page>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>
                <!--                <button on:click={logout}>Logout</button>-->
            </div>

        </header>
        {@render children()}
    </Sidebar.Inset>
</Sidebar.Provider>