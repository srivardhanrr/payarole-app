<script lang="ts">
    import AppSidebar from "$lib/components/app-sidebar.svelte";
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
    import {Separator} from "$lib/components/ui/separator";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import {goto} from "$app/navigation";
    import {authToken} from "$lib/auth";
    import ModeSwitch from "$lib/components/ModeSwitch.svelte";

    function logout() {
        authToken.set(null);
        goto('/auth');
    }

</script>


<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
        <div class="bg-muted/50 aspect-video rounded-xl"></div>
        <div class="bg-muted/50 aspect-video rounded-xl"></div>
        <div class="bg-muted/50 aspect-video rounded-xl"></div>
    </div>
    <div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"></div>
</div>
