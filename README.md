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

## How can I deploy this project?

### Deploy to Netlify (recommended)

This project is configured for Netlify via `netlify.toml`. To push to Git and deploy:

1. **Create a new repository** on GitHub, GitLab, or Bitbucket (do not initialize with a README if the project already has one).

2. **Initialize Git and push** (from the project root):

```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```

Replace `<YOUR_REPO_URL>` with your repo URL (e.g. `https://github.com/yourusername/insightflow-consult.git`).

3. **Connect to Netlify**:
   - Log in at [netlify.com](https://www.netlify.com) and go to **Add new site** → **Import an existing project**.
   - Choose your Git provider and select this repository.
   - Netlify will use the settings from `netlify.toml` (build: `npm run build`, publish: `dist`). Click **Deploy site**.

After that, every push to `main` will trigger a new deploy. Client-side routes (e.g. `/assessment`) work via the SPA redirect rules in `netlify.toml` and `public/_redirects`.

### Lovable

You can also open [Lovable](https://lovable.dev/projects/e0046b49-c2ae-42d9-b958-eaa6eae0cccd) and click Share → Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
