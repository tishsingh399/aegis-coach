type ChatMessageProps = {
  role: "assistant" | "user";
  children: React.ReactNode;
};

export function ChatMessage({ role, children }: ChatMessageProps) {
  return (
    <div
      className={`max-w-[80%] rounded-3xl px-5 py-4 text-sm leading-6 ${
        role === "assistant"
          ? "bg-white/10 text-slate-100"
          : "ml-auto bg-blue-500 text-white"
      }`}
    >
      {children}
    </div>
  );
}
