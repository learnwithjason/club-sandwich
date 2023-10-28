<template>
	<main>
		<NuxtPage />
	</main>

	<footer>
		<a href="https://lwj.dev">a LWJ project</a>
		<a href="https://lwj.dev/4d1a">4 Web Devs 1 App</a>
		<a href="https://github.com/learnwithjason/club-sandwich">source</a>
	</footer>
</template>

<style>
:root {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
		Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
	line-height: 1.45;

	/**
	 * @see https://chriscoyier.net/2023/01/22/ok-oklch-%f0%9f%91%91/
	 * @see https://caniuse.com/mdn-css_types_color_oklch
	 */
	--color-white: oklch(0.98 0.01 304);
	--color-black: oklch(0.23 0.13 287);
	--color-dark-accent-1: oklch(0.36 0.08 27);
	--color-dark-accent-2: oklch(0.31 0.15 318);

	--color-fg: var(--color-white);
	--color-bg: var(--color-black);
	--button-gradient: linear-gradient(
		150deg in oklch,
		color-mix(in oklch, var(--color-fg) 30%, var(--color-dark-accent-1)) 25%,
		color-mix(in oklch, var(--color-fg) 30%, var(--color-black)),
		color-mix(in oklch, var(--color-fg) 30%, var(--color-dark-accent-2)) 65%
	);

	background-color: var(--color-bg);
	color: var(--color-fg);

	color-scheme: light dark;

	@media (prefers-color-scheme: light) {
		--color-fg: var(--color-black);
		--color-bg: var(--color-white);
		--button-gradient: linear-gradient(
			150deg in oklch,
			var(--color-dark-accent-1) 25%,
			var(--color-black),
			var(--color-dark-accent-2) 65%
		);
	}
}

* {
	box-sizing: border-box;
}

body {
	margin: 0;
	min-height: 100svh;
}

h1 {
	letter-spacing: -0.01em;
	line-height: 1.1;
}

main {
	display: block;
	margin: 0 auto;
	max-width: 90vw;

	& button {
		background: var(--button-gradient);
		background-position-x: 50%;
		background-size: 200% 100%;
		border: none;
		border-radius: 0.25rem;
		color: var(--color-white);
		display: block;
		font-family: inherit;
		font-size: clamp(1rem, 5cqw, 1.5rem);
		font-weight: bold;
		letter-spacing: -0.01em;
		line-height: 1;
		outline-offset: 3px;
		padding-block: 0.75rem 1rem;
		text-shadow: 0 1px 3px color-mix(in oklch, #0001 30%, var(--color-black));
		transition: background-position 800ms ease-in-out;
		width: 100%;

		&:is(:focus, :hover) {
			background-position: 0%;
		}
	}
}

footer {
	background: color-mix(in oklch, var(--color-fg) 10%, var(--color-bg));
	border-block-start: 1px solid
		color-mix(in oklch, var(--color-fg) 20%, var(--color-bg));
	display: flex;
	font-size: 0.875rem;
	justify-content: space-between;
	height: 60px;
	padding: 0 max(5vw, (100vw - 600px) / 2);
	place-items: center;
	width: 100vw;

	& a {
		color: color-mix(in oklch, var(--color-bg) 40%, var(--color-fg));
	}
}
</style>
