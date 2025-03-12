import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panalRef = useRef(null);
  const panelCloseRef = useRef(null);

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panalRef.current, { height: "70%",opacity:1 });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panalRef.current, { height: "0%", opacity: 0  });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]); // Dependency array must be an array

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen relative">
      <img src="/vmax.png" alt="VMax Logo" className="w-20 absolute left-5 top-5 " />

      <div className="w-screen h-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background"
        />
        <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
          <div className="h-[30%] p-5 bg-white relative">
            <h5 ref={panelCloseRef} onClick={()=>setPanelOpen(false)}  className="absolute opacity-0 top-1 right-3 text-2xl">
            <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h4 className="text-3xl font-semibold">Find a trip</h4>
            <form onSubmit={submitHandler}>
              <div className="line absolute h-16 w-1 top-[46%] left-10 bg-black rounded-2xl"></div>
              <input
                onClick={() => setPanelOpen(true)} // Fix: use function syntax
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
                type="text"
                placeholder="Where are you"
              />
              <input
                onClick={() => setPanelOpen(true)} // Fix: use function syntax
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
                type="text"
                placeholder="Enter your destination"
              />
            </form>
          </div>
          <div ref={panalRef} className="bg-white h-0">
            <LocationSearchPanel/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
