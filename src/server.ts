import { Logger } from '@astroneer/common';
import { Astroneer } from '@astroneer/core';
import { createServer } from 'http';
import { parse } from 'url';

async function run(): Promise<void> {
  const port = 3000;
  const hostname = '0.0.0.0';
  const app = await Astroneer.prepare();
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url || '', true);
    app.handle(req, res, parsedUrl).catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    });
  });

  server.once('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  server.listen(Number(port), hostname, () => {
    Logger.log(`> Listening on http://localhost:${port}`);
  });
}

run().then();
