"use client";

import { useEffect, useState } from "react";
import TopBar from "../../components/panelcomponents/TopBar";
import MobileViewToggle from "../../components/panelcomponents/MobileViewToggle";
import Tabs from "../../components/panelcomponents/Tabs";
import EditorPane from "../../components/panelcomponents/EditorPane";
import PreviewPane from "../../components/panelcomponents/PreviewPane";
import ConsolePanel from "../../components/panelcomponents/ConsolePanel";
import Questions from "../../components/panelcomponents/questionpanel"
import { useParams } from "next/navigation";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";

export const getLang = (f: string) =>
  f.endsWith(".html") ? "html" : f.endsWith(".css") ? "css" : "javascript";

export const getIcon = (f: string) =>
  f.endsWith(".html") ? "🌐" : f.endsWith(".css") ? "🎨" : "⚡";

export default function InstacksEditor() {
  const [files, setFiles] = useState([{ name: "index.html" }, { name: "style.css" }, { name: "script.js" }]);
  const [activeFile, setActiveFile] = useState("index.html");
  const [isFileExplorerOpen, setIsFileExplorerOpen] = useState(false);
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [showConsole, setShowConsole] = useState(false);
  {/* props ki related state*/}
  const [selected, setSelected] = useState<"white" | "black">("white");

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [btnPos, setBtnPos] = useState({ x: 24, y: 16 });
const dragging = useRef(false);
const dragStart = useRef({ x: 0, y: 0 });
const moved = useRef(false);
const [editorWidth, setEditorWidth] = useState(600);
const [resizeEnabled, setResizeEnabled] = useState(false);
const isResizing = useRef(false);

  


  
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      const id = Number(Array.isArray(params.id) ? params.id[0] : params.id);
      setQuestionId(id);
      console.log("Question ID:", id);
    }
  }, [params]);

  const [contents, setContents] = useState<Record<string, string>>({
    "index.html": "<h1>Hello Online Editor 🚀</h1>",
    "style.css": "h1 { color: red; }",
    "script.js": "console.log('Editor ready');",
  });

  const [srcDoc, setSrcDoc] = useState("");
  const [autoRun, setAutoRun] = useState(true);
  const [logs, setLogs] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"editor" | "preview">("editor");
  const [zoom, setZoom] = useState(100);
  const [fontSize, setFontSize] = useState(14);

  const addFile = () => {
    const fileName = prompt("Enter file name");
    if (!fileName || files.some(f => f.name === fileName)) return;
    setFiles([...files, { name: fileName }]);
    setContents({ ...contents, [fileName]: "" });
    setActiveFile(fileName);
  };

  const deleteFile = (name: string) => {
    const htmlFiles = files.filter(f => f.name.endsWith(".html"));
    if (name.endsWith(".html") && htmlFiles.length === 1) return;
    setFiles(files.filter(f => f.name !== name));
  };

  const build = () => {
    setLogs([]);
    const html = Object.entries(contents).find(([k]) => k.endsWith(".html"))?.[1] ?? "";
    const css = Object.entries(contents).filter(([k]) => k.endsWith(".css")).map(([, v]) => v).join("\n");
    const js = Object.entries(contents).filter(([k]) => k.endsWith(".js")).map(([, v]) => v).join("\n");

    setSrcDoc(`<!DOCTYPE html>
<html>
<head><style>${css}</style></head>
<body>
${html}
<script>
(function(){
const send=(t,a)=>parent.postMessage({source:"iframe-console",type:t,message:a.join(" ")},"*");
["log","warn","error"].forEach(k=>{
 const o=console[k];
 console[k]=(...a)=>{send(k,a);o(...a);}
});
window.onerror=(m,s,l,c)=>send("error",[m+" ("+l+":"+c+")"]);
})();
</script>
<script>${js}</script>
</body></html>`);
  };
  const handlePointerDown = (e: React.PointerEvent) => {
  dragging.current = true;
  moved.current = false;
  dragStart.current = {
    x: e.clientX - btnPos.x,
    y: e.clientY - btnPos.y,
  };
};

const handlePointerMove = (e: React.PointerEvent) => {
  if (!dragging.current) return;

  moved.current = true;
  setBtnPos({
    x: e.clientX - dragStart.current.x,
    y: e.clientY - dragStart.current.y,
  });
};

const handlePointerUp = () => {
  dragging.current = false;
};


  useEffect(() => {
    if (!autoRun) return;
    const t = setTimeout(build, 300);
    return () => clearTimeout(t);
  }, [contents, autoRun]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.source === "iframe-console") {
        setLogs(l => [...l, e.data]);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden">
      <TopBar autoRun={autoRun} setAutoRun={setAutoRun} build={build} selected={selected} />
      <MobileViewToggle viewMode={viewMode} setViewMode={setViewMode} selected={selected} />
<button
  onClick={() =>
    setSelected((s) => (s === "black" ? "white" : "black"))
  }
  aria-label="Toggle theme"
  className={`
    fixed z-50
    bottom-6

    /* Mobile */
    right-1 -translate-x-1/2

    /* Desktop */
    lg:left-auto lg:right-6 lg:translate-x-0

    w-10 h-10
    rounded-full
    backdrop-blur
    shadow-lg

    flex items-center justify-center
    cursor-pointer
    transition-all duration-300
    hover:scale-105
    ${selected==="white"?"bg-white":"bg-black"}

  `}
>
  {selected === "black" ? (
    /* 🌙 Moon */
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white transition-transform duration-300"
    >
      <path d="M21 12.79A9 9 0 0111.21 3 
               7 7 0 1012 21 
               9 9 0 0021 12.79z" />
    </svg>
  ) : (
    /* ☀️ Sun */
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-black transition-transform duration-300"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )}
</button>





      <div className="flex flex-1 overflow-hidden">
        <Questions questionId={questionId ?? 0}  selected={selected}/>
      
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs files={files} activeFile={activeFile} setActiveFile={setActiveFile} selected={selected}/>

          <div className="flex flex-1 overflow-hidden">
            <EditorPane
              viewMode={viewMode}
              activeFile={activeFile}
              contents={contents}
              setContents={setContents}
              fontSize={fontSize}
              setFontSize={setFontSize}
              selected={selected}
            />
            <PreviewPane viewMode={viewMode} srcDoc={srcDoc} zoom={zoom} setZoom={setZoom} selected={selected} />
          </div>
          <button
  onClick={() => setShowConsole(prev => !prev)}
  className="px-3 py-1 bg-gray-800 text-white rounded text-sm hover:bg-gray-700 transition"
>
  {showConsole ? "Hide Console" : "Show Console"}
</button>


         {showConsole && (
  <ConsolePanel
    logs={logs}
    clearLogs={() => setLogs([])}
    selected={selected}
  />
)}

        </div>
      </div>
    </div>
  );
}
