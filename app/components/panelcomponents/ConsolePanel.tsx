"use client"
import { Trash2 } from "lucide-react";

interface Props {
  logs: any[];
  clearLogs: () => void;
  selected:"white"| "black";
}

export default function ConsolePanel({ logs, clearLogs,selected }: Props) {
  return (
    <div className={`h-36 ${selected==="white"?"bg-white":"bg-black"}   border-t border-slate-700 flex flex-col`}>
      <div className={`flex justify-between px-3 py-1 ${selected==="white"?"bg-white text-black":"bg-black text-white"} border-b border-slate-700 font-semibold`}>
        <span>Console</span>
        <button
  onClick={clearLogs}
  className="text-red-400 hover:text-red-500 transition"
  title="Clear logs"
>
  <Trash2 size={18} />
</button>

      </div>

     <div className="flex-1 overflow-auto px-3 py-2 font-mono text-xs">
  {logs.length === 0 && (
    <p
      className={`italic ${
        selected === "white"
          ? "text-slate-500"
          : "text-slate-400"
      }`}
    >
      Editor ready
    </p>
  )}

  {logs.map((l, i) => (
    <div
      key={i}
      className={`${
        selected === "white" ? "text-black" : "text-white"
      }`}
    >
      {l.message}
    </div>
  ))}
</div>

    </div>
  );
}
