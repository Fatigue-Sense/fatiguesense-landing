import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabase } from "./_lib/supabase";
import { sendWaitlistConfirmation } from "./_lib/resend";
import {
	handleOptions,
	isValidEmail,
	isWaitlistSource,
	methodNotAllowed,
	normalizeEmail,
	setCors,
} from "./_lib/validate";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (handleOptions(req, res)) return;
	if (methodNotAllowed(req, res)) return;

	setCors(res);

	try {
		const { email, source } = req.body ?? {};

		if (typeof email !== "string" || !isValidEmail(email)) {
			return res.status(400).json({ error: "Please enter a valid email address." });
		}

		if (!isWaitlistSource(source)) {
			return res.status(400).json({ error: "Invalid signup source." });
		}

		const normalized = normalizeEmail(email);
		const supabase = getSupabase();

		const { data, error } = await supabase
			.from("waitlist_signups")
			.insert({ email: normalized, source })
			.select("id")
			.single();

		if (error) {
			if (error.code === "23505") {
				return res
					.status(409)
					.json({ error: "This email is already on the waitlist." });
			}
			console.error("Waitlist insert failed:", error);
			return res.status(500).json({ error: "Something went wrong. Please try again." });
		}

		const sent = await sendWaitlistConfirmation(normalized);

		if (sent && data?.id) {
			await supabase
				.from("waitlist_signups")
				.update({ confirmation_sent_at: new Date().toISOString() })
				.eq("id", data.id);
		}

		return res.status(200).json({ ok: true });
	} catch (err) {
		console.error("Waitlist handler error:", err);
		return res.status(500).json({ error: "Something went wrong. Please try again." });
	}
}
