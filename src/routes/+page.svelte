<script lang="ts">
  import { superForm } from 'sveltekit-superforms';

  let { data } = $props();

  // Client API:
  const { form } = superForm(data.form);
</script>

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
