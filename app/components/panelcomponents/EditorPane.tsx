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
}

export default function EditorPane({
  viewMode,
  activeFile,
  contents,
  setContents,
  fontSize,
  setFontSize,
  selected
}: Props) {
  return (
    <div
      className={`${
        viewMode === "editor" ? "flex" : "hidden md:flex"
      } flex-1 flex-col bg-white border-r border-slate-700`}
      style={{ resize: "horizontal", overflow: "auto", minWidth: "250px" }} // ⭐ Added for resizing
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
          {/* Font size controls */}
          <div className={`flex items-center gap-1 ${selected==="white"?"bg-black text-white":"bg-white text-black"} rounded px-1 py-0.5 text-xs`}>
            <button
              onClick={() => setFontSize((p) => Math.max(10, p - 2))}
              className="px-1 hover:text-white"
            >
              −
            </button>
            <span className="font-mono">{fontSize}px</span>
            <button
              onClick={() => setFontSize((p) => Math.min(32, p + 2))}
              className="px-1 hover:text-white"
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
        theme="vs-dark"
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
