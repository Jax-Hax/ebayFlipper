<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { onMount } from 'svelte';
	import { PUBLIC_VAPID_KEY } from '$env/static/public';
	let { data } = $props();
	const { form, enhance } = superForm(data.form);
	let formHTML: HTMLFormElement;
	let sub: PushSubscription | null;
	let pwaInstalled = false;
	let notificationsShown = $state(false);
	onMount(async () => {
		if ('serviceWorker' in navigator) {
			const reg = await navigator.serviceWorker.ready;
			pwaInstalled = true;
			sub = await reg.pushManager.getSubscription();
			if (!sub) {
				sub = await reg.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: PUBLIC_VAPID_KEY
				});
				$form.VAPIDJson = JSON.stringify(sub);
				notificationsShown = true;
			} else {
				$form.VAPIDJson = JSON.stringify(sub);
				/*if (!data.user_data.notification_subscription_vapid.includes($form.VAPIDJson)) {
					notificationsShown = true;
				}*/
			}
		}
	});
</script>

<form method="POST" action="?/subscribeToPushNotifications" use:enhance bind:this={formHTML}>
	<input type="hidden" name="VAPIDJson" bind:value={$form.VAPIDJson} />
</form>
{#if notificationsShown}
	<h1 class="text-center text-3xl font-bold pt-3">Enable notifications on this device</h1>
	<div class="flex flex-col items-center">
		<p class="text-center mt-2">
			Would you like to recieve notifications on this device?
		</p>
		<button
			class="btn btn-primary rounded-2xl w-1/3 min-h-0 h-10"
			onclick={() => {
				formHTML.submit();
			}}>Enable</button
		>
	</div>
{/if}

<!--
<Popup bind:isOpen={invitePopup} firstLoadedPopup={true}>
	{#if !pwaInstalled}
		<h1 class="text-center text-2xl font-bold pt-3">Install as PWA</h1>
		<div class="flex flex-col items-center">
			<p class="text-center mt-2">
				You are missing out on notifications! Follow the guide below to install the app as a
				Progressive Web App and get notified for things like new grades and assignments!
			</p>
			<a
				class="btn btn-primary rounded-2xl w-1/2 min-h-0 h-16"
				target="_blank"
				href="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DiOS&oco=1"
				>How to install a PWA</a
			>
		</div>
	{/if}
</Popup>
-->