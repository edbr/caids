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
  intervalMs = 2600,
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
    <div className={["rounded-lg border border-border bg-background/80 p-2.5", className ?? ""].join(" ")}>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-medium text-foreground">{title}</p>
      </div>
      <div ref={conversationScrollRef} className="h-36 space-y-1.5 overflow-y-auto pr-1">
        {visibleConversation.map((line) => {
          const isPatient = line.speaker === "Patient";
          return (
            <div
              key={line.id}
              className={[
                "max-w-[92%] rounded-md px-2 py-1.5 text-xs leading-5",
                isPatient
                  ? "border border-numo-blue-700/10 bg-numo-gray-500 text-numo-blue-900"
                  : "ml-auto border border-numo-blue-700/5 bg-numo-blue-500 text-numo-gray-400",
              ].join(" ")}
            >
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
