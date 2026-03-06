"use client";

import * as React from "react";

export type ConversationLine = {
  id: string;
  speaker: "Patient" | "Clinician";
  text: string;
};

const DEFAULT_LINES: ConversationLine[] = [
  { id: "c1", speaker: "Patient", text: "I had more shortness of breath this morning." },
  { id: "c2", speaker: "Clinician", text: "Thanks for sharing. Did it happen at rest or with activity?" },
  { id: "c3", speaker: "Patient", text: "Mostly when walking upstairs, and my cough increased." },
  { id: "c4", speaker: "Clinician", text: "Understood. We should keep your 3:00 PM follow-up and review inhaler use." },
  { id: "c5", speaker: "Patient", text: "Okay, I can do that. Should I log symptoms tonight too?" },
  { id: "c6", speaker: "Clinician", text: "Yes, please track symptoms and oxygen readings before bedtime." },
];

export function DSConversationModule({
  title = "Jane Mullgard",
  lines = DEFAULT_LINES,
  intervalMs = 3600,
  className,
}: {
  title?: string;
  lines?: ConversationLine[];
  intervalMs?: number;
  className?: string;
}) {
  const [conversationIndex, setConversationIndex] = React.useState(2);
  const conversationScrollRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setConversationIndex((prev) => {
        const next = prev + 1;
        return next > lines.length ? 2 : next;
      });
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [lines.length, intervalMs]);

  const visibleConversation = React.useMemo(
    () => lines.slice(0, conversationIndex),
    [lines, conversationIndex]
  );

  React.useEffect(() => {
    if (!conversationScrollRef.current) return;
    conversationScrollRef.current.scrollTo({
      top: conversationScrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [visibleConversation]);

  return (
    <div className={["rounded-lg bg-background/80 p-1.5", className ?? ""].join(" ")}>
      <div className="mb-2 flex items-center justify-center pb-1.5">
        <p className="text-sm font-semibold tracking-tight text-foreground">{title}</p>
      </div>
      <div ref={conversationScrollRef} className="h-60 space-y-5 overflow-y-auto pr-1">
        {visibleConversation.map((line) => {
          const isPatient = line.speaker === "Patient";
          const initials = isPatient ? "JM" : "SO";
          return (
            <div
              key={line.id}
              className={["conversation-line--enter flex items-end gap-2", isPatient ? "" : "justify-end"].join(" ")}
            >
              {isPatient ? (
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-numo-blue-700/20 bg-background text-[10px] font-semibold tracking-wide text-numo-blue-700">
                  {initials}
                </span>
              ) : null}

              <div className="relative max-w-[85%]">
                <div
                  className={[
                    "rounded-lg px-3 py-2 text-[13px] leading-[1.4]",
                    isPatient
                      ? "border border-numo-blue-700/10 bg-numo-gray-500 text-numo-blue-900"
                      : "border border-[#007AFF]/70 bg-[#007AFF] text-white",
                  ].join(" ")}
                >
                  {line.text}
                </div>
                <span
                  aria-hidden
                  className={[
                    "absolute bottom-2 h-2.5 w-2.5 rotate-45",
                    isPatient
                      ? "-left-1 border-l border-b border-numo-blue-700/10 bg-numo-gray-500"
                      : "-right-1 border-r border-b border-[#007AFF]/70 bg-[#007AFF]",
                  ].join(" ")}
                />
              </div>

              {!isPatient ? (
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#007AFF]/45 bg-[#007AFF]/10 text-[10px] font-semibold tracking-wide text-[#007AFF]">
                  {initials}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .conversation-line--enter {
          animation: bubble-enter 320ms ease-out both;
        }

        @keyframes bubble-enter {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
