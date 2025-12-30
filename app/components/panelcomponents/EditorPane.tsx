"use client";

import Editor from "@monaco-editor/react";
import { getLang, getIcon } from "../../panel/[...id]/page";

interface Props {
  viewMode: "editor" | "preview";
  activeFile: string;
  contents: Record<string, string>;
  setContents: (v: Record<string, string>) => void;
  fontSize: number;
  setFontSize: (v: number | ((p: number) => number)) => void;
  selected: "white" | "black";
  isFormatted: boolean;
  toggleFormat: () => void;
}

export default function EditorPane({
  viewMode,
  activeFile,
  contents,
  setContents,
  fontSize,
  setFontSize,
  selected,
  isFormatted,
  toggleFormat
}: Props) {
  return (
    <div
      className={`${
        viewMode === "editor" ? "flex" : "hidden md:flex"
      } flex-1 flex-col bg-white border-r border-slate-700`}
      style={{ resize: "horizontal", overflow: "auto", minWidth: "250px" }}
    >
      {/* Header */}
      <div className={`flex items-center justify-between ${selected==="white"?"bg-white text-black":"bg-black text-white"} border-b border-slate-700 px-3 py-2`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{getIcon(activeFile)}</span>
          <span className="text-sm font-mono truncate">
            {activeFile}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Format Button */}
          <button
            onClick={toggleFormat}
            className={`
              flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium
              transition-all duration-200
              ${isFormatted 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : selected === "white"
                  ? 'bg-slate-200 hover:bg-slate-300 text-black'
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              }
            `}
            title={isFormatted ? "Remove formatting" : "Format code"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3z"/>
              <path d="M12 12l9-4.5M12 12v9M12 12L3 7.5"/>
            </svg>
            {isFormatted ? "✓" : "Format"}
          </button>

          {/* Font size controls */}
          <div className={`flex items-center gap-1 ${selected==="white"?"bg-black text-white":"bg-white text-black"} rounded px-1 py-0.5 text-xs`}>
            <button
              onClick={() => setFontSize((p) => Math.max(10, p - 2))}
              className="px-1 hover:opacity-70"
            >
              −
            </button>
            <span className="font-mono">{fontSize}px</span>
            <button
              onClick={() => setFontSize((p) => Math.min(32, p + 2))}
              className="px-1 hover:opacity-70"
            >
              +
            </button>
          </div>

          <span className={`px-2 py-1 ${selected==="white"?"bg-black text-white":"bg-white text-black"} rounded text-xs uppercase font-semibold`}>
            {getLang(activeFile)}
          </span>
        </div>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="100%"
        theme={`${selected==="black"?"vs-dark":"vs-white"}`}
        language={getLang(activeFile)}
        value={contents[activeFile] || ""}
        onChange={(value) =>
          setContents({
            ...contents,
            [activeFile]: value ?? "",
          })
        }
        options={{
          fontSize,
          minimap: { enabled: false },
          wordWrap: "on",
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorSmoothCaretAnimation: "on",
          tabSize: 2,
          automaticLayout: true,
        }}
      />
    </div>
  );
}