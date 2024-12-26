<script lang="ts">
	export let mobileSrc: string;
	export let desktopSrc: string = mobileSrc;
	export let fallbackSrc: string = desktopSrc;
	export let alt: string;
	export let width: string = '1920';
	export let height: string = '1280';
	export let heroBackground: boolean = false;
</script>

<section class="relative z-[1] w-full" style="height: {height}px">
	<div>
		<slot />
	</div>
	<!-- Background Image -->
	<picture class="absolute top-0 left-0 w-full h-full -z-[2]">
		<!-- Mobile Image -->
		<source media="(max-width: 600px)" srcset="/{mobileSrc}" />
		<!-- Desktop Image -->
		<source media="(min-width: 601px)" srcset="/{desktopSrc}" />
		<!-- Fallback Image -->
		<img
			aria-hidden="true"
			loading={!heroBackground ? "lazy" : "eager"}
			decoding="async"
			src="/{fallbackSrc}"
			{alt}
			{width}
			{height}
			class="absolute top-0 left-0 w-full h-full object-cover"
		/>
	</picture>
</section>