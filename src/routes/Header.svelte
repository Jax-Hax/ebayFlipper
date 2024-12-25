<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte';
	export let current: string;
</script>
<div class="relative px-8 max-md:mb-[4.25rem] mb-20">
<Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
	<NavBrand href="/">
		<img src="/logo-with-background.webp" class="me-3 h-9" alt="Flowbite Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">eFlipper</span
		>
	</NavBrand>
	<div class="flex md:order-2">
		<Button size="sm">Login</Button>
		<Button size="sm">Signup</Button>
		<NavHamburger />
	</div>
	<NavUl class="order-1">
		<NavLi href="/" class="{current === "Home" ? "!text-white" : ""}">Home</NavLi>
		<NavLi href="/about" class="{current === "About" ? "!text-white" : ""}">About</NavLi>
		<NavLi href="/contact" class="{current === "Contact" ? "!text-white" : ""}">Contact</NavLi>
	</NavUl>
</Navbar>
</div>