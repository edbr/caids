"use client";

import * as React from "react";
import { Activity, ChevronDown, FilePlus2, NotebookPen, Pencil, Plus, Share2 } from "lucide-react";

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
    time: "9:06 AM",
    text: "Patient complains of intermittent headaches and dizziness. Symptoms have been occurring for the past 3 days, with no clear triggers identified.",
    dateLabel: "January 24th, 2022",
    type: "all",
  },
  {
    id: "n2",
    author: "Brian Lauson",
    time: "9:08 AM",
    text: "Spoke with patient about recent video consultation. Patient reports that the video quality was poor, making it difficult to communicate effectively. Suggested troubleshooting steps and offered a follow-up call if issues persist.",
    dateLabel: "January 24th, 2022",
    type: "video",
  },
  {
    id: "n3",
    author: "Brian Lauson",
    time: "9:10 AM",
    text: "Reviewed patient's medication list during video consultation. Noted that patient is currently taking medication X, which may contribute to dizziness. Advised patient to monitor symptoms and report any worsening or new side effects.",
    dateLabel: "January 24th, 2022",
    type: "all",
  },
  {
    id: "n4",
    author: "Mariana Krajcik",
    time: "11:32 AM",
    text: "Initial clinical assessment completed. Patient presents with symptoms consistent with viral infection. Recommended supportive care, including hydration and rest. Advised patient to seek medical attention if symptoms worsen or persist beyond 7 days.",
    dateLabel: "January 22nd, 2022",
    type: "all",
  },
  {
    id: "n5",
    author: "Julian Beatty",
    time: "3:28 PM",
    text: "Service innitiation call, tablet working well, patient able to log in and navigate app. Scheduled follow-up for next week to check on progress.",
    dateLabel: "January 13th, 2022",
    type: "video",
  },
];

const DATE_VITALS: Record<string, string> = {
  "January 24th, 2022": "SpO2 91% | RR 22 | HR 98",
  "January 22nd, 2022": "SpO2 94% | RR 18 | HR 84",
  "January 13th, 2022": "SpO2 96% | RR 16 | HR 78",
  Today: "SpO2 93% | RR 20 | HR 88",
};

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
  const [draft, setDraft] = React.useState("");
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const authors = React.useMemo(
    () => [...new Set(notes.map((note) => note.author))].sort((a, b) => a.localeCompare(b)),
    [notes]
  );

  const filteredNotes = React.useMemo(
    () =>
      notes.filter((note) => {
        const matchesFilter = filter === "all" ? true : note.type === "video";
        const matchesAuthor = authorFilter === "all" ? true : note.author === authorFilter;
        const matchesQuery =
          query.trim().length === 0 ||
          note.text.toLowerCase().includes(query.toLowerCase()) ||
          note.author.toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesAuthor && matchesQuery;
      }),
    [notes, filter, authorFilter, query]
  );

  const grouped = React.useMemo(() => groupByDate(filteredNotes), [filteredNotes]);
  const groupedEntries = React.useMemo(() => Object.entries(grouped), [grouped]);
  const editingNote = notes.find((n) => n.id === editingId) ?? null;

  function openAddMode() {
    setEditingId(null);
    setDraft("");
    setMode("compose");
  }

  function openEditMode(note: NoteItem) {
    setEditingId(note.id);
    setDraft(note.text);
    setMode("compose");
  }

  function cancelCompose() {
    setMode("browse");
    setEditingId(null);
    setDraft("");
  }

  function saveNote() {
    const text = draft.trim();
    if (!text) return;

    if (editingId) {
      setNotes((prev) => prev.map((n) => (n.id === editingId ? { ...n, text } : n)));
    } else {
      const now = new Date();
      const time = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }).format(now);

      setNotes((prev) => [
        {
          id: `n-${now.getTime()}`,
          author: "Curie Demo",
          time,
          text,
          dateLabel: "Today",
          type: "all",
        },
        ...prev,
      ]);
    }

    cancelCompose();
  }

  return (
    <div className="rounded-xl border border-border bg-muted/20 p-6">


      {mode === "browse" ? (
        <>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-wrap items-end gap-6">
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

            <button
              type="button"
              onClick={openAddMode}
              className="group inline-flex items-center gap-1.5 rounded-md border border-numo-blue-500 bg-numo-blue-600 px-5 py-2 text-sm font-medium text-white transition-all duration-200 ease-out hover:border-numo-blue-400 hover:bg-numo-blue-600 hover:shadow-[0_0_0_1px_hsl(var(--numo-blue-400)/0.35),0_8px_18px_hsl(var(--numo-blue-500)/0.28)] active:opacity-95"
            >
              <NotebookPen className="h-4 w-4 transition-all duration-200 ease-out group-hover:scale-105 group-hover:opacity-95" />
              Add note
            </button>
          </div>

          <div className="space-y-4">
            {groupedEntries.map(([dateLabel, dateNotes]) => (
              <section key={dateLabel} className="rounded-lg border border-border bg-background px-3 py-3.5 md:px-4 md:py-4">
                <div className="sticky top-0 z-10 -mx-2 mb-2.5 flex items-center justify-between gap-3 border-b border-border/70 bg-background/95 px-2 py-1.5 backdrop-blur-sm">
                  <h3 className="text-md tracking-tight text-numo-teal-600">{dateLabel}</h3>
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-numo-blue-400/25 px-2 py-0.5 text-[11px] font-medium text-numo-blue-800">
                    <Activity className="h-3 w-3" />
                    Latest vitals: {DATE_VITALS[dateLabel] ?? "SpO2 -- | RR -- | HR --"}
                  </p>
                </div>
                <div className="space-y-0 divide-y divide-border/60">
                  {dateNotes.map((note, idx) => {
                    const previous = dateNotes[idx - 1];
                    const authorChanged = previous ? previous.author !== note.author : false;

                    return (
                    <article
                      key={note.id}
                      className={[
                        "text-numo-slate-800 py-3 first:pt-0 last:pb-0",
                        authorChanged ? "mt-1 border-t border-dashed border-border/70 pt-4" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-numo-blue-800">{`${note.author} ${note.time}`}</p>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditMode(note)}
                            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
                          >
                            <Pencil className="h-3 w-3" />
                            Edit
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
                          >
                            <Share2 className="h-3 w-3" />
                            Share note
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
                          >
                            <FilePlus2 className="h-3 w-3" />
                            Add to monthly report
                          </button>
                        </div>
                      </div>
                      <p className="mt-1 max-w-[80ch] text-sm leading-6 text-numo-slate-800">{note.text}</p>
                    </article>
                  )})}
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
        </>
      ) : (
        <>
          <div className="mb-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={cancelCompose}
              className="rounded-md border border-numo-blue-500 bg-background px-5 py-2 text-sm text-numo-blue-500 hover:bg-numo-blue-400/25"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveNote}
              disabled={draft.trim().length === 0}
              className="rounded-md bg-numo-blue-500 px-8 py-2 text-sm font-medium text-white hover:bg-numo-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save
            </button>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <h3 className="mb-3 text-3xl font-semibold text-numo-slate-900">
              {editingNote ? "Edit note" : "Add note"}
            </h3>

            {editingNote ? (
              <p className="mb-3 text-sm text-muted-foreground">
                Editing: {editingNote.author} {editingNote.time}
              </p>
            ) : null}

            <div className="flex items-center gap-3">
              <Plus className="h-5 w-5 text-numo-blue-500" />
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveNote();
                }}
                placeholder="Write a note"
                className="w-full rounded-md border border-numo-blue-400 bg-background px-3 py-2 text-sm outline-none focus:border-numo-blue-500"
                autoFocus
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Press Enter to save note</p>
          </div>
        </>
      )}
    </div>
  );
}
