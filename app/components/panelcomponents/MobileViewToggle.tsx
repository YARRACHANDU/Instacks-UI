interface Props {
  viewMode: "editor" | "preview";
  setViewMode: (v: "editor" | "preview") => void;
}

export default function MobileViewToggle({ viewMode, setViewMode }: Props) {
  return (
    <div className="md:hidden flex bg-slate-800 border-b border-slate-700">
      <button
        onClick={() => setViewMode("editor")}
        className={`flex-1 py-2 ${
          viewMode === "editor" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-slate-400"
        }`}
      >
        📝 Editor
      </button>
      <button
        onClick={() => setViewMode("preview")}
        className={`flex-1 py-2 ${
          viewMode === "preview" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-slate-400"
        }`}
      >
        👁 Preview
      </button>
    </div>
  );
}
