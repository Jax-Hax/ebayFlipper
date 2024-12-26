<script lang="ts">
    export let mobileSrc: string;
    export let desktopSrc: string = mobileSrc;
    export let fallbackSrc: string = desktopSrc
    export let alt: string
    export let width: string = "1920"
    export let height: string = "1280"
    export let scale: boolean = false
    export let lazyLoaded: boolean = true;
    export let className: string = ""
</script>
<picture>
    <!-- Mobile Image -->
    <source media="(max-width: 600px)" srcset="/{mobileSrc}">
    <!-- Desktop Image -->
    <source media="(min-width: 601px)" srcset="/{desktopSrc}">
    <!-- Fallback Image -->
    <img aria-hidden="true"  class={className} loading={lazyLoaded ? "lazy" : "eager"} decoding="async" src="/{fallbackSrc}" {alt} {width} {height} style="{scale ? "" : `min-width: ${width}px`}">
</picture>