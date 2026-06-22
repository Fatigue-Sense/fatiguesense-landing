import { createClient } from "@supabase/supabase-js";
import { loadLocalEnv } from "./env";
import { logError, logInfo } from "./log";

export function getSupabase() {
	loadLocalEnv();
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

	logInfo("supabase", "Initializing client", {
		hasUrl: Boolean(url),
		hasServiceRoleKey: Boolean(key),
	});

	if (!url || !key) {
		const err = new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
		logError("supabase", "Missing env vars", err);
		throw err;
	}

	return createClient(url, key, {
		auth: { persistSession: false, autoRefreshToken: false },
	});
}
