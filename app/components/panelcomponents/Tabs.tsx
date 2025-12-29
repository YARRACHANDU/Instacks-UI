import { getIcon } from "../../panel/[...id]/page";

interface Props {
  files: { name: string }[];
  activeFile: string;
  setActiveFile: (f: string) => void;
  selected: "white" | "black";
}

export default function Tabs({
  files,
  activeFile,
  setActiveFile,
  selected,
}: Props) {
  return (
    <div
      className={`flex border-b border-slate-700 overflow-x-auto ${
        selected === "white" ? "bg-white" : "bg-black"
      }`}
    >
      {files.map((f) => {
        const isActive = activeFile === f.name;

        return (
          <button
            key={f.name}
            onClick={() => setActiveFile(f.name)}
            className={`
              px-4 py-2 text-sm font-mono border-r border-slate-700
              transition-all duration-200
              ${
                isActive
                  ? selected === "white"
                    ? "bg-slate-200 text-black border-b-2 border-emerald-500"
                    : "bg-slate-800 text-white border-b-2 border-emerald-400"
                  : selected === "white"
                  ? "bg-white text-slate-600 hover:bg-slate-100"
                  : "bg-black text-slate-400 hover:bg-slate-900"
              }
            `}
          >
            {getIcon(f.name)} {f.name}
          </button>
        );
      })}
    </div>
  );
}
