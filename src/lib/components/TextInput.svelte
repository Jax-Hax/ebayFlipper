<script lang="ts" module>
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { Label, Input, Helper } from 'flowbite-svelte';
	import { formFieldProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';
	let { superform, label, name, type = "text", ...rest }: { superform: SuperForm<T>; label: string; type: "number" | "search" | "image" | "text" | "time" | "color" | "hidden" | "date" | "datetime-local" | "email" | "file" | "month" | "password" | "reset" | "submit" | "tel" | "url" | "week" | undefined; name: FormPathLeaves<T>; [x: string]: unknown } =
		$props();

	const { value, errors, constraints } = formFieldProxy(superform, name);
</script>

<div class="mb-6">
	<Label for="error" color={$errors ? 'red' : undefined} class="mb-2 block">{label}</Label>
	<Input
		id="error"
		color={$errors ? 'red' : undefined}
		name={name}
		type={type}
		bind:value={$value}
		{...$constraints}
		{...rest}
	/>
	{#if $errors}
		<Helper class="mt-2" color="red">
			{$errors}
		</Helper>
	{/if}
</div>
