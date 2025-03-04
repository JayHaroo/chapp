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
  const [messages, setMessages] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [nickname, setNickname] = useState("");

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
                <div
                  key={index}
                  className="text-white text-left p-2 border-b border-gray-600"
                >
                  {checked ? (
                    <p className="text-gray-400">{nickname}</p>
                  ) : (
                    <p className="text-gray-400">{address}</p>
                  )}
                  <p>{msg}</p>
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
            <IoMdSend
              size={30}
              className="cursor-pointer mb-8 text-white"
              onClick={sendMessage}
            />
          </div>
        </div>

        {/* Connection Status */}
        <div className="h-[77vh] w-[50vh] rounded-2xl border-2 border-white m-5 flex items-center justify-items-center">
          {isConnected ? (
            <div className="">
              <p className="text-white text-center text-[2vh]">
                Connected with {address}
              </p>
              <div className="mt-4 flex align-middle justify-center items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Use Nickname
                </label>
              </div>

              {checked ? (
                <div className="flex self-center justify-center items-center">
                  <input
                    type="text"
                    className="w-[80%] h-[5vh] border-2 border-white rounded-4xl p-5 mt-4 bg-black text-white flex justify-center"
                    placeholder="Type your nickname here..."
                    value={nickname}
                    onChange={() => setNickname(this.value)}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <p className="text-gray-400 text-center text-[2vh]">
              Not connected!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
