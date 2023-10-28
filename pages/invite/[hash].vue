<script setup lang="ts">
const route = useRoute();
const supabase = getSupabaseClient(null);

const imageUrl = ref<string>();
const hash = String(route.params.hash);

const url = process.env.DEV
	? 'http://localhost:3000'
	: 'https://club-sandwich.lwj.dev';

async function loadImageUrl() {
	const { data } = await supabase
		.from('invitations')
		.select()
		.eq('user_id', atob(hash))
		.maybeSingle();

	imageUrl.value = data.image_url;
}

await loadImageUrl();

useServerSeoMeta({
	title: 'You’re invited you to Club Sandwich.',
	ogImage: () => imageUrl.value,
	twitterCard: 'summary_large_image',
});
</script>

<template>
	<div class="content">
		<Invite :url="url" :imageUrl="imageUrl" />
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
