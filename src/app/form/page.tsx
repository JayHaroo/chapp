"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IoIosArrowBack, IoMdSend } from "react-icons/io";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import Link from "next/link";
 // Replace with actual WebSocket server URL
export default function Form() {
  const { address, isConnected } = useAccount();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [checked, setChecked] = useState(false);
  const [nickname, setNickname] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("wss://helix-caterwauling-passenger.glitch.me");

    ws.onopen = () => console.log("✅ WebSocket connected!");
    
    ws.onmessage = async (event) => {
      console.log("📩 Raw message received:", event.data);
      console.log("📩 Data type:", typeof event.data);
    
      if (event.data instanceof Blob) {
        try {
          const text = await event.data.text(); // Convert Blob to text
          console.log("📩 Converted Blob to text:", text);
          const newMessage = JSON.parse(text);
          setMessages((prev) => [...prev, newMessage]);
        } catch (error) {
          console.error("❌ JSON parsing error from Blob:", error);
        }
      } else if (typeof event.data === "string") {
        try {
          const newMessage = JSON.parse(event.data);
          setMessages((prev) => [...prev, newMessage]);
        } catch (error) {
          console.error("❌ JSON parsing error from string:", error);
        }
      } else {
        console.error("❌ Unexpected data type:", event.data);
      }
    };
    

    ws.onerror = (error) => console.error("❌ WebSocket error:", error);
    ws.onclose = () => console.log("❌ WebSocket disconnected");

    setSocket(ws);

    return () => ws.close(); // Cleanup on unmount
  }, []); // Empty dependency array ensures it runs only once

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      if (message.trim()) {
        const msgObj = {
          sender: checked && nickname ? nickname : address || "Anonymous",
          text: message,
        };
        socket.send(JSON.stringify(msgObj));
        setMessage(""); // Clear input after sending
      }
    } else {
      console.error("⚠️ WebSocket not connected yet!");
    }
  };
  
  return (
    <div className="flex flex-col justify-center items-center mt-8 max-sm:justify-center max-sm:items-center">
      <div className="flex justify-evenly items-center w-[100vh] mb-5 md:w-[80vh] max-sm:w-[50vh] max-sm:align-middle">
        <ConnectButton />
        <Link href="/" className="flex flex-row items-center cursor-pointer">
          <IoIosArrowBack size={30} color="white" />
          <span>Go back</span>
        </Link>
      </div>

      <div className="flex max-sm:flex-col max-md:flex-col max-sm:items-center">
        {/* Chat Section */}
        <div className="h-[77vh] w-[100vh] rounded-2xl border-2 border-white m-5 p-4 text-center max-sm:w-[40vh] max-sm:align-middle">
          <div className="h-[90%] overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className="text-white text-left p-2 border-b border-gray-600"
                >
                  <p className="text-gray-400">{msg.sender}</p>
                  <p>{msg.text}</p>
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
        <div className="h-[77vh] w-[50vh] rounded-2xl border-2 border-white m-5 flex items-center justify-items-center max-sm:w-[40vh] max-sm:h-[30vh]">
          {isConnected ? (
            <div>
              <p className="text-white text-center text-[12px]">
                Connected with {address}
              </p>
              <div className="mt-4 flex align-middle justify-center items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Use Nickname
                </label>
              </div>

              {checked ? (
                <div className="flex self-center justify-center items-center">
                  <input
                    type="text"
                    className="w-[80%] h-[5vh] border-2 border-white rounded-4xl p-5 mt-4 mb-3 bg-black text-white flex justify-center"
                    placeholder="Type your nickname here..."
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col text-center w-full">
              <p className="text-gray-400 text-center align-middle content-center text-[2vh]">
                Not connected!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
