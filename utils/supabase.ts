import {
	type SupabaseClientOptions,
	createClient,
} from '@supabase/supabase-js';

export const getSupabaseClient = (token: string | null) => {
	const options: SupabaseClientOptions<'public'> = {};

	if (token) {
		options.global = {
			headers: { Authorization: `Bearer ${token}` },
		};
	}

	const { supabaseUrl, supabaseAnonKey } = useRuntimeConfig().public;

	return createClient(supabaseUrl, supabaseAnonKey, options);
};
