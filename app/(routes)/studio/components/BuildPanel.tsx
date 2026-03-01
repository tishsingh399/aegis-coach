import { Button } from "@/components/ui/button";

type GeneratedFile = {
  path: string;
  content: string;
};

type BuildPanelProps = {
  hasSpec: boolean;
  approved: boolean;
  isBuilding: boolean;
  files: GeneratedFile[];
  error: string | null;
  onApprove: () => void;
  onBuild: () => void;
};

export function BuildPanel({
  hasSpec,
  approved,
  isBuilding,
  files,
  error,
  onApprove,
  onBuild
}: BuildPanelProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
        {hasSpec
          ? "Build stays locked until the spec is approved. This keeps the app aligned with the coach-first workflow."
          : "Generate a recommendation first. The build flow unlocks only after a valid spec exists."}
      </div>
      <div className="flex gap-3">
        <Button
          disabled={!hasSpec}
          variant={approved ? "secondary" : "default"}
          onClick={onApprove}
        >
          {approved ? "Spec Approved" : "Approve Spec"}
        </Button>
        <Button disabled={!approved || isBuilding} variant="outline" onClick={onBuild}>
          {isBuilding ? "Building..." : "Build Files"}
        </Button>
      </div>
      {error ? (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100">
          {error}
        </div>
      ) : null}
      {files.length > 0 ? (
        <div className="space-y-3">
          <p className="muted-label">Generated Files</p>
          {files.map((file) => (
            <div
              key={file.path}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-sm font-medium text-white">{file.path}</p>
              <pre className="mt-3 overflow-auto rounded-xl bg-[#080c1a] p-3 text-xs leading-6 text-slate-300">
                {file.content}
              </pre>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
