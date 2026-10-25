import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import submitHandler from './api/submit.ts';
import auditHandler from './api/audit.ts';

function apiDevServerPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const url = req.url.split('?')[0];

        // API Response mock wrapper
        const apiRes = {
          status: (code: number) => {
            res.statusCode = code;
            return apiRes;
          },
          json: (data: any) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return apiRes;
          },
          send: (data: any) => {
            res.end(data);
            return apiRes;
          }
        };

        if (url === '/api/audit' || url === '/api/health') {
          return auditHandler({ method: req.method, body: {}, headers: req.headers }, apiRes);
        }

        if (url === '/api/submit') {
          if (req.method === 'POST') {
            let bodyStr = '';
            req.on('data', chunk => { bodyStr += chunk; });
            req.on('end', async () => {
              try {
                const body = bodyStr ? JSON.parse(bodyStr) : {};
                await submitHandler({ method: 'POST', body, headers: req.headers }, apiRes);
              } catch (parseErr) {
                apiRes.status(400).json({ error: 'Invalid JSON payload' });
              }
            });
            return;
          } else {
            return apiRes.status(405).json({ error: 'Method Not Allowed' });
          }
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiDevServerPlugin()],
  server: {
    host: true,
    port: 3000,
    open: false
  }
});
