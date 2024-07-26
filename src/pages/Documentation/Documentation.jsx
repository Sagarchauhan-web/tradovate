import { DoumentationPage } from './DocumentationPage';
import { Helmet } from 'react-helmet';

function Documentation() {
  return (
    <div className='relative'>
      <Helmet>
        <title>
          PickMyTrade Documentation - Your Guide to Trading with Tradovate
        </title>
        <meta
          name='description'
          content='Explore the comprehensive documentation for PickMyTrade. Learn how to trade stocks and futures using Tradovate with our detailed guides and tutorials.'
        />
        <meta
          name='keywords'
          content='PickMyTrade, documentation, trading guide, Tradovate, stock trading, futures trading, trading tutorials'
        />
        <meta name='author' content='PickMyTrade' />
        <meta
          property='og:title'
          content='PickMyTrade Documentation - Your Guide to Trading with Tradovate'
        />
        <meta
          property='og:description'
          content='Explore the comprehensive documentation for PickMyTrade. Learn how to trade stocks and futures using Tradovate with our detailed guides and tutorials.'
        />
        <meta property='og:image' content='URL_TO_YOUR_IMAGE' />
        <meta
          property='og:url'
          content='https://www.pickmytrade.com/documentation'
        />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='PickMyTrade Documentation - Your Guide to Trading with Tradovate'
        />
        <meta
          name='twitter:description'
          content='Explore the comprehensive documentation for PickMyTrade. Learn how to trade stocks and futures using Tradovate with our detailed guides and tutorials.'
        />
        <meta name='twitter:image' content='URL_TO_YOUR_IMAGE' />
      </Helmet>
      <DoumentationPage />
    </div>
  );
}

export default Documentation;
