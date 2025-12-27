interface Props {
  viewMode: "editor" | "preview";
  srcDoc: string;
  zoom: number;
  setZoom: (v: number | ((p: number) => number)) => void;
}

export default function PreviewPane({ viewMode, srcDoc, zoom, setZoom }: Props) {
  return (
    <div
      className={`${
        viewMode === "preview" ? "flex" : "hidden md:flex"
      } flex-1 bg-white relative`}
    >
      {/* Zoom Controls (ADDED) */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black border rounded shadow text-xs">
        <button
          onClick={() => setZoom((p) => Math.max(25, p - 10))}
          className="px-2 py-1 hover:bg-slate-800"
        >
          −
        </button>
        <button
          onClick={() => setZoom(100)}
          className="px-2 py-1 hover:bg-slate-800 font-mono"
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

      {/* Original iframe (UNCHANGED) */}
      <iframe
        sandbox="allow-scripts"
        srcDoc={srcDoc}
        className="w-full h-full border-0"
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}
