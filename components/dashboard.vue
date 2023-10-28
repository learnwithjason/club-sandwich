<script setup lang="ts">
import { useClerk, useUser, useAuth } from 'vue-clerk';

const props = defineProps<{ url: string }>();

const { getToken } = useAuth();
const { openUserProfile } = useClerk();
const { user } = useUser();

const sandwiches = ['Hotdog', 'Taco', 'Musubi', 'Onigiri', 'Dosa'];

const loaded = ref(false);
const copied = ref(false);

/**
 * Compute the user’s favorite sandwich based on their Clerk metadata. Defaults
 * to the first item in the sandwiches array.
 *
 * @see https://vuejs.org/guide/essentials/computed.html
 */
const favoriteSandwich = computed(() => {
	return (user.value?.unsafeMetadata.sandwich as string) ?? sandwiches.at(0);
});

/**
 * Create a hash of the invite image URL for sharing
 */
const inviteHash = computed(() => {
	return btoa(user.value?.id ?? '');
});

const inviteUrl = computed(() => {
	return `${props.url}/invite/${inviteHash.value}`;
});

/**
 * We need an actual image. Cloudinary lets us assemble all the pieces into a
 * single image we can use for social sharing meta tags.
 *
 * @see https://cloudinary.com/documentation/transformation_reference
 */
const imgSrc = computed(() => {
	const avatarUrl = user.value!.imageUrl!;
	const encodedImageUrl = window.btoa(avatarUrl);
	const avatar = `u_fetch:${encodedImageUrl}/c_thumb,w_500,ar_1,g_face/fl_layer_apply,g_north_west,x_-46,y_175`;

	const headline = `Join ${user.value?.firstName} at Club Sandwich!`;
	const inviteText =
		'Join him! Knock to the tune of Darude Sandstorm then give the password:';
	const password = favoriteSandwich.value.toUpperCase();
	const food = `l_4d1a:club-sandwich:${favoriteSandwich.value.toLowerCase()}/e_overlay,fl_layer_apply,g_east`;

	return `https://res.cloudinary.com/jlengstorf/image/upload/${avatar}/${food}/w_1600,h_900,c_crop,g_east/bo_8px_solid_black,co_white,w_1500,l_text:Verdana_75_stroke_bold_center:${headline}/fl_layer_apply,c_fit,g_south_west,x_50,y_740/co_rgb:333333,w_560,c_fit,l_text:Verdana_40_italic_center:${inviteText}/fl_layer_apply,g_south_west,x_510,y_470/co_rgb:000000,w_560,l_text:Verdana_200_bold_center:${password}/fl_layer_apply,g_north_west,x_510,y_460/w_1200,f_auto,q_auto/v1698360748/4d1a/club-sandwich/invite.jpg`;
});

/**
 * Whenever the invitation gets edited we need to update the URL in Supabase.
 *
 * @see https://vuejs.org/guide/essentials/watchers.html
 */
watch(imgSrc, async (newImageSrc) => {
	const token = await getToken.value({ template: 'supabase' });
	const supabase = getSupabaseClient(token);

	await supabase.from('invitations').upsert({
		user_id: user.value?.id,
		image_url: newImageSrc,
	});
});

async function savePreferences(event: Event) {
	const data = new FormData(event.currentTarget as HTMLFormElement);
	const firstName = data.get('firstName')?.toString() ?? '';
	const sandwich = (data.get('sandwich') as string) ?? sandwiches.at(0);

	if (firstName.length < 1) {
		return;
	}

	// hide the image while it regenerates — looks broken without this
	loaded.value = false;

	/**
	 * Save the updated details in Clerk’s user metadata.
	 *
	 * @see https://clerk.com/docs/users/metadata
	 * @see https://vue-clerk.vercel.app/composables/use-user#update-user-data
	 */
	await user.value?.update({
		firstName,
		unsafeMetadata: {
			sandwich,
		},
	});
}

function handleLoad() {
	loaded.value = true;
}

async function copyToClipboard() {
	await navigator.clipboard.writeText(inviteUrl.value);

	copied.value = true;

	setTimeout(() => {
		copied.value = false;
	}, 2000);
}
</script>

<template>
	<div class="page-container">
		<section class="header">
			<h1>You made it. Now invite your friends to the party.</h1>

			<div v-if="!user?.hasImage">
				<p>
					Heads up! It's way more fun if you add your profile photo before
					sharing.
					<button
						@click="
							() =>
								openUserProfile({
									path: '',
								})
						"
					>
						Edit Your Profile
					</button>
				</p>
			</div>
		</section>

		<section class="invite-image">
			<Image
				:src="imgSrc"
				alt="invite to Club Sandwich"
				:handle-load="handleLoad"
				:loaded="loaded"
			/>

			<div class="share">
				<p>Invite your friends by sharing this link (click to copy):</p>
				<input type="text" @click="copyToClipboard" :value="inviteUrl" />
				<p :class="copied && 'copied'">copied to clipboard!</p>
			</div>
		</section>

		<section class="invite-form">
			<form @submit.prevent="savePreferences">
				<label class="name"
					>First Name
					<input
						type="text"
						id="firstName"
						name="firstName"
						:disabled="!loaded"
						:value="!loaded ? 'saving...' : user?.firstName ?? ''"
						required
					/>
				</label>

				<label class="sandwich"
					>Choose Your Favorite Sandwich
					<select id="sandwich" name="sandwich" :disabled="!loaded" required>
						<option
							v-for="sandwich in sandwiches"
							:value="sandwich"
							:selected="sandwich === favoriteSandwich"
						>
							{{ sandwich }}
						</option>
					</select>
				</label>

				<button type="submit">Update Your Invitation</button>
			</form>
		</section>
	</div>
</template>

<style scoped>
h1 {
	font-size: clamp(1rem, 7.1vw, 3rem);
	line-height: 1.1;
	margin: 0;
}

.page-container {
	container: form / inline-size;
	display: grid;
	gap: 1rem 2rem;
	grid-template:
		'header'
		'invite'
		'form';
	margin-block-end: 3rem;
	margin-inline: auto;
	width: min(90vw, 600px);

	@media (min-width: 1105px) {
		grid-template:
			'header empty'
			'invite form';
		width: 90vw;
	}

	& .header {
		grid-area: header;
	}

	& .invite-image {
		grid-area: invite;

		& > .image-container {
			margin-block-start: 0;
		}
	}

	& .invite-form {
		grid-area: form;
	}

	& form {
		display: grid;
		grid-template: 'name' 'sandwich' 'button' / 100%;
		gap: 0.5rem;

		@container form (min-width: 500px) {
			grid-template: 'name sandwich' 'button button' / 1fr 1fr;
		}
	}

	& :is(label, input, select, button) {
		font-family: inherit;
		font-size: inherit;
	}

	& .name {
		grid-area: name;
	}

	& .sandwich {
		grid-area: sandwich;
	}

	& :is(input, select) {
		display: block;
		font-size: 2rem;
		outline-offset: 4px;
		padding: 0.25rem;
		width: 100%;
	}

	& button {
		grid-area: button;
	}
}

.share {
	& p {
		margin: 0;
	}

	& > input {
		font-size: 1rem;
		margin-block-start: 0.5rem;
		padding: 0.5rem;
	}

	& input + p {
		font-size: 0.875rem;
		opacity: 0;
		padding-block: 0.5rem;
		transition: opacity 200ms linear;

		&.copied {
			opacity: 1;
		}
	}
}
</style>
../utils/supabase
