<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
	import Header from './Header.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

  let { data } = $props();

  // Client API:
  const superform = superForm(data.form);
</script>

<svelte:head>
	<title>eFlipper</title>
	<meta
		name="description"
		content="Make eBay flipping easier!"
	/>
</svelte:head>
<Header current="Home"/>
<form method="POST" action="?/login">
	<TextInput superform={superform} field="email" />
	<TextInput superform={superform} field="password" />
	<!--<label>
		Email
		<input name="email" type="email" bind:value={$form.email} />
	</label>
	<label>
		Password
		<input name="password" type="password" bind:value={$form.password} />
	</label>-->
	<button>Login</button>
	<button formaction="?/signup">Sign up</button>
</form>