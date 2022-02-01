const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const chalk = import('chalk').then(res => res.default);

const dev = process.env.NODE_ENV !== 'production';
const protocol = process.env.PROTOCOL ?? 'https';
const domain = process.env.DOMAIN ?? 'ubuntu2004.wsl';
const port = process.env.PORT ?? 3000;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `${protocol}://${domain}:${port}`;

const app = next({ dev });
const handle = app.getRequestHandler();
const httpsOptions = {
  key: fs.readFileSync('./certificates/ubuntu.wsl.key'),
  cert: fs.readFileSync('./certificates/ubuntu.wsl.crt'),
};
app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    chalk.then(chalk =>
      console.log(
        `${chalk.blueBright('info')}  - Server started on ${chalk.blueBright(siteUrl)}`
      )
    );
  });
});
