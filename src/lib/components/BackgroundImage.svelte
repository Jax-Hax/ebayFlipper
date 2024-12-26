<script lang="ts">
	import Image from './Image.svelte';

	export let src: string;
	export let alt: string;
	export let heroBackground: boolean = false;
</script>
<div class="relative h-full w-full">
	<Image
		{src}
		{alt}
		lazyLoaded={!heroBackground}
		classes="max-w-full max-h-full b-0 l-0 m-auto overflow-auto relative z-[-200]"
	/>
	<div class="absolute left-0 top-0">
		<slot />
	</div>
</div>
