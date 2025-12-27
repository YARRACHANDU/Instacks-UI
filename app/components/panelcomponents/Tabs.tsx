import { getIcon } from "../../panel/[...id]/page";

interface Props {
  files: { name: string }[];
  activeFile: string;
  setActiveFile: (f: string) => void;
}

export default function Tabs({ files, activeFile, setActiveFile }: Props) {
  return (
    <div className="flex bg-white border-b border-slate-700 overflow-x-auto">
      {files.map((f) => (
        <button
          key={f.name}
          onClick={() => setActiveFile(f.name)}
          className={`px-4 py-2 text-sm font-mono border-r border-slate-700 ${
            activeFile === f.name
              ? "bg-slate-900 text-white border-b-2 border-emerald-400"
              : "text-black"
          }`}
        >
          {getIcon(f.name)} {f.name}
        </button>
      ))}
    </div>
  );
}
