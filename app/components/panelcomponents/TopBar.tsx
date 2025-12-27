interface Props {
  autoRun: boolean;
  setAutoRun: (v: boolean) => void;
  build: () => void;
}

export default function TopBar({ autoRun, setAutoRun, build }: Props) {
  return (
    <div className="flex flex-col bg-slate-800 border-b border-slate-700 shadow-lg">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-slate-700">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="font-semibold">Instacks Editor</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-xs text-slate-400 font-mono">Ready</span>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={autoRun}
              onChange={(e) => setAutoRun(e.target.checked)}
              className="accent-blue-500"
            />
            Auto Run
          </label>
          <button
            onClick={build}
            className="bg-green-600 hover:bg-green-500 px-4 py-1.5 rounded text-xs font-semibold"
          >
            ▶ Run
          </button>
        </div>
      </div>
    </div>
  );
}
