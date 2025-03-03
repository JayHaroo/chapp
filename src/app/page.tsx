import Link from "next/link";
import Landing from "./components/landing";

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
