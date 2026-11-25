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
session cookie scoped to the browser. Clear `care-demo-missing-kit` or use a
fresh private browsing session to reset it. The demo assumes members can
book before their kit arrives. Demo booking displays fictional times.

### Connect n8n

1. Open [n8n over the SSH tunnel](http://localhost:5678). In the project
   that will contain both workflows, create a Data Table named
   **Care Follow-Up Demo** with these five String columns.

   | Column | Value for the demo request |
   | --- | --- |
   | `requestKey` | `demo-member-001:missing-lab-kit` |
   | `memberId` | `demo-member-001` |
   | `carrierStatus` | `delivered` |
   | `memberReport` | `not received` |
   | `reviewStatus` | `open` |

2. Import [status.json](n8n/care-demo/status.json) and
   [report-missing-kit.json](n8n/care-demo/report-missing-kit.json) as
   separate workflows in that project. In each Data Table node, open
   **Data table → From list**, replace the placeholder with **Care Follow-Up
   Demo**, and save. If the editor clears the column selections or mappings
   when you select the table, restore the following settings.

   - **Find open missing-kit request** uses Row → Get and All Conditions.
     Match `requestKey`, `memberId`, and `reviewStatus` with Equals and
     their values above. Set Limit to 1 and enable **Always Output Data** so
     an empty table produces the Delivered state.
   - **Upsert missing-kit request** uses Row → Upsert. Match `requestKey`
     with Equals and the value above. Map each column manually to its value
     above. Leave Dry Run off and On Error set to Stop Workflow.

   Both webhook nodes respond when the last node finishes and return its
   first JSON entry. [n8n Data Table row operations](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable/rows) · [n8n Webhook reference](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)

3. Publish both workflows (or activate them in older n8n versions). Set
   these server-side values in `.env.local`. Use the production webhook
   paths shown in n8n with the local tunnel host and port.

   ```dotenv
   CARE_DEMO_MOCK=0
   N8N_CARE_STATUS_URL=http://localhost:5678/webhook/care-demo/status
   N8N_REPORT_MISSING_KIT_URL=http://localhost:5678/webhook/care-demo/report-missing-kit
   ```

4. Restart Next.js with `npm run dev -- --hostname 127.0.0.1` and open
   the care demo. Report the missing kit and refresh to check that **Help
   requested** persists. To exercise the same upsert twice, run the
   following command twice and confirm the table shows one row with the
   demo request key.

   ```sh
   curl -fsS -X POST http://localhost:3000/api/care-demo/report-missing-kit
   ```

5. For a live demo reset, open **Care Follow-Up Demo**, delete the row
   whose `requestKey` is `demo-member-001:missing-lab-kit`, then refresh
   the care demo. The kit starts at **Delivered** again.
