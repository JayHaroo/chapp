"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IoIosArrowBack, IoMdSend } from "react-icons/io";
import { useAccount } from "wagmi";
import { useState } from "react";
import Link from "next/link";
import { access } from "fs";

export default function Form() {
  const { address, isConnected } = useAccount();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]); // Store multiple messages

  const sendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, message]);
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="flex justify-evenly items-center w-[100vh] mb-5">
        <ConnectButton />
        <Link href="/" className="flex flex-row items-center cursor-pointer">
          <IoIosArrowBack size={30} color="white" />
          <span>Go back</span>
        </Link>
      </div>

      <div className="flex">
        {/* Chat Section */}
        <div className="h-[77vh] w-[100vh] rounded-2xl border-2 border-white m-5 p-4 text-center">
          <div className="h-[90%] overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className="text-white text-left p-2 border-b border-gray-600">
                  {address} : {msg}
                </div>
              ))
            ) : (
              <p className="text-gray-400">No messages yet</p>
            )}
          </div>
          <div className="flex items-center justify-center mt-4">
            <input
              type="text"
              className="w-[80%] h-[5vh] border-2 border-white rounded-4xl p-5 mr-2 mb-8 bg-black text-white"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Send on Enter
            />
            <IoMdSend size={30} className="cursor-pointer mb-8 text-white" onClick={sendMessage} />
          </div>
        </div>

        {/* Connection Status */}
        <div className="h-[77vh] w-[50vh] rounded-2xl border-2 border-white m-5 flex items-center justify-center">
          {isConnected ? (
            <p className="text-white text-center text-[2vh]">Connected with {address}</p>
          ) : (
            <p className="text-gray-400 text-center text-[2vh]">Not connected!</p>
          )}
        </div>
      </div>
    </div>
  );
}
