<script setup lang="ts">
const route = useRoute();
const hash = String(route.params.hash);

const url = process.env.DEV
	? 'http://localhost:3000'
	: 'https://club-sandwich.lwj.dev';

useServerSeoMeta({
	title: 'Club Sandwich',
});
</script>

<template>
	<div class="content">
		<Invite :url="url" :inviteHash="hash" />
	</div>
</template>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	min-height: calc(100svh - 60px);
	place-content: center;
}
</style>
