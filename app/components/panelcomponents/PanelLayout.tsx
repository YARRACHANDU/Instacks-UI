"use client";

import { useState } from "react";
import EditorPane from "./EditorPane";

export default function PanelLayout() {
  const [editorWidth, setEditorWidth] = useState(50); // %

  const startResize = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = editorWidth;

    const onMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startX;
      const newWidth = startWidth + (delta / window.innerWidth) * 100;

      setEditorWidth(Math.min(80, Math.max(20, newWidth)));
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Editor */}
      <div
        className="h-full"
        style={{ width: `${editorWidth}%` }}
      >
        <EditorPane
          viewMode="editor"
          activeFile="index.tsx"
          contents={{ "index.tsx": "// Your code here" }}
          setContents={() => { }}
          fontSize={14}
          setFontSize={() => { }}
        />
      </div>

      {/* Drag Handle */}
      <div
        onMouseDown={startResize}
        className="w-1 bg-slate-700 cursor-col-resize hover:bg-slate-500"
      />

      {/* Preview */}
      <div className="flex-1 bg-slate-900">
        {/* Your preview panel */}
      </div>
    </div>
  );
}
