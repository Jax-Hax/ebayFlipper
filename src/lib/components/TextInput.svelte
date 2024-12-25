<script lang="ts" module>
	type T = Record<string, unknown>;
  </script>
<script lang="ts" generics="T extends Record<string, unknown>">
	import { Label, Input, Helper } from 'flowbite-svelte';
	import { formFieldProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';

	let { superform, field, ...rest }: { superform: SuperForm<T>; field: FormPathLeaves<T> } = $props();

	const { value, errors, constraints } = formFieldProxy(superform, field);
</script>

<div class="mb-6">
	<Label for="success" color="green" class="mb-2 block">Your name</Label>
	<Input id="success" color="green" placeholder="Success input" />
	<Helper class="mt-2" color="green">
		<span class="font-medium">Well done!</span>
		Some success message.
	</Helper>
</div>
<div class="mb-6">
	<Label for="error" color="red" class="mb-2 block">Your name</Label>
	<Input id="error" color="red" placeholder="Error input" />
	<Helper class="mt-2" color="red"
		><span class="font-medium">Not so well done!</span> Some error message.</Helper
	>
</div>

<label>
	{field}<br />
	<input
		name={field}
		type="text"
		aria-invalid={$errors ? 'true' : undefined}
		bind:value={$value}
		{...$constraints}
		{...rest}
	/>
</label>
{#if $errors}<span class="invalid">{$errors}</span>{/if}
