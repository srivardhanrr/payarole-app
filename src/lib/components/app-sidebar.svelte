<script lang="ts" module>
	import BookOpen from "lucide-svelte/icons/book-open";
	import Bot from "lucide-svelte/icons/bot";
	import ChartPie from "lucide-svelte/icons/chart-pie";
	import Frame from "lucide-svelte/icons/frame";
	import LifeBuoy from "lucide-svelte/icons/life-buoy";
	import Map from "lucide-svelte/icons/map";
	import Send from "lucide-svelte/icons/send";
	import Settings2 from "lucide-svelte/icons/settings-2";
	import SquareTerminal from "lucide-svelte/icons/square-terminal";

	const data = {
		user: {
			name: "User",
			email: "user@gmail.com",
			avatar: "/avatars/shadcn.jpg",
		},
		navMain: [
			{
				title: "Dashboard",
				url: "#",
				icon: SquareTerminal,
				isActive: true,
				items: [
					{
						title: "Overview",
						url: "#",
					},
					{
						title: "Activity",
						url: "#",
					},
					{
						title: "Settings",
						url: "#",
					},
				],
			},
			{
				title: "Staff Management",
				url: "#",
				icon: Bot,
				items: [
					{
						title: "Employees",
						url: "#",
					},
					{
						title: "Attendance",
						url: "#",
					},
					{
						title: "Schedule",
						url: "#",
					},
				],
			},
			{
				title: "Payments",
				url: "#",
				icon: BookOpen,
				items: [
					{
						title: "Salary",
						url: "#",
					},
					{
						title: "Loans",
						url: "#",
					},
				],
			},
			{
				title: "Other",
				url: "#",
				icon: Settings2,
				items: [
					{
						title: "Documents",
						url: "#",
					},
					{
						title: "Tasks",
						url: "#",
					},
					{
						title: "Notifications",
						url: "#",
					},
				],
			},
		],
		navSecondary: [
			{
				title: "Support",
				url: "#",
				icon: LifeBuoy,
			},
			{
				title: "Feedback",
				url: "#",
				icon: Send,
			},
		],
		projects: [
			{
				name: "Design Engineering",
				url: "#",
				icon: Frame,
			},
			{
				name: "Sales & Marketing",
				url: "#",
				icon: ChartPie,
			},
			{
				name: "Travel",
				url: "#",
				icon: Map,
			},
		],
	};
</script>

<script lang="ts">
	import NavMain from "$lib/components/nav-main.svelte";
	import NavProjects from "$lib/components/nav-projects.svelte";
	import NavSecondary from "$lib/components/nav-secondary.svelte";
	import NavUser from "$lib/components/nav-user.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import Command from "lucide-svelte/icons/command";
	import {type ComponentProps, onMount} from "svelte";
	import {authToken} from "$lib/auth";
	import {goto} from "$app/navigation";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<div
								class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
							>
								<Command class="size-4" />
							</div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-semibold">Pay A Role</span>
								<span class="truncate text-xs">Management Platform</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
<!--		<NavProjects projects={data.projects} />-->
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>
