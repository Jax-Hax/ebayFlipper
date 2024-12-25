<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
	import Header from './Header.svelte';

  let { data } = $props();

  // Client API:
  const { form } = superForm(data.form);
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
	<label>
		Email
		<input name="email" type="email" bind:value={$form.email} />
	</label>
	<label>
		Password
		<input name="password" type="password" bind:value={$form.password} />
	</label>
	<button>Login</button>
	<button formaction="?/signup">Sign up</button>
</form>