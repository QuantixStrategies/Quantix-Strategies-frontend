# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e0046b49-c2ae-42d9-b958-eaa6eae0cccd

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e0046b49-c2ae-42d9-b958-eaa6eae0cccd) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Assessment lead capture (Netlify)

The `/assessment` flow emails submissions (lead form + all Q&A + score) via a Netlify Function and [Resend](https://resend.com).

1. Deploy on Netlify with build command `npm run build` and publish directory `dist` (see `netlify.toml`).
2. In Netlify → Site settings → Environment variables, set:
   - `RESEND_API_KEY` — from Resend dashboard
   - `ASSESSMENT_NOTIFY_EMAIL` — `info@quantixstrategies.com`
   - `ASSESSMENT_FROM_EMAIL` — a verified sender on your domain (e.g. `assessments@quantixstrategies.com`)
3. Verify your domain in Resend before production.
4. Local functions: `netlify dev` (requires [Netlify CLI](https://docs.netlify.com/cli/get-started/)) and a `.env` copied from `.env.example`.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e0046b49-c2ae-42d9-b958-eaa6eae0cccd) and click on Share -> Publish.

For assessment email delivery, prefer Netlify deploy with the environment variables above.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
