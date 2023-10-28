<script setup lang="ts">
import { SignInButton, UserButton, useUser } from 'vue-clerk';

const { isLoaded, isSignedIn, user } = useUser();

const url =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000'
		: 'https://club-sandwich.lwj.dev';

// not sure why this wasn’t already happening, but clear the Clerk hash
onMounted(() => {
	if (isSignedIn) {
		window.location.hash = '';
	}
});

useServerSeoMeta({
	title: 'Club Sandwich',
	description: 'A place where everyone — and everything — can be a sandwich.',
});
</script>

<template>
	<div v-if="isLoaded && isSignedIn">
		<header>
			<p>Welcome to Club Sandwich, {{ user?.firstName }}.</p>
			<UserButton
				:after-sign-out-url="url"
				:appearance="{
					elements: { avatarBox: { border: '1px solid #22014b' } },
				}"
			/>
		</header>

		<Dashboard :url="url" />
	</div>

	<div v-else-if="isLoaded && !isSignedIn" class="content">
		<h1>Stop gatekeeping sandwiches. <em>Join the club.</em></h1>
		<SignInButton><span>Come on in &rarr;</span></SignInButton>
	</div>
</template>

<style scoped>
header {
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin: 0 auto 3rem;
	padding-block: 1rem;
	width: min(90vw, 600px);

	& p {
		font-size: 1.25rem;
		font-weight: bold;
		margin: 0;
	}
}

.content {
	display: flex;
	flex-direction: column;
	margin-inline: auto;
	min-height: calc(100svh - 60px);
	place-content: center;
	width: min(90vw, 600px);
}

h1 {
	font-size: clamp(1.25rem, 6vw, 2.55rem);
	line-height: 1;
	margin: 0;
	text-align: center;

	& em {
		font-size: clamp(2.925rem, 14.5vw, 6.125rem);
		font-style: normal;
	}
}

button {
	font-size: clamp(1.5rem, 12vw, 4rem);
	margin-block-start: 1.5rem;
}
</style>
