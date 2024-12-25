<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import { Button, Modal } from 'flowbite-svelte';
	let { signup = $bindable(), login = $bindable(), superform } = $props();
</script>
<Modal bind:open={login} size="xs" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" method="POST" action="?/login">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
        </h3>
        <TextInput {superform} label="Email" name="email" type="email" />
        <TextInput {superform} label="Password" name="password" type="password" />
        <Button type="submit" class="w-full1">Log in to your account</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <button onclick={() => {signup = true; login = false}} class="text-primary-700 hover:underline dark:text-primary-500">
                Create account
            </button>
        </div>
    </form>
</Modal>
<Modal bind:open={signup} size="xs" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" method="POST" action="?/signup">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Create an account
        </h3>
        <TextInput {superform} label="Email" name="email" type="email" />
        <TextInput {superform} label="Password" name="password" type="password"  />
        <Button type="submit" class="w-full1">Sign up for an account</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered? <button onclick={() => {signup = false; login = true}} class="text-primary-700 hover:underline dark:text-primary-500">
                Sign in
            </button>
        </div>
    </form>
</Modal>