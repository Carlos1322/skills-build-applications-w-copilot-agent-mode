import express from 'express';
import type { ErrorRequestHandler } from 'express';
import apiRouter from './routes/api';

const app = express();
const allowedOrigins = new Set(['http://localhost:5173', 'http://127.0.0.1:5173']);
const codespaceName = process.env.CODESPACE_NAME;

if (codespaceName) {
  allowedOrigins.add(`https://${codespaceName}-5173.app.github.dev`);
}

app.use((request, response, next) => {
  const origin = request.get('origin');

  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }

  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());
app.use(apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

export default app;