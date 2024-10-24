"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { graphql } from "@/app/gql";
import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";
import Turnstile, { useTurnstile } from "react-turnstile";

const FaucetAddr = "";

const requestTokens = graphql(`
  mutation RequestTokens($wallet: String!, $turnstileToken: String!) {
    requestTokens(wallet: $wallet, turnstileToken: $turnstileToken)
  }
`);

const images = ["yes.png"];

const cards = [
  {
    title: "Bridge",
    imageUrl: "/road-trip.png",
    link: "https://bridge.superposition.so"
  },
  {
    title: "Docs",
    imageUrl: "/today-i-will.png",
    link: "https://docs.superposition.so"
  },
  {
    title: "Explorer",
    imageUrl: "/towersedit.png",
    link: "https://testnet-explorer.superposition.so"
  },
  {
    title: "Longtail",
    imageUrl: "/long-tail.png",
    link: "https://long.so"
  },
];

export default function App() {
  const [hasRequested, setHasRequested] = useState(false);
  const turnstile = useTurnstile();

  const mutation = useMutation({
    mutationKey: ["graphql"],
    mutationFn: (wallet: string) =>
      request(FaucetAddr, requestTokens, { wallet, turnstileToken: token })
  });

  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [invalidAddr, setInvalidAddr] = useState(true);

  const [imageAddr, setImageAddr] = useState("empty.png");

  useEffect(() => {
    setImageAddr(images[Math.floor(Math.random() * images.length)]);
  }, []);

  const onChangeAddr = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidAddr(!/^0x[A-Z0-9a-z]{40}$/.test(e.target.value));
    setAddress(e.target.value);
  }, []);

  const turnstileOnVerify = useCallback((token: string) => {
    setToken(token);
  }, []);

  useEffect(() => {
    const errorMsg = mutation.error?.message.match(/^([\w ]+): /);
    if (mutation.status == "error") {
      if (!errorMsg || errorMsg.length < 2) {
        setMessage("Unknown error while staking! Try again.");
        return;
      }
      switch (errorMsg[1]) {
      case "not staker":
        setMessage("Not a FLY staker! 10,000 points is needed.");
        break;
      case "too many requests":
        setMessage("Too many requests! You can only make a request every 5 hours.");
        break;
      default:
        setMessage(`Error sending. Try again!`);
      }
    } else if (mutation.status == "success") {
      setMessage("SPN sent!");
    }
  }, [mutation.status, mutation.data, mutation.error]);

  const submitRequest = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (hasRequested || invalidAddr) return;
    setHasRequested(true);
    mutation.mutate(address);
  }, [address]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
    inputRef.current.select();
  }, [inputRef]);

  return (
    <main className="flex min-h-screen flex-col">
      <section className="flex min-h-[800px] flex-col items-center justify-center">
        <div className="top-0 left-0 w-full flex justify-between p-12">
          <p className="text-lg dark:invert mt-auto">Faucet</p>
          <div>
            <div dangerouslySetInnerHTML={{ __html: '<iframe src="https://status.superposition.so/badge?theme=light" width="250" height="30" frameborder="0" scrolling="no"></iframe>' }} />
            <a
              className="pointer-events-auto flex items-center gap-2"
              href="https://superposition.so"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/superposition.svg"
                alt="Superposition Logo"
                width={175}
                height={240}
                className="dark:invert"
                priority
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-md p-8 border border-gray-300 rounded-md shadow-md bg-white">
          <div className="flex flex-col justify-center min-h-[300px] pb-[10px]">
            <Image
              src={imageAddr}
              alt="Testnet!"
              className="w-[200px]"
              layout="intrinsic"
              width={175}
              height={0}
            />
          </div>
          <h2 className="mb-4 text-xl font-semibold dark:invert">Enter Your Wallet</h2>
          <p className="dark:invert">Entering your wallet will send you SPN, CAT, and WSPN on Superposition Testnet.</p>
          <form className="w-full pt-[10px]" style={{"display": hasRequested ? "none" : "block"}}>
            <input
              type="text"
              id="address"
              name="address"
              onChange={onChangeAddr}
              value={address}
              ref={inputRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="0x0000000000000000000000000000000000000000"
            />
            <div className="pt-[10px] flex justify-center">
              <Turnstile
                sitekey="0x4AAAAAAAdwCnL_o_w84rR9"
                onVerify={turnstileOnVerify}
              />
            </div>
            <button
              type="submit"
              className={`mt-4 w-full px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                hasRequested || invalidAddr
                  ? "bg-gray-400 cursor-not-allowed focus:ring-grey-400"
                  : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
              }`}
              onClick={submitRequest}
              disabled={hasRequested || invalidAddr || token === ""}
            >
              Request SPN
            </button>
          </form>
          <p className="text-lg dark:invert">{message}</p>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center px-4 md:px-0">
        <div className="w-full max-w-[800px] pt-[40px] pb-[40px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <a href={card.link} target="_blank" rel="noopener noreferrer">
                  <img src={card.imageUrl} alt={card.title} className="w-full h-48 object-cover" />
                </a>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 dark:invert">{card.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}