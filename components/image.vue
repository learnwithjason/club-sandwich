<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
	src?: string;
	alt: string;
	handleLoad?: () => void;
	loaded?: boolean;
}>();

const isLoaded = computed(() => {
	if (typeof props.handleLoad === 'function') {
		return props.loaded;
	} else {
		return true;
	}
});
</script>

<template>
	<div class="image-container">
		<img
			v-if="src"
			:src="src"
			@load="handleLoad"
			:alt="alt"
			:class="isLoaded && 'loaded'"
		/>
	</div>
</template>

<style scoped>
@keyframes loading {
	100% {
		background-position-x: -150%;
	}
}

.image-container {
	animation: loading 1000ms linear infinite;
	aspect-ratio: 16 / 9;
	background: linear-gradient(
		80deg in oklch,
		var(--color-dark-accent-1),
		var(--color-dark-accent-1) 3%,
		var(--color-dark-accent-2),
		var(--color-dark-accent-1) 97%,
		var(--color-dark-accent-1)
	);
	background-size: 300% 100%;
	container: image / inline-size;
	display: block;
	margin-block: 1.5rem;

	& img {
		aspect-ratio: 16 / 9;
		display: block;
		height: auto;
		opacity: 0;
		transition: opacity 150ms ease-out;
		width: 100%;

		&.loaded {
			opacity: 1;
		}
	}
}
</style>
