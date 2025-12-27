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


export const getLang = (f: string) =>
  f.endsWith(".html") ? "html" : f.endsWith(".css") ? "css" : "javascript";

export const getIcon = (f: string) =>
  f.endsWith(".html") ? "🌐" : f.endsWith(".css") ? "🎨" : "⚡";

export default function InstacksEditor() {
  const [files, setFiles] = useState([{ name: "index.html" }, { name: "style.css" }, { name: "script.js" }]);
  const [activeFile, setActiveFile] = useState("index.html");
  const [isFileExplorerOpen, setIsFileExplorerOpen] = useState(false);
  const [questionId, setQuestionId] = useState<number | null>(null);
  
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
      <TopBar autoRun={autoRun} setAutoRun={setAutoRun} build={build} />
      <MobileViewToggle viewMode={viewMode} setViewMode={setViewMode} />

      <div className="flex flex-1 overflow-hidden">
        <Questions questionId={questionId ?? 0}/>
      
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs files={files} activeFile={activeFile} setActiveFile={setActiveFile} />

          <div className="flex flex-1 overflow-hidden">
            <EditorPane
              viewMode={viewMode}
              activeFile={activeFile}
              contents={contents}
              setContents={setContents}
              fontSize={fontSize}
              setFontSize={setFontSize}
            />
            <PreviewPane viewMode={viewMode} srcDoc={srcDoc} zoom={zoom} setZoom={setZoom} />
          </div>

          <ConsolePanel logs={logs} clearLogs={() => setLogs([])} />
        </div>
      </div>
    </div>
  );
}
