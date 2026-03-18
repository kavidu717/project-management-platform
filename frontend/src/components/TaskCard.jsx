export default function TaskCard({ title, priority, status }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
          Priority: {priority}
        </span>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
          {status}
        </span>
      </div>
    </div>
  );
}