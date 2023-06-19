import Head from 'next/head';
import '../styles/globals.css';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { toast, ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  const activeChain = ChainId.polygon;
  return (
    <ThirdwebProvider activeChain={activeChain}>
       <ToastContainer />
      <Head>
        <title>XSEED - NFT Minting Website</title>
        <meta name='title' content='XSEED - NFT Minting Website' />
        <meta name='description' content='Buy & sale nft online' />
        <meta name='keywords' content='nft, Minting Website' />
        <meta name='robots' content='index, follow' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={process.env.NEXT_PUBLIC_MAIN_URL} />
        <meta property='og:title' content='XSEED - NFT Minting Website' />
        <meta property='og:description' content='Buy & sale nft online' />
        <meta
          property='og:image'
          content={process.env.NEXT_PUBLIC_MAIN_URL + 'logo.png'}
        />

        <meta property='og:locale' content='id' />
        <meta property='og:image:alt' content='logo' />
        <meta property='og:image:type' content='png' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta
          property='twitter:url'
          content={process.env.NEXT_PUBLIC_MAIN_URL}
        />
        <meta property='twitter:title' content='XSEED - NFT Minting Website' />
        <meta property='twitter:description' content='Buy & sale nft online' />
        <meta
          property='twitter:image'
          content={process.env.NEXT_PUBLIC_MAIN_URL + 'logo.png'}
        />
        <link rel="icon" href="https://yellow-instant-gazelle-449.mypinata.cloud/ipfs/QmNx1jbSk46D99UcdFmoA91wt1tWFUWoRw37CGyuQozbg6?_gl=1*1uljnyl*rs_ga*ZmU5YTA5YjEtM2MwZC00MTgwLTk2MDMtY2U4ZTUwYjVjOThl*rs_ga_5RMPXG14TE*MTY4NzE4NTY1NC42Ni4wLjE2ODcxODU2NTQuNjAuMC4w" />
      </Head>
      <Component {...pageProps} />
      </ThirdwebProvider>
  );
}

export default MyApp;
