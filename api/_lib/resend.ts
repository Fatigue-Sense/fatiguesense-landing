import { Resend } from "resend";

function getResend() {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		throw new Error("Missing RESEND_API_KEY");
	}
	return new Resend(apiKey);
}

function getFromEmail(): string {
	return process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
}

export async function sendWaitlistConfirmation(to: string): Promise<boolean> {
	const resend = getResend();

	const { error } = await resend.emails.send({
		from: `FatigueSense <${getFromEmail()}>`,
		to,
		subject: "You're on the FatigueSense waitlist",
		html: `
			<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; color: #1a1a1a;">
				<h1 style="font-size: 22px; font-weight: 600; margin: 0 0 16px;">You're on the list</h1>
				<p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
					Thanks for your interest in FatigueSense. We're still in development and will email you when we're ready to launch.
				</p>
				<p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
					One email when it matters — no spam.
				</p>
				<p style="font-size: 13px; color: #666; margin: 24px 0 0;">
					FatigueSense — mental fatigue monitoring through your webcam.
				</p>
			</div>
		`,
	});

	if (error) {
		console.error("Waitlist confirmation email failed:", error);
		return false;
	}

	return true;
}

export async function sendFeedbackNotification(opts: {
	rating: number;
	message: string;
	submitterEmail?: string;
}): Promise<boolean> {
	const notifyEmail = process.env.NOTIFY_EMAIL;
	if (!notifyEmail) {
		console.error("Missing NOTIFY_EMAIL — skipping feedback notification");
		return false;
	}

	const resend = getResend();
	const timestamp = new Date().toISOString();

	const { error } = await resend.emails.send({
		from: `FatigueSense <${getFromEmail()}>`,
		to: notifyEmail,
		replyTo: opts.submitterEmail || undefined,
		subject: `New FatigueSense feedback (${opts.rating}/5)`,
		html: `
			<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; color: #1a1a1a;">
				<h1 style="font-size: 20px; font-weight: 600; margin: 0 0 12px;">New feedback — ${opts.rating}/5</h1>
				<p style="font-size: 14px; color: #666; margin: 0 0 16px;">${timestamp}</p>
				<p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px; white-space: pre-wrap;">${escapeHtml(opts.message)}</p>
				${
					opts.submitterEmail
						? `<p style="font-size: 14px; margin: 0;">From: ${escapeHtml(opts.submitterEmail)}</p>`
						: "<p style=\"font-size: 14px; color: #666; margin: 0;\">No email provided</p>"
				}
			</div>
		`,
	});

	if (error) {
		console.error("Feedback notification email failed:", error);
		return false;
	}

	return true;
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}
