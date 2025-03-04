"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

export default function Form() {
    return (
        <>
        <div className="flex justify-center items-center mt-[2rem]">
            <div className="flex justify-evenly items-center w-[100vh]">
                <ConnectButton />
                <Link href="/">
                    <IoIosArrowBack size={30} color="white" />
                </Link>
            </div>
            
        </div>
        </>
    )
};