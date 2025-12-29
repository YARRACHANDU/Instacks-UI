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
import html2canvas from "html2canvas";
import questions from "../../questions/questions.json";


// ⬇️ Newly Added Import
import questionsData from "../../questions/questions.json";

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
  const [selected, setSelected] = useState<"white" | "black">("black");
  const [editorWidth, setEditorWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [capturedImg, setCapturedImg] = useState<string | null>(null);

  const question =
  questions.find(q => q.id === questionId) || null;

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

  // ⬇️ Newly Added Effect (LOAD CODE FROM JSON)
  useEffect(() => {
    if (!questionId) return;
    const q = questionsData.find((item) => item.id === questionId);
    if (!q?.code) return;

    setContents({
      "index.html": q.code.html || "",
      "style.css": q.code.css || "",
      "script.js": q.code.js || ""
    });

    console.log("Code loaded for Question:", questionId);
  }, [questionId]);

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
const captureOutput = async () => {
  const iframe = document.getElementById("preview-iframe") as HTMLIFrameElement;
  if (!iframe) {
    alert("Preview not found");
    return;
  }

  const iframeDoc = iframe.contentDocument;
  if (!iframeDoc) {
    alert("Preview not ready");
    return;
  }

  const canvas = await html2canvas(iframeDoc.body, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
  });

  const img = canvas.toDataURL("image/png");
  setCapturedImg(img);
};
  const deleteFile = (name: string) => {
    const htmlFiles = files.filter(f => f.name.endsWith(".html"));
    if (name.endsWith(".html") && htmlFiles.length === 1) return;
    setFiles(files.filter(f => f.name !== name));
  };

  const build = () => {
    setLogs([]);
    const html = contents["index.html"];
    const css = contents["style.css"];
    const js = contents["script.js"];

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      if (!isResizing) return;
      const el = document.getElementById("editor-preview-container");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const w = ((e.clientX - rect.left) / rect.width) * 100;
      if (w > 20 && w < 80) setEditorWidth(w);
    };

    const up = () => setIsResizing(false);

    if (isResizing) {
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
      document.body.style.cursor = "col-resize";
    } else {
      document.body.style.cursor = "";
    }

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      document.body.style.cursor = "";
    };
  }, [isResizing, isMobile]);

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden">
<<<<<<< HEAD
      <TopBar autoRun={autoRun} setAutoRun={setAutoRun} build={build} selected={selected} question={question} />
      
      {/* Mobile View Toggle - Only visible on mobile */}
=======
      <TopBar autoRun={autoRun} setAutoRun={setAutoRun} build={build} selected={selected} />

>>>>>>> afdb679a031e36b2ad41c1fda2f60785a37770f2
      {isMobile && (
        <MobileViewToggle viewMode={viewMode} setViewMode={setViewMode} selected={selected} />
      )}

      <button
        onClick={() => setSelected((s) => (s === "black" ? "white" : "black"))}
        aria-label="Toggle theme"
        className={`fixed z-50 bottom-6 right-1 lg:right-6 w-10 h-10 rounded-full backdrop-blur shadow-lg flex items-center justify-center transition-all duration-300 ${selected==="white"?"bg-white":"bg-black"}`}
      >
        {selected === "black" ? (
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
            <path d="M21 12.79A9 9 0 0111.21 3A7 7 0 1012 21A9 9 0 0021 12.79z" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
            <circle cx="12" cy="12" r="4" />
          </svg>
        )}
      </button>

      <div className="flex flex-1 overflow-hidden">
        <Questions questionId={questionId ?? 0} selected={selected} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs files={files} activeFile={activeFile} setActiveFile={setActiveFile} selected={selected} />

          <div id="editor-preview-container" className="flex flex-1 overflow-hidden relative">
            <div className="flex flex-col" style={{ width: `${editorWidth}%` }}>
              <EditorPane
                viewMode={viewMode}
                activeFile={activeFile}
                contents={contents}
                setContents={setContents}
                fontSize={fontSize}
                setFontSize={setFontSize}
                selected={selected}
              />
            </div>

            {!isMobile && (
              <div
                onMouseDown={handleMouseDown}
                className={`w-1 bg-gray-700 hover:bg-blue-500 cursor-col-resize transition-colors ${isResizing ? "bg-blue-500" : ""}`}
                style={{ height: "100%" }}
              />
            )}

            <div className="flex flex-col" style={{ width: `${100 - editorWidth}%` }}>
              <PreviewPane srcDoc={srcDoc} viewMode={viewMode} zoom={zoom} setZoom={setZoom} selected={selected} />
            </div>

            {isResizing && (
              <div className="absolute inset-0 z-20" style={{ cursor: 'col-resize' }} />
            )}
          </div>
          

          <button
            onClick={() => setShowConsole(prev => !prev)}
            className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 text-sm"
          >
            {showConsole ? "Hide Console" : "Show Console"}
          </button>

          {showConsole && (
            <ConsolePanel
              logs={logs}
              clearLogs={() => setLogs([])}
              selected={"white"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
