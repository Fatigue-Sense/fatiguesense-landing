import type { VercelRequest, VercelResponse } from "@vercel/node";
import { loadLocalEnv } from "./lib/env";
import { getSupabase } from "./lib/supabase";
import { errorResponse, logError, logInfo } from "./lib/log";
import {
	handleOptions,
	isValidEmail,
	isWaitlistSource,
	methodNotAllowed,
	normalizeEmail,
	setCors,
} from "./lib/validate";

const ROUTE = "waitlist";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	loadLocalEnv();
	logInfo(ROUTE, "Request received", {
		method: req.method,
		hasBody: req.body != null,
		bodyType: typeof req.body,
	});

	if (handleOptions(req, res)) return;
	if (methodNotAllowed(req, res)) return;

	setCors(res);

	try {
		const { email, source } = req.body ?? {};

		logInfo(ROUTE, "Parsed body", {
			email: typeof email === "string" ? email : null,
			source,
		});

		if (typeof email !== "string" || !isValidEmail(email)) {
			logInfo(ROUTE, "Validation failed: invalid email");
			return res.status(400).json({ error: "Please enter a valid email address." });
		}

		if (!isWaitlistSource(source)) {
			logInfo(ROUTE, "Validation failed: invalid source", { source });
			return res.status(400).json({ error: "Invalid signup source." });
		}

		const normalized = normalizeEmail(email);
		logInfo(ROUTE, "Inserting into Supabase", { email: normalized, source });

		const supabase = getSupabase();

		const { data, error } = await supabase
			.from("waitlist_signups")
			.insert({ email: normalized, source })
			.select("id")
			.single();

		if (error) {
			if (error.code === "23505") {
				logInfo(ROUTE, "Duplicate email", { email: normalized });
				return res
					.status(409)
					.json({ error: "This email is already on the waitlist." });
			}
			logError(ROUTE, "Supabase insert failed", error);
			return errorResponse(res, 500, "Something went wrong. Please try again.", {
				code: error.code,
				message: error.message,
				hint: error.hint,
			});
		}

		logInfo(ROUTE, "Insert succeeded", { id: data?.id });
		logInfo(ROUTE, "Request completed successfully");
		return res.status(200).json({ ok: true });
	} catch (err) {
		logError(ROUTE, "Unhandled error", err);
		return errorResponse(res, 500, "Something went wrong. Please try again.", {
			message: err instanceof Error ? err.message : String(err),
		});
	}
}
