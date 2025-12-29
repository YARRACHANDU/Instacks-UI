"use client";

import { useState } from "react";
import {
  PlayIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface Props {
  autoRun: boolean;
  setAutoRun: (v: boolean) => void;
  build: () => void;
 selected: "white" | "black";
}

export default function TopBar({ autoRun, setAutoRun, build ,selected}: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);


  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
      <div
      className={`flex flex-col border-b border-slate-700 shadow-lg ${
        selected === "white" ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className="flex items-center justify-between px-3 py-2">
       <div className="flex items-center gap-3">
  

 <Link href="/problems">
  {selected === "white" ? (
    <Image
      src="/logo-dark.png"
      alt="logo"
      width={80}
      height={60}
      className="object-cover"
    />
  ) : (
    <Image
      src="/logo-white.png"
      alt="logo"
      width={80}
      height={60}
      className="object-cover"
    />
  )}
</Link>

</div>

        

        <div className="flex items-center gap-3">
          {/* Auto Run */}
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={autoRun}
              onChange={(e) => setAutoRun(e.target.checked)}
              className="accent-blue-500"
              
            />

            <span className={`${selected=="black"?"text-white":"text-black"}`}>Auto Run</span>
          </label>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="p-2 rounded bg-slate-700 hover:bg-slate-600"
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className={`w-4 h-4 ${selected=="black"?"text-white":"text-black"}`} />
            ) : (
              <ArrowsPointingOutIcon className={`w-4 h-4 ${selected=="black"?"text-white":"text-black"}`} />
            )}
          </button>

          {/* Run Button */}
          <button
            onClick={build}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-1.5 rounded text-xs font-semibold"
          >
            <PlayIcon className="w-4 h-4" />
            Run
          </button>
        </div>
      </div>
    </div>
  );
}
