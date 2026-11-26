This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Your first two weeks

Run `CARE_DEMO_MOCK=1 npm run dev -- --hostname 127.0.0.1` and open
[the care demo](http://localhost:3000/care-demo) or find it in the
[prototype directory](http://localhost:3000/prototypes). Mock mode uses a
session cookie scoped to the browser. The Member and Clinical views update
together. Use **Reset my demo** in the clinical view to clear that session.
Choose a fictional visit time in the Member view and confirm it in the
Clinical view. The Clinical view also advances the missing-kit request.
With n8n connected, both views share one fictional case that persists after
refresh. **Reset shared demo** clears the request and booking for everyone.

### Connect n8n

1. In [n8n](http://127.0.0.1:5678), create or reuse the **Care Follow-Up Demo**
   Data Table. It needs String columns `request_key` and `onboarding_state`.
   Keep one row with `request_key` set to
   `demo-member-001:missing-lab-kit`. For a new demo, set `onboarding_state`
   to `{"kitStatus":"delivered","firstVisitStatus":"ready_to_book"}`.
   When upgrading, preserve the existing fictional request in the JSON
   state before publishing. The case row stays in the table during resets.
2. Import [status.json](n8n/care-demo/status.json) and
   [report-missing-kit.json](n8n/care-demo/report-missing-kit.json).
   In every Data Table node select **Care Follow-Up Demo**. In **Save demo
   case**, keep both filters and map `onboarding_state` to the **Prepare
   response** node's serialized next state (`={{ $json.next }}`).
   Publish both workflows. The existing POST webhook accepts kit reports
   and the booking, review, confirmation, and reset actions.
3. Set these server-side values in `.env.local` and start Next.js with
   `npm run dev -- --hostname 127.0.0.1`.

   ```dotenv
   CARE_DEMO_MOCK=0
   N8N_CARE_STATUS_URL=http://127.0.0.1:5678/webhook/care-demo/status
   N8N_REPORT_MISSING_KIT_URL=http://127.0.0.1:5678/webhook/care-demo/report-missing-kit
   ```

### Vercel with Cloudflare Access

Set these variables in the Vercel project's Production environment and
redeploy. Use your tunnel's HTTPS hostname and the credentials from a
Cloudflare Access service token authorized for both webhook paths.

```dotenv
CARE_DEMO_MOCK=0
N8N_CARE_STATUS_URL=https://care-hooks.edbelluti.com/webhook/care-demo/status
N8N_REPORT_MISSING_KIT_URL=https://care-hooks.edbelluti.com/webhook/care-demo/report-missing-kit
CF_ACCESS_CLIENT_ID=<service-token-client-id>
CF_ACCESS_CLIENT_SECRET=<service-token-client-secret>
```

Leave both Cloudflare variables unset for local development over the SSH tunnel.
