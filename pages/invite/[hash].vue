<script setup lang="ts">
const route = useRoute();

const url = process.env.DEV
	? 'http://localhost:3000'
	: 'https://club-sandwich.lwj.dev';

useSeoMeta({
	title: 'Club Sandwich',
});
</script>

<template>
	<div class="content">
		<Invite :url="url" :inviteHash="route.params.hash" />
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
