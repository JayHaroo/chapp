import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="bg-[url(/img/bg.jpg)] bg-cover bg-center h-screen w-screen">
        <div className="w-[450px] h-lvh bg-white rounded-md"></div>
      </div>
    </>
  );
}
