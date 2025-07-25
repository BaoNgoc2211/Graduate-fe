"use client";
import Image from "next/image";
import React from "react";
import { assets } from "../../../public/assets";


const OurPolicy = () => {
  
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <Image src={assets.exchange_icon} width={50} height={50} className=" m-auto mb-5" alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>
      <div>
        <Image src={assets.quality_icon} width={50} height={50} className=" m-auto mb-5" alt="" />
        <p className="font-semibold">30 Days Return Policy</p>
        <p className="text-gray-400">We provide 14 days free return policy</p>
      </div>
      <div>
        <Image src={assets.support_img} width={50} height={50} className=" m-auto mb-5" alt="" />
        <p className="font-semibold">Best customer support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
