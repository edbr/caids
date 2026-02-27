"use client";

import * as React from "react";
import { FilePlus2, NotebookPen, Plus } from "lucide-react";
import { PrimaryBtn, SecondaryBtn } from "@/components/ds/button";

export function DSNotesAddButtonDemo() {
  const icons = [
    { id: "notebook", label: "NotebookPen", Icon: NotebookPen },
    { id: "plus", label: "Plus", Icon: Plus },
    { id: "file-plus", label: "FilePlus2", Icon: FilePlus2 },
  ] as const;

  const [selectedIconId, setSelectedIconId] = React.useState<(typeof icons)[number]["id"]>(
    "notebook"
  );
  const selected = icons.find((i) => i.id === selectedIconId) ?? icons[0];

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5">
        <label htmlFor="notes-icon-select" className="text-xs text-muted-foreground">
          Icon
        </label>
        <select
          id="notes-icon-select"
          value={selectedIconId}
          onChange={(e) =>
            setSelectedIconId(e.target.value as (typeof icons)[number]["id"])
          }
          className="h-8 rounded-md border border-border bg-background px-2 pr-6 text-xs outline-none focus:border-numo-blue-500"
        >
          {icons.map((icon) => (
            <option key={icon.id} value={icon.id}>
              {icon.label}
            </option>
          ))}
        </select>
      </div>

      <PrimaryBtn>
        <selected.Icon className="h-4 w-4 transition-all duration-200 ease-out group-hover:scale-105 group-hover:opacity-95" />
        Add note
      </PrimaryBtn>

      <SecondaryBtn>
        <selected.Icon className="h-4 w-4 transition-all duration-200 ease-out group-hover:scale-105 group-hover:opacity-95" />
        Secondary button
      </SecondaryBtn>
    </div>
  );
}
