"use client";

import * as React from "react";
import { Activity, ChevronDown, FilePlus2, NotebookPen, Pencil, Share2 } from "lucide-react";
import { PrimaryBtn, SecondaryBtn } from "@/components/ds/button";

type NoteType = "all" | "video";

type NoteItem = {
  id: string;
  author: string;
  time: string;
  text: string;
  dateLabel: string;
  type: NoteType;
};

const INITIAL_NOTES: NoteItem[] = [
  {
    id: "n1",
    author: "Brian Lauson",
    time: "9:12 AM",
    text: "Patient complains of intermittent headaches and dizziness. Symptoms have been occurring for the past 3 days, with no clear triggers identified.",
    dateLabel: "01/24/2022",
    type: "all",
  },
  {
    id: "n2",
    author: "Brian Lauson",
    time: "9:08 AM",
    text: "Spoke with patient about recent video consultation. Patient reports that the video quality was poor, making it difficult to communicate effectively. Suggested troubleshooting steps and offered a follow-up call if issues persist.",
    dateLabel: "01/24/2022",
    type: "video",
  },
  {
    id: "n3",
    author: "Brian Lauson",
    time: "9:07 AM",
    text: "Reviewed patient's medication list during video consultation. Noted that patient is currently taking medication X, which may contribute to dizziness. Advised patient to monitor symptoms and report any worsening or new side effects.",
    dateLabel: "01/24/2022",
    type: "all",
  },
  {
    id: "n4",
    author: "Mariana Krajcik",
    time: "11:32 AM",
    text: "Initial clinical assessment completed. Patient presents with symptoms consistent with viral infection. Recommended supportive care, including hydration and rest. Advised patient to seek medical attention if symptoms worsen or persist beyond 7 days.",
    dateLabel: "01/22/2022",
    type: "all",
  },
  {
    id: "n5",
    author: "Julian Beatty",
    time: "3:28 PM",
    text: "Service innitiation call, tablet working well, patient able to log in and navigate app. Scheduled follow-up for next week to check on progress.",
    dateLabel: "01/13/2022",
    type: "video",
  },
];

const DATE_VITALS: Record<string, string> = {
  "01/24/2022": "SpO2 91% | RR 22 | HR 98",
  "01/22/2022": "SpO2 94% | RR 18 | HR 84",
  "01/13/2022": "SpO2 96% | RR 16 | HR 78",
};
const DEFAULT_VITALS = "SpO2 93% | RR 20 | HR 88";

function getVitalsForDate(dateLabel: string) {
  return DATE_VITALS[dateLabel] ?? DEFAULT_VITALS;
}

function stripHtml(value: string) {
  if (typeof document === "undefined") {
    return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }

  const tmp = document.createElement("div");
  tmp.innerHTML = value;
  return tmp.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

function groupByDate(notes: NoteItem[]) {
  return notes.reduce<Record<string, NoteItem[]>>((acc, note) => {
    if (!acc[note.dateLabel]) acc[note.dateLabel] = [];
    acc[note.dateLabel].push(note);
    return acc;
  }, {});
}

export function NotesDemo() {
  const [notes, setNotes] = React.useState(INITIAL_NOTES);
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<NoteType>("all");
  const [authorFilter, setAuthorFilter] = React.useState("all");
  const [mode, setMode] = React.useState<"browse" | "compose">("browse");
  const [draftHtml, setDraftHtml] = React.useState("");
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const draftEditorRef = React.useRef<HTMLDivElement>(null);

  const authors = React.useMemo(
    () => [...new Set(notes.map((note) => note.author))].sort((a, b) => a.localeCompare(b)),
    [notes]
  );

  const filteredNotes = React.useMemo(
    () =>
      notes.filter((note) => {
        const matchesFilter = filter === "all" ? true : note.type === "video";
        const matchesAuthor = authorFilter === "all" ? true : note.author === authorFilter;
        const noteText = stripHtml(note.text).toLowerCase();
        const matchesQuery =
          query.trim().length === 0 ||
          noteText.includes(query.toLowerCase()) ||
          note.author.toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesAuthor && matchesQuery;
      }),
    [notes, filter, authorFilter, query]
  );

  const grouped = React.useMemo(() => groupByDate(filteredNotes), [filteredNotes]);
  const groupedEntries = React.useMemo(() => Object.entries(grouped), [grouped]);
  const editingNote = notes.find((n) => n.id === editingId) ?? null;

  React.useEffect(() => {
    if (mode !== "compose") return;

    const timeoutId = window.setTimeout(() => {
      draftEditorRef.current?.focus();

      const selection = window.getSelection();
      const range = document.createRange();
      if (selection && draftEditorRef.current) {
        range.selectNodeContents(draftEditorRef.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }, 180);

    return () => window.clearTimeout(timeoutId);
  }, [mode, editingId]);

  React.useEffect(() => {
    if (mode !== "compose" || !draftEditorRef.current) return;
    if (draftEditorRef.current.innerHTML === draftHtml) return;
    draftEditorRef.current.innerHTML = draftHtml;
  }, [draftHtml, mode]);

  React.useEffect(() => {
    if (mode !== "compose") return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      cancelCompose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode]);

  function openAddMode() {
    setEditingId(null);
    setDraftHtml("");
    setMode("compose");
  }

  function openEditMode(note: NoteItem) {
    setEditingId(note.id);
    setDraftHtml(note.text);
    setMode("compose");
  }

  function cancelCompose() {
    setMode("browse");
    setEditingId(null);
    setDraftHtml("");
  }

  function applyFormat(command: "bold" | "italic" | "underline" | "insertUnorderedList") {
    draftEditorRef.current?.focus();
    document.execCommand(command);
    setDraftHtml(draftEditorRef.current?.innerHTML ?? "");
  }

  function applyBlock(block: "p" | "h3") {
    draftEditorRef.current?.focus();
    document.execCommand("formatBlock", false, block);
    setDraftHtml(draftEditorRef.current?.innerHTML ?? "");
  }

  function saveNote() {
    const text = draftEditorRef.current?.innerHTML ?? draftHtml;
    const plainText = stripHtml(text);
    if (!plainText) return;

    if (editingId) {
      setNotes((prev) => prev.map((n) => (n.id === editingId ? { ...n, text } : n)));
    } else {
      const now = new Date();
      const time = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }).format(now);
      const dateLabel = new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }).format(now);

      setNotes((prev) => [
        {
          id: `n-${now.getTime()}`,
          author: "Curie Demo",
          time,
          text,
          dateLabel,
          type: "all",
        },
        ...prev,
      ]);
    }

    cancelCompose();
  }

  return (
    <div className="rounded-xl border border-border bg-muted/20 p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-wrap items-end gap-4">
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Search</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes"
              className="w-72 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-numo-blue-500"
            />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="font-medium">Filter</span>
            <span className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as NoteType)}
                className="h-10 min-w-44 appearance-none rounded-md border border-border bg-background px-3 pr-10 text-sm outline-none focus:border-numo-blue-500"
              >
                <option value="all">All Notes</option>
                <option value="video">Video Notes</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </span>
          </label>

          <label className="grid gap-2 text-sm">
            <span className="font-medium">Author</span>
            <span className="relative">
              <select
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
                className="h-10 min-w-48 appearance-none rounded-md border border-border bg-background px-3 pr-10 text-sm outline-none focus:border-numo-blue-500"
              >
                <option value="all">All authors</option>
                {authors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </span>
          </label>
        </div>

        <PrimaryBtn
          type="button"
          onClick={openAddMode}
          disabled={mode === "compose"}
          className="disabled:cursor-not-allowed disabled:opacity-45"
        >
          <NotebookPen className="h-4 w-4 transition-all duration-200 ease-out group-hover:scale-105 group-hover:opacity-95" />
          Add note
        </PrimaryBtn>
      </div>

      <div className="mb-5">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-numo-yellow-400/50 border border-numo-yellow-700 px-4 py-2 text-[12px] font-medium text-numo-blue-900">
          <Activity className="h-3 w-3" />
          <span>Latest vitals:</span>
          {groupedEntries.length > 0 ? getVitalsForDate(groupedEntries[0]![0]) : DEFAULT_VITALS}
        </p>
      </div>

      <div
        className={[
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out",
          mode === "compose" ? "mb-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
        aria-hidden={mode !== "compose"}
      >
        <div className="min-h-0">
          <div
            className={[
              "rounded-lg bg-numo-slate-400/70 px-3 py-3.5 transition duration-300 ease-out md:px-4 md:py-4",
              mode === "compose" ? "translate-y-0 scale-100" : "-translate-y-3 scale-[0.985]",
            ].join(" ")}
          >
            <p className="mb-3 text-sm text-muted-foreground">
              {editingNote
                ? `Editing: ${editingNote.author} ${editingNote.time}`
                : ""}
            </p>

            <div className="relative rounded-md bg-background px-4 py-3 pl-7">
              <span
                aria-hidden="true"
                className="absolute left-2.75 top-20 bottom-0 w-px border-l border-dashed border-numo-orange-500/50"
              />
              <span
                aria-hidden="true"
                className="absolute left-1.25 top-19 h-3.5 w-3.5 rounded-full border-4 border-numo-orange-700 bg-numo-slate-300/10 shadow-md"
              />
              <div className="mb-3 flex flex-wrap items-center gap-2 border-b border-border/30 pb-3">
                <button
                  type="button"
                  onClick={() => applyFormat("bold")}
                  className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-border bg-background px-2 text-sm font-semibold text-numo-warm-blue-700 hover:bg-numo-blue-50/50"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("italic")}
                  className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-border bg-background px-2 text-sm italic text-numo-warm-blue-700 hover:bg-numo-blue-50/50"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("underline")}
                  className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-border bg-background px-2 text-sm underline text-numo-warm-blue-700 hover:bg-numo-blue-50/50"
                >
                  U
                </button>
                <button
                  type="button"
                  onClick={() => applyBlock("h3")}
                  className="inline-flex h-8 items-center justify-center rounded-md border border-border bg-background px-2.5 text-xs font-semibold uppercase tracking-wide text-numo-warm-blue-700 hover:bg-numo-blue-50/50"
                >
                  Large
                </button>
                <button
                  type="button"
                  onClick={() => applyBlock("p")}
                  className="inline-flex h-8 items-center justify-center rounded-md border border-border bg-background px-2.5 text-xs font-semibold uppercase tracking-wide text-numo-warm-blue-700 hover:bg-numo-blue-50/50"
                >
                  Body
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("insertUnorderedList")}
                  className="inline-flex h-8 items-center justify-center rounded-md border border-border bg-background px-2.5 text-sm font-semibold text-numo-warm-blue-700 hover:bg-numo-blue-50/50"
                >
                  List
                </button>
              </div>
              {stripHtml(draftHtml).length === 0 ? (
                <span className="pointer-events-none absolute left-7 top-17 text-lg text-muted-foreground">
                  Write a note
                </span>
              ) : null}
              <div
                ref={draftEditorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setDraftHtml(e.currentTarget.innerHTML)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    saveNote();
                  }
                }}
                className="min-h-18 w-full bg-transparent text-lg leading-6 text-numo-warm-blue-900 outline-none [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:ml-5 [&_ul]:list-disc"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/30 pt-4">
              <p className="text-sm text-foreground">Press Enter to save note • Press Shift+Enter for a new line • Press Esc to discard.</p>
              <div className="flex flex-nowrap items-center gap-3">
              <SecondaryBtn type="button" onClick={cancelCompose} className="shrink-0">
                Cancel
              </SecondaryBtn>
              <PrimaryBtn
                type="button"
                onClick={saveNote}
                disabled={stripHtml(draftHtml).length === 0}
                className="shrink-0 px-8 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save
              </PrimaryBtn>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={[
          "transition-all duration-300 ease-out",
          mode === "compose" ? "translate-y-1 opacity-85 " : "translate-y-0 opacity-100 blur-0",
        ].join(" ")}
      >
        <div className="space-y-4 ">
          {groupedEntries.map(([dateLabel, dateNotes], groupIndex) => (
            <section key={dateLabel} className="rounded-lg bg-numo-slate-400/20 px-3 py-3.5 md:px-4 md:py-4">
              <div className="sticky top-0 z-10 -mx-2 mb-2.5 flex items-center justify-between gap-3 px-2 py-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="inline-flex items-center rounded-sm border border-numo-teal-600/50  px-3 py-1 text-sm font-semibold tracking-wide text-numo-teal-600">
                    {dateLabel}
                  </h3>
                  {groupIndex === 0 ? (
                    <span className="inline-flex items-right rounded-sm border border-numo-teal-600 bg-numo-teal-400/30 px-2 py-1 text-[11px] font-medium text-numo-teal-900">
                      Last note
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="space-y-0">
                {dateNotes.map((note, idx) => {
                  const previous = dateNotes[idx - 1];
                  const authorChanged = previous ? previous.author !== note.author : false;
                  const isLast = idx === dateNotes.length - 1;

                  return (
                    <article
                      key={note.id}
                      className={[
                        "relative rounded-md pl-7 py-4 text-numo-slate-800 transition-colors duration-150 hover:bg-numo-blue-500/10 last:pb-6",
                        authorChanged ? "mt-1 border-t border-dashed border-border/70 pt-4 " : "",
                      ].join(" ")}
                    >
                      <span
                        aria-hidden="true"
                        className={[
                          "absolute left-2.75 top-0 w-px border-l border-dashed border-numo-teal-300/30",
                          isLast ? "bottom-6" : "bottom-0",
                        ].join(" ")}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute left-1.25 top-[0.9rem] h-3.5 w-3.5 rounded-full border-2 border-white bg-numo-warm-blue-500 shadow-sm"
                      />
                      <div className="flex items-start justify-between gap-3 ">
                        <p className="text-sm font-semibold text-numo-warm-blue-700">{`${note.time}`} <span className="text-sm font-normal text-numo-warm-blue-700">{`${note.author}`}</span></p>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditMode(note)}
                            aria-label="Edit note"
                            title="Edit note"
                            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-1.5 py-0.5 text-[12px] text-muted-foreground hover:text-foreground sm:px-2"
                          >
                            <Pencil className="h-3 w-3" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            type="button"
                            aria-label="Share note"
                            title="Share note"
                            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-1.5 py-0.5 text-[11px] text-muted-foreground hover:text-foreground sm:px-2"
                          >
                            <Share2 className="h-3 w-3" />
                            <span className="hidden sm:inline">Share note</span>
                          </button>
                          <button
                            type="button"
                            aria-label="Add to monthly report"
                            title="Add to monthly report"
                            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-1.5 py-0.5 text-[11px] text-muted-foreground hover:text-foreground sm:px-2"
                          >
                            <FilePlus2 className="h-3 w-3" />
                            <span className="hidden sm:inline">Add to monthly report</span>
                          </button>
                        </div>
                      </div>
                      <div
                        className="mt-1 max-w-[78ch] text-md font-normal tracking-[0.012em] leading-7 text-numo-blue-700 antialiased [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:tracking-[0.01em] [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:ml-5 [&_ul]:list-disc [&_li]:mb-1"
                        dangerouslySetInnerHTML={{ __html: note.text }}
                      />
                    </article>
                  );
                })}
              </div>
            </section>
          ))}

          {groupedEntries.length === 0 ? (
            <div className="rounded-lg border border-border bg-background px-4 py-6 text-sm text-muted-foreground">
              No notes match your search/filter.
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex justify-end">
          <div className="inline-flex overflow-hidden rounded-md border border-border text-sm">
            <button type="button" className="px-3 py-1 text-muted-foreground hover:bg-muted/50">Prev</button>
            <button type="button" className="bg-numo-blue-800 px-3 py-1 text-white">1</button>
            <button type="button" className="px-3 py-1 hover:bg-muted/50">2</button>
            <button type="button" className="px-3 py-1 hover:bg-muted/50">3</button>
            <button type="button" className="px-3 py-1 text-muted-foreground hover:bg-muted/50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
