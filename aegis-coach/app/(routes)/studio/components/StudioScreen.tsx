"use client";

import { useState, useTransition } from "react";
import { ToolProposalCard } from "@/components/aegis/ToolProposalCard";
import { AuditLogRow } from "@/components/aegis/AuditLogRow";
import { WizardShell } from "@/components/aegis/WizardShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buildMockCoachOutput } from "@/lib/coach/mock";
import type { CoachOutput } from "@/lib/coach/spec-schema";
import { CoachComposer } from "@/app/(routes)/studio/components/CoachComposer";
import { RecommendationPanel } from "@/app/(routes)/studio/components/RecommendationPanel";
import { ArgumentPanel } from "@/app/(routes)/studio/components/ArgumentPanel";
import { SpecPanel } from "@/app/(routes)/studio/components/SpecPanel";
import { EvidenceDrawer } from "@/app/(routes)/studio/components/EvidenceDrawer";
import { BuildPanel } from "@/app/(routes)/studio/components/BuildPanel";
import { PolicyPanel } from "@/app/(routes)/studio/components/PolicyPanel";

const quickPrompts = [
  "Design confirm wizard",
  "Switch vs radio for policy scope",
  "Add safe defaults",
  "Write engineer argument"
];

const patternCards = [
  {
    title: "Chat + Actions",
    description: "Use proposal cards and require confirmation before execution."
  },
  {
    title: "Confirm Wizard",
    description: "Review scope, impact, and an audit note in one controlled flow."
  },
  {
    title: "Policy Editor",
    description: "Keep scope and approval settings visible while drafting."
  },
  {
    title: "Evidence Drawer",
    description: "Keep claims and citations separate from the recommendation body."
  }
];

type GeneratedFile = {
  path: string;
  content: string;
};

export function StudioScreen() {
  const [prompt, setPrompt] = useState(
    "I need a security AI assistant that can suggest remediation and run playbooks."
  );
  const [evidenceMode, setEvidenceMode] = useState(true);
  const [approved, setApproved] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [output, setOutput] = useState<CoachOutput | null>(null);
  const [buildFiles, setBuildFiles] = useState<GeneratedFile[]>([]);
  const [buildError, setBuildError] = useState<string | null>(null);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleGenerate = () => {
    startTransition(() => {
      void (async () => {
        try {
          setGenerateError(null);
          const response = await fetch("/api/coach", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userPrompt: prompt,
              evidenceMode
            })
          });

          if (!response.ok) {
            throw new Error("Failed to generate coach output.");
          }

          const json = (await response.json()) as CoachOutput;
          setOutput(json);
          setApproved(false);
          setBuildFiles([]);
          setBuildError(null);
        } catch {
          setOutput(buildMockCoachOutput(prompt, evidenceMode));
          setApproved(false);
          setBuildFiles([]);
          setBuildError(null);
          setGenerateError(
            "The live coach route failed, so the studio fell back to local mock data."
          );
        }
      })();
    });
  };

  const handleBuild = async () => {
    if (!output || !approved) {
      return;
    }

    setIsBuilding(true);
    setBuildError(null);

    try {
      const response = await fetch("/api/build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          spec: output.spec
        })
      });

      if (!response.ok) {
        throw new Error("Build failed. The spec could not be converted into files.");
      }

      const json = (await response.json()) as { files?: GeneratedFile[] };
      setBuildFiles(json.files ?? []);
    } catch (error) {
      setBuildFiles([]);
      setBuildError(
        error instanceof Error
          ? error.message
          : "Build failed. Please try again."
      );
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <main className="app-shell">
      <div className="mx-auto max-w-[1440px]">
        <section className="hero-shell px-5 py-5 sm:px-6 sm:py-6">
          <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-2xl px-4 py-3">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/40 text-lg font-bold text-white">
                A
              </div>
              <div className="hidden gap-4 text-sm text-slate-400 sm:flex">
                <a href="#studio">Studio</a>
                <a href="#patterns">Patterns</a>
                <a href="#guardrails">Guardrails</a>
                <a href="#docs">Docs</a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary">
                My Workspace
              </Button>
              <Button size="sm" variant="outline">
                History
              </Button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                TS
              </div>
            </div>
          </div>

          <div
            className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_420px]"
            id="studio"
          >
            <div className="space-y-6">
              <div className="surface-card rounded-2xl p-6">
                <p className="muted-label">Aegis Studio</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Design safe security chat flows with guardrails and citations.
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                  Draft the workflow, generate recommendations, and keep evidence
                  available as supporting material instead of crowding the main
                  decision path.
                </p>
                {generateError ? (
                  <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                    {generateError}
                  </div>
                ) : null}
                <div className="mt-5">
                  <CoachComposer
                    evidenceMode={evidenceMode}
                    isPending={isPending}
                    prompt={prompt}
                    onEvidenceChange={setEvidenceMode}
                    onGenerate={handleGenerate}
                    onPromptChange={setPrompt}
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {quickPrompts.map((label) => (
                    <Button
                      key={label}
                      size="sm"
                      variant="secondary"
                      onClick={() => setPrompt(label)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="surface-card rounded-2xl p-5" id="patterns">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="muted-label">Pattern Starters</p>
                  <span className="text-xs font-medium text-slate-400">
                    Optional shortcuts
                  </span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {patternCards.map((card) => (
                    <Card key={card.title} className="rounded-2xl border-white/10 bg-white/5">
                      <CardContent className="space-y-2 p-5">
                        <p className="text-sm font-semibold text-white">{card.title}</p>
                        <p className="text-sm leading-6 text-slate-400">
                          {card.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {output ? (
                <Card className="rounded-2xl border-white/10 bg-white/5">
                  <CardContent className="space-y-5 p-5">
                    <div>
                      <p className="muted-label">Preview</p>
                      <h2 className="mt-2 text-xl font-semibold text-white">
                        Generated Workspace Preview
                      </h2>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <ToolProposalCard
                        risk="high"
                        summary="Assistant proposes a policy update, but execution is blocked until the confirm wizard captures scope, impact, and an audit note."
                        title="Policy Update Proposal"
                      />
                      <ToolProposalCard
                        risk="medium"
                        summary="Assistant drafts a remediation playbook and routes it into the output rail for recommendation, argument, and spec review."
                        title="Playbook Draft"
                      />
                    </div>
                    <AuditLogRow
                      action="Execution remains locked until approval"
                      actor="Studio policy"
                      status={approved ? "Approved" : "Pending"}
                    />
                  </CardContent>
                </Card>
              ) : (
                <div className="surface-card rounded-2xl p-5 text-sm leading-7 text-slate-300">
                  Generate a recommendation to reveal the workspace preview and
                  the coach output.
                </div>
              )}

              <div className="grid gap-6 lg:grid-cols-2">
                <PolicyPanel
                  evidenceMode={evidenceMode}
                  onEvidenceChange={setEvidenceMode}
                />
                <WizardShell />
              </div>
            </div>

            <div className="surface-card rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="muted-label">Outputs</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    Review before build
                  </h2>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEvidenceOpen((current) => !current)}
                >
                  {evidenceOpen ? "Hide Evidence" : "Open Evidence"}
                </Button>
              </div>

              {evidenceOpen ? (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                  {output ? (
                    <EvidenceDrawer output={output} />
                  ) : (
                    <div className="text-sm leading-6 text-slate-400">
                      {evidenceMode
                        ? "Generate a recommendation first, then review the evidence drawer."
                        : "Evidence mode is off. Turn it on before generating to retrieve sources."}
                    </div>
                  )}
                </div>
              ) : null}

              <Tabs defaultValue="recommendation">
                <TabsList className="mt-5 grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
                  <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
                  <TabsTrigger value="argument">Argument</TabsTrigger>
                  <TabsTrigger value="spec">Spec</TabsTrigger>
                  <TabsTrigger value="build">Build</TabsTrigger>
                </TabsList>
                <div className="mt-5">
                  <TabsContent value="recommendation">
                    {output ? (
                      <RecommendationPanel output={output} />
                    ) : (
                      <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
                        Recommendation output appears here after you generate.
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="argument">
                    {output ? (
                      <ArgumentPanel output={output} />
                    ) : (
                      <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
                        Engineer argument output appears here after you generate.
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="spec">
                    {output ? (
                      <SpecPanel output={output} />
                    ) : (
                      <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
                        Spec output appears here after you generate.
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="build">
                    <BuildPanel
                      approved={approved}
                      error={buildError}
                      files={buildFiles}
                      hasSpec={Boolean(output)}
                      isBuilding={isBuilding}
                      onApprove={() => setApproved(true)}
                      onBuild={() => {
                        void handleBuild();
                      }}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
