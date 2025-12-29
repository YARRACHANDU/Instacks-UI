interface Props {
  viewMode: "editor" | "preview";
  srcDoc: string;
  zoom: number;
  setZoom: (v: number | ((p: number) => number)) => void;
  selected:"white"|"black"
}

export default function PreviewPane({
  viewMode,
  srcDoc,
  zoom,
  setZoom,
  selected
}: Props) {
  const scale = zoom / 100;

  return (
    <div
      className={`${
        viewMode === "preview" ? "flex" : "hidden md:flex"
      } flex-1 relative bg-white overflow-hidden`}
    >
      {/* Zoom Controls */}
      <div className={`absolute top-3 right-3 z-10 flex items-center gap-1 ${selected==="white"?"bg-black ":"bg-black"} text-white rounded text-xs`}>
        <button
          onClick={() => setZoom((p) => Math.max(25, p - 10))}
          className="px-2 py-1 hover:bg-slate-800"
        >
          −
        </button>

        <button
          onClick={() => setZoom(100)}
          className="px-2 py-1 font-mono hover:bg-slate-800"
        >
          {zoom}%
        </button>

        <button
          onClick={() => setZoom((p) => Math.min(200, p + 10))}
          className="px-2 py-1 hover:bg-slate-800"
        >
          +
        </button>
      </div>

      {/* 🔥 Absolute scale container */}
      <div
        className="absolute inset-0 origin-top-left"
        style={{
          transform: `scale(${scale})`,
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
        }}
      >
        <iframe
  sandbox="allow-scripts allow-modals"
  srcDoc={srcDoc}
  className="w-full h-full border-0"
/>
      </div>
    </div>
  );
}
