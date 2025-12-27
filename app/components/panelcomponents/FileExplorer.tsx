interface Props {
  files: { name: string }[];
  activeFile: string;
  setActiveFile: (f: string) => void;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  addFile: () => void;
  deleteFile: (f: string) => void;
}

export default function FileExplorer({
  files,
  activeFile,
  setActiveFile,
  isOpen,
  setIsOpen,
  addFile,
  deleteFile,
}: Props) {
  return (
    <>
      {/* FILE EXPLORER (UNCHANGED) */}
      <aside
        className={`fixed md:static w-56 h-full bg-slate-800 border-r border-slate-700 p-3 transition-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between mb-3">
          <span className="text-sm font-semibold">FILES</span>

          {/* Desktop add button (unchanged) */}
          <button
            onClick={addFile}
            className="hidden md:inline text-emerald-400"
          >
            +
          </button>
        </div>

        {files.map((f) => (
          <div
            key={f.name}
            onClick={() => {
              setActiveFile(f.name);
              setIsOpen(false);
            }}
            className={`flex justify-between px-2 py-1.5 rounded cursor-pointer ${
              activeFile === f.name
                ? "bg-slate-700 text-emerald-400"
                : "hover:bg-slate-700"
            }`}
          >
            <span className="truncate">{f.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteFile(f.name);
              }}
              className="text-red-400"
            >
              ✕
            </button>
          </div>
        ))}
      </aside>

      {/* ✅ MOBILE FLOATING ADD BUTTON (ADDED) */}
      <button
        onClick={addFile}
        className="md:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full
                   bg-emerald-500 text-white text-2xl shadow-lg
                   flex items-center justify-center hover:bg-emerald-400"
        aria-label="Add file"
      >
        +
      </button>
    </>
  );
}
