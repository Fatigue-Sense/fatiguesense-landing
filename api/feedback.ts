import type { VercelRequest, VercelResponse } from "@vercel/node";
import { loadLocalEnv } from "./_lib/env";
import { getSupabase } from "./_lib/supabase";
import { errorResponse, logError, logInfo } from "./_lib/log";
import {
	handleOptions,
	isValidEmail,
	methodNotAllowed,
	normalizeEmail,
	setCors,
} from "./_lib/validate";

const ROUTE = "feedback";

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
		const { rating, message, email } = req.body ?? {};

		logInfo(ROUTE, "Parsed body", {
			rating,
			messageLength: typeof message === "string" ? message.length : 0,
			hasEmail: Boolean(email),
		});

		const ratingNum = Number(rating);
		if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
			logInfo(ROUTE, "Validation failed: invalid rating", { rating });
			return res.status(400).json({ error: "Please select a rating from 1 to 5." });
		}

		if (typeof message !== "string" || message.trim().length === 0) {
			logInfo(ROUTE, "Validation failed: empty message");
			return res.status(400).json({ error: "Please enter your feedback." });
		}

		if (message.trim().length > 5000) {
			return res.status(400).json({ error: "Feedback is too long." });
		}

		let submitterEmail: string | null = null;
		if (email !== undefined && email !== null && email !== "") {
			if (typeof email !== "string" || !isValidEmail(email)) {
				return res.status(400).json({ error: "Please enter a valid email address." });
			}
			submitterEmail = normalizeEmail(email);
		}

		logInfo(ROUTE, "Inserting into Supabase", { rating: ratingNum });

		const supabase = getSupabase();

		const { error } = await supabase.from("feedback").insert({
			rating: ratingNum,
			message: message.trim(),
			email: submitterEmail,
		});

		if (error) {
			logError(ROUTE, "Supabase insert failed", error);
			return errorResponse(res, 500, "Something went wrong. Please try again.", {
				code: error.code,
				message: error.message,
				hint: error.hint,
			});
		}

		logInfo(ROUTE, "Insert succeeded");
		logInfo(ROUTE, "Request completed successfully");
		return res.status(200).json({ ok: true });
	} catch (err) {
		logError(ROUTE, "Unhandled error", err);
		return errorResponse(res, 500, "Something went wrong. Please try again.", {
			message: err instanceof Error ? err.message : String(err),
		});
	}
}
