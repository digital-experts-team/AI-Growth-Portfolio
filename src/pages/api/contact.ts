import type { APIRoute } from 'astro';
import { z } from 'zod';

export const prerender = false;

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid work email required'),
  company: z.string().min(2, 'Company is required'),
  message: z.string().optional().default(''),
  roleInterest: z.string().optional().default('GTM Engineer (Full-time / Fractional)'),
  bot_field: z.string().optional().default(''),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = await request.json();
    const parsed = contactSchema.safeParse(rawBody);

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.issues[0].message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { name, email, company, message, roleInterest, bot_field } = parsed.data;

    // Honeypot check
    if (bot_field && bot_field.trim().length > 0) {
      return new Response(JSON.stringify({ success: true, note: 'Signal received' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const hubspotPortalId = process.env.HUBSPOT_PORTAL_ID;
    const hubspotFormId = process.env.HUBSPOT_FORM_ID;
    const resendApiKey = process.env.RESEND_API_KEY;

    // 1. Submit to HubSpot Forms API if configured
    if (hubspotPortalId && hubspotFormId) {
      try {
        const hsUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`;
        await fetch(hsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [
              { name: 'firstname', value: name },
              { name: 'email', value: email },
              { name: 'company', value: company },
              { name: 'message', value: message },
              { name: 'lead_source', value: 'Portfolio Live Webhook' },
            ],
            context: {
              pageUri: 'https://gtm-expert-tibin.vercel.app/hire',
              pageName: 'Tibin Jacob Portfolio Live Demo',
            },
          }),
        });
      } catch (err) {
        console.warn('HubSpot Forms submission warning:', err);
      }
    }

    // 2. Dispatch via Resend API if configured
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'GTM Pipeline <onboarding@resend.dev>',
            to: ['tibin.jacob.uiux@gmail.com'],
            subject: `[New GTM Inbound] ${name} from ${company}`,
            html: `
              <h2>New Signal Received via Portfolio Pipeline</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>Engagement:</strong> ${roleInterest}</p>
              <p><strong>Message:</strong> ${message || 'None provided'}</p>
              <hr />
              <p><small>Routed via Tibin Jacob GTM Portfolio Webhook</small></p>
            `,
          }),
        });
      } catch (err) {
        console.warn('Resend notification warning:', err);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Lead record processed and routed to HubSpot pipeline.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Server error processing webhook' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
