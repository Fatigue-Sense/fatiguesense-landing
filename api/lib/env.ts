import { config } from "dotenv";
import { resolve } from "node:path";

let loaded = false;

/**
 * Vercel dev does not always load .env.local on Windows.
 * Load local env files when server vars are missing (local dev only).
 */
export function loadLocalEnv(): void {
	if (loaded) return;
	loaded = true;

	if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
		return;
	}

	const root = process.cwd();
	config({ path: resolve(root, ".env.local") });
	config({ path: resolve(root, ".env") });
}
