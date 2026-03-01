type AuditLogRowProps = {
  action: string;
  actor: string;
  status: string;
};

export function AuditLogRow({ action, actor, status }: AuditLogRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
      <div>
        <p className="font-medium text-white">{action}</p>
        <p className="text-slate-400">{actor}</p>
      </div>
      <span className="text-slate-300">{status}</span>
    </div>
  );
}
