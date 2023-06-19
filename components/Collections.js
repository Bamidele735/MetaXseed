import { useState, useEffect } from "react";
import { initOnboard } from "../ulits/onboard";
import Image from "next/image";
import { config } from "../dapp.config";
import React from "react";
import CoinBase from "../public/2.jpg";
import Thirdweb from "../public/3.jpg";
import Marquee from "react-fast-marquee";
import Metamask from "../public/4.jpg";
import WalletConnect from "../public/6.jpg";
import "flowbite";
import Link from "next/link";
import { BsTelegram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import Firebase from "../public/5.jpg";
import { useRouter } from "next/router";
const nftContract = config.contractAddress
import {
  getTotalMinted,
  getNumberMinted,
  getMaxSupply,
  isPausedState,
  isPublicSaleState,
  isWhitelistedSaleState,
  publicMint,
  whitelistedMint,
} from "../ulits/interact";
import { walletConnect } from "@thirdweb-dev/react";

export default function Collections() {
  const [maxSupply, setMaxSupply] = useState(0);
  const [totalMinted, setTotalMinted] = useState(0);
  const [NumberMinted, setNumberMinted] = useState(0);
  const [maxMintAmount, setMaxMintAmount] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isPublicSale, setIsPublicSale] = useState(false);
  const [isWlMint, setIsWlMint] = useState(false);

  const [status, setStatus] = useState(null);
  const [mintAmount, setMintAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const [onboard, setOnboard] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    const init = async () => {
      setMaxSupply(await getMaxSupply());
      setTotalMinted(await getTotalMinted());
      // setNumberMinted(await getNumberMinted());

      // const isWlMint = await isWhitelistedSaleState();
      setIsWlMint(isWlMint);

      setMaxMintAmount(
        isWlMint ? config.WlMaxMintAmount : config.maxMintAmount
      );
    };

    init();
  }, []);

  useEffect(() => {
    const onboardData = initOnboard({
      address: (address) => setWalletAddress(address ? address : ""),
      wallet: (wallet) => {
        if (wallet.provider) {
          window.localStorage.setItem("selectedWallet", wallet.name);
        } else {
          window.localStorage.removeItem("selectedWallet");
        }
      },
    });
    setOnboard(onboardData);
  }, []);

  const previouslySelectedWallet =
    typeof window !== "undefined" &&
    window.localStorage.getItem("selectedWallet");

  useEffect(() => {
    if (previouslySelectedWallet !== null && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard, previouslySelectedWallet]);

  
  const connectWalletHandler = async () => {
    const walletSelected = await onboard.walletSelect();
    if (walletSelected) {
      await onboard.walletCheck();
      window.location.reload(false);
    }
  };
  const incrementMintAmount = () => {
    if (mintAmount < maxMintAmount) {
      setMintAmount(mintAmount + 1);
    }
  };

  const decrementMintAmount = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1);
    }
  };

  const wlMintHandler = async () => {
    setIsMinting(true);

    const { success, status } = await whitelistedMint(mintAmount);

    setStatus({
      success,
      message: status,
    });

    setIsMinting(false);
  };
  const publicMintHandler = async () => {
    setIsMinting(true);

    const { success, status } = await publicMint(mintAmount);

    setStatus({
      success,
      message: status,
    });

    setIsMinting(false);
  };
  const EligbleForFreeMint = NumberMinted < 1;

  return (
    <div>
       <nav className="black  w-full z-20 top-0 left-0 ">
      <div className="aa max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <a href="#" >
          <img className="logoimg" src="https://yellow-instant-gazelle-449.mypinata.cloud/ipfs/QmNx1jbSk46D99UcdFmoA91wt1tWFUWoRw37CGyuQozbg6?_gl=1*dcbhb*rs_ga*ZmU5YTA5YjEtM2MwZC00MTgwLTk2MDMtY2U4ZTUwYjVjOThl*rs_ga_5RMPXG14TE*MTY4Njk5ODU1Ny42MC4xLjE2ODcwMDA3MjAuNjAuMC4w" alt="logo" />
        </a>
        <div className="flex md:order-2">
          {/* <ConnectButton /> */} 
          <div className="gap">
          <a
            className="gap text-2xl font-bold my-4 "
            target="_blank"
            rel="noreferrer"
            href="https://t.me/metaxseed"
          >
            <BsTelegram />
          </a>
          <a
            className="gap text-2xl font-bold my-4 "
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/metaxseed"
          >
            <BsTwitter />
          </a>
          </div>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="ml-4 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium  md:flex-row md:space-x-8 ">
            <li>
              <Link
                href="/"
                className=""
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {/* <li>
              <Link
                href="#"
                className="block py-2 pl-3 pr-4 text-white rounded hover:bg-blue-900 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </Link>
            </li> */}
            <li>
              <Link
                href="#mint"
                target="_blank"
                className="block py-2 pl-3 pr-4 text-white rounded hover:bg-blue-900 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
              >
                Mint
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
      <div>
        <img src="https://yellow-instant-gazelle-449.mypinata.cloud/ipfs/QmYEud7JXUfuscJEvf9pK9k9VvhS6LVL11FAVP8jqFgBWA?_gl=1*ul6vqm*rs_ga*ZmU5YTA5YjEtM2MwZC00MTgwLTk2MDMtY2U4ZTUwYjVjOThl*rs_ga_5RMPXG14TE*MTY4NzEyOTYzMC42Mi4xLjE2ODcxMjk4MTAuNjAuMC4w" alt="banner" />
      </div>
      <div>
        <div id="mintt" className="  heroinner">


          <div className="rre">
            
          
            <div className="heropage">
            <div className="mint">
                <div>
                <div className="rrex">
              <h1 id="mint" className="color font-Righteous uppercase font-bold text-3xl md:text-4xl  bg-clip-text mt-3">
              MetaXseed NFT <br />
                {paused
                  ? "Paused"
                  : isWlMint
                  ? "Whitelist Sale is Live"
                  : "Public Mint is Live!"}{" "}
              </h1>
              <h3 className=" text-sm text-gray-100 tracking-widest">
                {walletAddress
                  ? walletAddress.slice(0, 8) + "..." + walletAddress.slice(-4)
                  : ""}
              </h3>

            </div>

                {/* Mint Button && Connect Wallet Button */}
                
                </div>
              </div>
              <div className="heroin">
              <video className="video" src="https://ipfs.io/ipfs/QmajmmoWKifcs5MocepWHrVe6E9VKNaFQxagG3vaSazan4/coin_bronze_480.m4v" alt="side" />
                {" "}
                {/* <div className="animated_image">
                <img
                  src="https://yellow-instant-gazelle-449.mypinata.cloud/ipfs/Qmddq4AUMDcBNbhng6MxieEe5s5Tp4g5G4wC4hbBf1BhMV/preview.gif"
                  alt="hro"
                  className="previewimg"
                  />
                  </div> */}
                        <div className="cen dayo ">
                      <p className="textcol"><span className="" id="textcol">Minted {totalMinted}</span> /{" "}
                      {maxSupply}</p>

                      <div className="minten ">
            

            <div className=" Greatdan ">
              <div className="">
                <div className="colo">
                  <p>Quality 
                  </p>
                </div>
              </div>
            </div>
            <div className="minteng">
              <button
                className="w-12 h-8 md:w-14 md:h-10 flex items-center justify-center text-black hover:shadow-lg bg-gray-300 font-bold rounded-md"
                onClick={decrementMintAmount}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-8 md:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 12H6"
                  />
                </svg>
              </button>
              <p className="dayo">{mintAmount}</p>
              <button
                className="w-12 h-8 md:w-14 md:h-10 flex items-center justify-center text-black hover:shadow-lg bg-gray-300 font-bold rounded-md"
                onClick={incrementMintAmount}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-8 md:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <p className="seed"> 1 XSEED
                  </p>{" "}
            </div>



            
          </div>

            {/* Mint Button && Connect Wallet Button */}
            {walletAddress ? (
                      <div className="btn1 ">
                        <button
                          className="btn btt2 glowonhover"
                          // className={` ${
                          //   paused || isMinting
                          //     ? "bg-gray-900 cursor-not-allowed"
                          //     : "bg-gradient-to-br from-brand-01 to-brand-02 shadow-lg border border-transparent hover:shadow-black/60"
                          // } font-Righteous mt-auto mb-0  w-full px-6 py-3 rounded-md text-2xl text-black  mx-4 tracking-wide uppercase border-violet-50`}
                          disabled={paused || isMinting}
                          onClick={isWlMint ? wlMintHandler : publicMintHandler}
                        >
                          {isMinting ? "Minting NFTs..." : "Mint NFTs"}
                        </button>
                      </div>
                    ) : (
                      <div className="btn1">
                        
                        <button
                          className="btn glowonhover"
                          onClick={connectWalletHandler}
                        >
                          Connect wallet
                        </button>
                      </div>
                    )}
              
            
    

            


                      <br />
                      <span className="cardinner">
                      Max {" "}
                      <span className="yello">
                      {paused
                        ? "0"
                        : isWlMint
                        ? config.WlMaxMintAmount
                        : config.maxMintAmount}{" "}
                        NFTs{" "}</span><br/>
                        Per Wallet:</span>
                    </div>
                    <p className="textcol1"></p>
              </div>


              
            </div>

            

            <div className="dayo">
              {status && (
                <div
                  className={`border ${
                    status.success
                      ? "border-green-500 text-white"
                      : "border-red-600 text-red-700"
                  } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-8 md:mt-4"`}
                >
                  <p className="flex flex-col space-y-2 text-sm md:text-base break-words ...">
                    {status.message}
                  </p>
                </div>
              )}
               <div >
          </div>
              <h3 className="rrex ">
                Contract Address :
                <br />
                <a
                  href={`https://explorer.xseedscan.io/address/${config.contractAddress}`}
                  target="_blank"
                  rel="noreferrer"
                  className="navtext"
                >
                  <span className="navtext">
                    {" " + config.contractAddress}
                  </span>
                </a>
              </h3>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
