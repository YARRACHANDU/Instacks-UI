interface Props {
  logs: any[];
  clearLogs: () => void;
}

export default function ConsolePanel({ logs, clearLogs }: Props) {
  return (
    <div className="h-36 bg-black border-t border-slate-700 flex flex-col">
      <div className="flex justify-between px-3 py-1 bg-slate-800 text-xs">
        <span>Console</span>
        <button onClick={clearLogs} className="text-red-400">Clear</button>
      </div>

      <div className="flex-1 overflow-auto px-3 py-2 font-mono text-xs">
        {logs.length === 0 && <p className="text-slate-500">Editor ready</p>}
        {logs.map((l, i) => (
          <div key={i}>{l.message}</div>
        ))}
      </div>
    </div>
  );
}
