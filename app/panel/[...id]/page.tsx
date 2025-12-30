"use client";

import { useEffect, useState } from "react";
import TopBar from "../../components/panelcomponents/TopBar";
import MobileViewToggle from "../../components/panelcomponents/MobileViewToggle";
import Tabs from "../../components/panelcomponents/Tabs";
import EditorPane from "../../components/panelcomponents/EditorPane";
import PreviewPane from "../../components/panelcomponents/PreviewPane";
import ConsolePanel from "../../components/panelcomponents/ConsolePanel";
import Questions from "../../components/panelcomponents/questionpanel";
import { useParams } from "next/navigation";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import html2canvas from "html2canvas";
import questions from "../../questions/questions.json";

// ⬇️ ADDED: load Q data
import questionsData from "../../questions/questions.json";

export const getLang = (f: string) =>
  f.endsWith(".html") ? "html" : f.endsWith(".css") ? "css" : "javascript";

export const getIcon = (f: string) =>
  f.endsWith(".html") ? "🌐" : f.endsWith(".css") ? "🎨" : "⚡";

// ⬇️ CODE FORMATTING FUNCTIONS
const formatCode = (code: string, language: string): string => {
  if (language === "html") {
    return formatHTML(code);
  } else if (language === "css") {
    return formatCSS(code);
  } else if (language === "javascript") {
    return formatJS(code);
  }
  return code;
};

const formatHTML = (html: string): string => {
  let formatted = "";
  let indent = 0;
  const tab = "  ";
  
  html = html.replace(/>\s*</g, "><").trim();
  const tokens = html.split(/(<[^>]+>)/g).filter(Boolean);
  
  tokens.forEach(token => {
    if (token.match(/^<\/\w/)) {
      indent = Math.max(0, indent - 1);
    }
    
    if (token.trim()) {
      formatted += tab.repeat(indent) + token.trim() + "\n";
    }
    
    if (token.match(/^<\w[^>]*[^\/]>$/)) {
      indent++;
    }
  });
  
  return formatted.trim();
};

const formatCSS = (css: string): string => {
  let formatted = "";
  let indent = 0;
  const tab = "  ";
  
  css = css.replace(/\s*{\s*/g, " {\n").replace(/\s*}\s*/g, "\n}\n").replace(/\s*;\s*/g, ";\n");
  const lines = css.split("\n").filter(line => line.trim());
  
  lines.forEach(line => {
    const trimmed = line.trim();
    
    if (trimmed === "}") {
      indent = Math.max(0, indent - 1);
      formatted += tab.repeat(indent) + trimmed + "\n";
    } else if (trimmed.endsWith("{")) {
      formatted += tab.repeat(indent) + trimmed + "\n";
      indent++;
    } else if (trimmed) {
      formatted += tab.repeat(indent) + trimmed + "\n";
    }
  });
  
  return formatted.trim();
};

const formatJS = (js: string): string => {
  let formatted = "";
  let indent = 0;
  const tab = "  ";
  
  const lines = js.split("\n");
  
  lines.forEach(line => {
    const trimmed = line.trim();
    
    if (trimmed.startsWith("}") || trimmed.startsWith("]") || trimmed.startsWith(")")) {
      indent = Math.max(0, indent - 1);
    }
    
    if (trimmed) {
      formatted += tab.repeat(indent) + trimmed + "\n";
    }
    
    if (trimmed.endsWith("{") || trimmed.endsWith("[") || trimmed.endsWith("(")) {
      indent++;
    }
  });
  
  return formatted.trim();
};

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

  const question = questions.find(q => q.id === questionId) || null;
  const [scoreInfo, setScoreInfo] = useState<any>(null);

  // ⬇️ NEW: Format state
  const [isFormatted, setIsFormatted] = useState(false);
  const [originalContents, setOriginalContents] = useState<Record<string, string>>({});

  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      const id = Number(Array.isArray(params.id) ? params.id[0] : params.id);
      setQuestionId(id);
      console.log("Question ID:", id);
    }
  }, [params]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
  const [formatEnabled, setFormatEnabled] = useState(true);


  // --- Simple formatters for learning editor ---

const formatHTML = (html: string) => {
  return html
    .replace(/></g, ">\n<")
    .replace(/^\s*/gm, "")
    .trim();
};

const formatCSS = (css: string) => {
  return css
    .replace(/{/g, " {\n  ")
    .replace(/;/g, ";\n  ")
    .replace(/}/g, "\n}\n")
    .replace(/\n\s*\n/g, "\n")
    .trim();
};


  // ⬇️ ADDED: Load HTML/CSS/JS for that question ID
useEffect(() => {
  if (!questionId) return;

  const question = questionsData.find(q => q.id === questionId);
  if (!question?.code) return;

  setContents({
    "index.html": question.code.html,

    "style.css": question.code.css,

    "script.js": question.code.js || "// Write JS here",
  });
}, [questionId, formatEnabled]);

<<<<<<< HEAD
=======
    const loadedContents = {
      "index.html": question.code.html || "<!-- Write HTML here -->",
      "style.css": question.code.css || "/* Write CSS here */",
      "script.js": question.code.js || "// Write JS here"
    };

    setContents(loadedContents);
    setOriginalContents(loadedContents); // Store original for format toggle
    setIsFormatted(false); // Reset format state
>>>>>>> 344c161e7335806126559771e347f38eaca2a3d0


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
    const html = Object.entries(contents).find(([k]) => k.endsWith(".html"))?.[1] ?? "";
    const css = Object.entries(contents).filter(([k]) => k.endsWith(".css")).map(([, v]) => v).join("\n");
    const js = Object.entries(contents).filter(([k]) => k.endsWith(".js")).map(([, v]) => v).join("\n");

    setSrcDoc(`<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}
<script>
(function(){
const send=(t,a)=>parent.postMessage({source:"iframe-console",type:t,message:a.join(" ")},"*");
["log","warn","error"].forEach(k=>{
 const o=console[k];console[k]=(...a)=>{send(k,a);o(...a);} });
window.onerror=(m,s,l,c)=>send("error",[m+" ("+l+":"+c+")"]);
})();
</script>
<script>${js}</script></body></html>`);
  };

  // ⬇️ NEW: Toggle Format Function
  const toggleFormat = () => {
    if (!isFormatted) {
      // Format all files
      const formatted: Record<string, string> = {};
      Object.entries(contents).forEach(([filename, code]) => {
        formatted[filename] = formatCode(code, getLang(filename));
      });
      setOriginalContents({ ...contents }); // Save current state before formatting
      setContents(formatted);
      setIsFormatted(true);
    } else {
      // Restore original
      setContents(originalContents);
      setIsFormatted(false);
    }
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
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const container = document.getElementById('editor-preview-container');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
      if (newWidth > 20 && newWidth < 80) setEditorWidth(newWidth);
    };
    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, isMobile]);

  // ⛔ Block copy, paste, cut and right-click globally
  useEffect(() => {
    const prevent = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener("copy", prevent);
    window.addEventListener("cut", prevent);
    window.addEventListener("paste", prevent);
    window.addEventListener("contextmenu", prevent);

    return () => {
      window.removeEventListener("copy", prevent);
      window.removeEventListener("cut", prevent);
      window.removeEventListener("paste", prevent);
      window.removeEventListener("contextmenu", prevent);
    };
  }, []);

  // ⛔ Block keyboard shortcuts: Ctrl+V / Ctrl+C / Ctrl+X
  useEffect(() => {
    const keyBlock = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ["v", "c", "x", "V", "C", "X"].includes(e.key)
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("keydown", keyBlock);
    return () => document.removeEventListener("keydown", keyBlock);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden">
<<<<<<< HEAD
      <TopBar autoRun={autoRun} setAutoRun={setAutoRun} build={build} selected={selected} question={question} />

      
=======
      <TopBar 
        autoRun={autoRun} 
        setAutoRun={setAutoRun} 
        build={build} 
        selected={selected} 
        question={question} 
      />
>>>>>>> 344c161e7335806126559771e347f38eaca2a3d0
      
      {isMobile && (
        <MobileViewToggle viewMode={viewMode} setViewMode={setViewMode} selected={selected} />
      )}
      
      {/* Theme Toggle Button */}
      <button
        onClick={() => setSelected((s) => (s === "black" ? "white" : "black"))}
        aria-label="Toggle theme"
        className={`
          fixed z-50 bottom-6
          right-1 -translate-x-1/2
          lg:left-auto lg:right-6 lg:translate-x-0
          w-10 h-10 rounded-full backdrop-blur shadow-lg
          flex items-center justify-center cursor-pointer
          transition-all duration-300 hover:scale-105
          ${selected === "white" ? "bg-white" : "bg-black"}
        `}
      >
        {selected === "black" ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white transition-transform duration-300">
            <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21 9 9 0 0021 12.79z" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black transition-transform duration-300">
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
        <Questions questionId={questionId ?? 0} selected={selected} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs files={files} activeFile={activeFile} setActiveFile={setActiveFile} selected={selected} />

          <div id="editor-preview-container" className="flex flex-1 overflow-hidden relative">
            {isMobile ? (
              <>
                {viewMode === "editor" && (
                  <EditorPane
                    viewMode={viewMode}
                    activeFile={activeFile}
                    contents={contents}
                    setContents={setContents}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    selected={selected}
                    isFormatted={isFormatted}
                    toggleFormat={toggleFormat}
                  />
                )}
                {viewMode === "preview" && (
                  <PreviewPane viewMode={viewMode} srcDoc={srcDoc} zoom={zoom} setZoom={setZoom} selected={selected} />
                )}
              </>
            ) : (
              <>
                <div className="flex flex-col" style={{ width: `${editorWidth}%` }}>
                  <EditorPane
                    viewMode={viewMode}
                    activeFile={activeFile}
                    contents={contents}
                    setContents={setContents}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    selected={selected}
                    isFormatted={isFormatted}
                    toggleFormat={toggleFormat}
                  />
                </div>

                {!isMobile && (
                  <div
                    onMouseDown={handleMouseDown}
                    className={`w-1 bg-gray-700 hover:bg-blue-500 cursor-col-resize transition-colors ${isResizing ? 'bg-blue-500' : ''}`}
                    style={{ height: '100%', zIndex: 10 }}
                  />
                )}

                <div className="flex flex-col" style={{ width: `${100 - editorWidth}%` }}>
                  <PreviewPane viewMode={viewMode} srcDoc={srcDoc} zoom={zoom} setZoom={setZoom} selected={selected} />
                </div>

                {isResizing && (
                  <div className="absolute inset-0 z-20" style={{ cursor: 'col-resize' }} />
                )}
              </>
            )}
          </div>

          <button
            onClick={() => setShowConsole(prev => !prev)}
            className="px-3 py-1 bg-gray-800 text-white rounded text-sm hover:bg-gray-700 transition"
          >
            {showConsole ? "Hide Console" : "Show Console"}
          </button>

          {showConsole && (
            <ConsolePanel logs={logs} clearLogs={() => setLogs([])} selected={"white"} />
          )}
        </div>
      </div>
    </div>
  );
}