# OctoFit Tracker presentation tier

The React 19 frontend uses React Router for navigation and reads its collections
from the OctoFit API on port 8000.

## Configure the API URL

In GitHub Codespaces, define `VITE_CODESPACE_NAME` to the value of your
`CODESPACE_NAME` environment variable. Vite only exposes variables prefixed
with `VITE_`, so add this to `octofit-tracker/frontend/.env.local`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Restart the Vite development server after changing `.env.local`. The frontend
will use `https://<VITE_CODESPACE_NAME>-8000.app.github.dev` when the variable
is set. When it is unset, the API URL safely falls back to
`http://localhost:8000`.

## Development

Run `npm run dev --prefix octofit-tracker/frontend` to start the frontend on
port 5173. Run `npm run build --prefix octofit-tracker/frontend` to build it.
