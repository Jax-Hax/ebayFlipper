<script lang="ts">
    export let src: string;
    export let alt: string;
    export let lazyLoaded: boolean = true;
    export let classes: string = '';
</script>
<img
	class={classes}
	loading={lazyLoaded ? 'lazy' : 'eager'}
	src="/{src}"
	{alt}
/>
