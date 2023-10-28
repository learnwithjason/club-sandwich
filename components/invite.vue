<script setup lang="ts">
import { SignUpButton } from 'vue-clerk';

const props = defineProps<{ url: string; inviteHash: string }>();

const imageUrl = atob(props.inviteHash);
</script>

<template>
	<div class="content">
		<h1>You’re invited.</h1>
		<Image :src="imageUrl" alt="Your invite to Club Sandwich" />
		<SignUpButton :after-sign-in-url="url"
			><span>Accept your invitation</span></SignUpButton
		>
		<aside class="note">
			<p>
				<strong>NOTE:</strong> This is app is a demo. None of your personal
				information will be shared or used outside of generating a personalized
				invite like the one above.
			</p>
		</aside>
	</div>
</template>

<style scoped>
.content {
	margin-inline: auto;
	width: min(90vw, 600px);
}
h1 {
	font-size: clamp(2rem, 14.25vw, 6rem);
	line-height: 1;
	margin: 0;
	text-align: center;
}

.note {
	font-style: italic;
	margin-block-start: 0.5rem;
}
</style>
../utils/supabase
