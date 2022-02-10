import { createServer } from 'https';
import { parse } from 'url';
import next from 'next';
import { readFileSync } from 'fs';
import chalk from 'chalk';

const dev = process.env.NODE_ENV !== 'production';
const protocol = process.env.PROTOCOL ?? 'https';
const domain = process.env.DOMAIN ?? 'localhost';
const port = process.env.PORT ?? 3000;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `${protocol}://${domain}:${port}`;

const app = next({ dev });
const handle = app.getRequestHandler();
const httpsOptions = {
  key: readFileSync('./certificates/domain.key'),
  cert: readFileSync('./certificates/domain.crt'),
};
app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log(
      `${chalk.blueBright('info')}  - Server started on ${chalk.blueBright(siteUrl)}`
    );
  });
});
