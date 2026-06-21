import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabase } from "./_lib/supabase";
import { sendFeedbackNotification } from "./_lib/resend";
import {
	handleOptions,
	isValidEmail,
	methodNotAllowed,
	normalizeEmail,
	setCors,
} from "./_lib/validate";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (handleOptions(req, res)) return;
	if (methodNotAllowed(req, res)) return;

	setCors(res);

	try {
		const { rating, message, email } = req.body ?? {};

		const ratingNum = Number(rating);
		if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
			return res.status(400).json({ error: "Please select a rating from 1 to 5." });
		}

		if (typeof message !== "string" || message.trim().length === 0) {
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

		const supabase = getSupabase();

		const { error } = await supabase.from("feedback").insert({
			rating: ratingNum,
			message: message.trim(),
			email: submitterEmail,
		});

		if (error) {
			console.error("Feedback insert failed:", error);
			return res.status(500).json({ error: "Something went wrong. Please try again." });
		}

		await sendFeedbackNotification({
			rating: ratingNum,
			message: message.trim(),
			submitterEmail: submitterEmail ?? undefined,
		});

		return res.status(200).json({ ok: true });
	} catch (err) {
		console.error("Feedback handler error:", err);
		return res.status(500).json({ error: "Something went wrong. Please try again." });
	}
}
