import { getIcon } from "../../panel/[...id]/page";

interface Props {
  files: { name: string }[];
  activeFile: string;
  setActiveFile: (f: string) => void;
  selected:"white" |"black";
}

export default function Tabs({ files, activeFile, setActiveFile,selected }: Props) {
  return (
    <div className={`flex  ${selected==="white"?"bg-white":"bg-black"} border-b border-slate-700 overflow-x-auto`}>
      {files.map((f) => (
       <button
  key={f.name}
  onClick={() => setActiveFile(f.name)}
  className={`px-4 py-2 text-sm font-mono border-r border-slate-700 transition-colors
    ${
      activeFile === f.name
        ? `${
            selected === "white"
              ? "bg-black text-white"
              : "bg-white text-black"
          } border-b-2 border-emerald-400`
        : " text-white"
    }
  `}
>
  {getIcon(f.name)} {f.name}
</button>

      ))}
    </div>
  );
}
