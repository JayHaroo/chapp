"use client";

import Link from "next/link";
import Landing from "./landing";
import Form from "./form/page";

export default function Home() {
  return (
    <>
     <ul>
      <li>
        <Link href="/">
          <Landing />
        </Link>
      </li>
     </ul>
    </>
  );
}
