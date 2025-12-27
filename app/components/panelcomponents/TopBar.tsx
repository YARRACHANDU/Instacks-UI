"use client";

import { useState } from "react";
import {
  PlayIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/solid";

interface Props {
  autoRun: boolean;
  setAutoRun: (v: boolean) => void;
  build: () => void;
}

export default function TopBar({ autoRun, setAutoRun, build }: Props) {
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
    <div className="flex flex-col bg-white border-b border-slate-700 shadow-lg">
      <div className="flex items-center justify-between px-3 py-2">
       <div className="flex items-center gap-3">
  <div className="flex flex-row gap-1 items-center">
    <div className="w-3 h-3 rounded-full bg-red-500" />
    <div className="w-3 h-3 rounded-full bg-yellow-500" />
    <div className="w-3 h-3 rounded-full bg-green-500" />
  </div>

  <span className="font-semibold text-black">
    Instacks Editor
  </span>
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

            <span style={{color:'black'}}>Auto Run</span>
          </label>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="p-2 rounded bg-slate-700 hover:bg-slate-600"
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className="w-4 h-4 text-white" />
            ) : (
              <ArrowsPointingOutIcon className="w-4 h-4 text-white" />
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
