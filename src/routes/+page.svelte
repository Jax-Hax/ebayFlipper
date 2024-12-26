<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
	import Header from './Header.svelte';
	import Auth from './Auth.svelte';
	import BackgroundImage from '$lib/components/BackgroundImage.svelte';

  let { data } = $props();

  // Client API:
  const superform = superForm(data.form);
  let signup = $state(false);
  let login = $state(false);
</script>

<svelte:head>
	<title>eFlipper</title>
	<meta
		name="description"
		content="Make eBay flipping easier!"
	/>
</svelte:head>
<Header current="Home" bind:login bind:signup loggedIn={data.loggedIn} />
<Auth bind:signup bind:login {superform} />
<BackgroundImage alt="hero" src="hero-desktop.webp" heroBackground={true}>
	<p>test</p>
</BackgroundImage>