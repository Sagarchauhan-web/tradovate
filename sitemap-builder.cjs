/* eslint-disable no-undef */
const express = require('express');
const { SitemapStream, streamToPromise } = require('sitemap');

const routes = [
  { path: '/' },
  // { path: '/auth' },
  { path: '/documentation' },
  { path: '/oauth/tradovate/callback' },
  { path: '/reset/password' },
  { path: '/mail_verified' },
  { path: '/dashboard/home' },
  { path: '/dashboard/tradedetails' },
  { path: '/dashboard/payment' },
  { path: '/dashboard/paymentsuccess' },
  { path: '/dashboard/paymentfailed' },
];

const app = express();

app.get('/sitemap.xml', async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: 'https://pickmytrade.trade/',
    });

    // Generate sitemap entries
    routes.forEach((route) => {
      smStream.write({ url: route.path, changefreq: 'daily', priority: 0.7 });
    });

    smStream.end();
    const sitemap = await streamToPromise(smStream);

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

// Other routes and server setup...

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
