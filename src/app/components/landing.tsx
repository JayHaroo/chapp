import { IoArrowForwardCircle } from "react-icons/io5";

export default function Landing() {
  return (
    <>
      <div className="bg-[url(/img/bg.jpg)] bg-cover bg-center h-screen w-screen">
        <div className="w-[450px] h-lvh bg-white rounded-md text-black text-center justify-items-center content-center ">
          <div className="text-[2rem] font-bold">Geoined</div>
          <div className="font-light">Save your rights to a blockchain</div>
          <IoArrowForwardCircle size={60} className="cursor-pointer" />
        </div>
      </div>
    </>
  );
}
