"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BellElectric,
  Calendar,
  ChevronDown,
  ChevronUp,
  Cigarette,
  Globe,
  Pill,
  MessageSquare,
  NotebookPen,
  Pencil,
  Stethoscope,
  X,
  Bell,
} from "lucide-react";

type Communication = "phone" | "sms" | "email";
type YesNo = "yes" | "no";

type PatientProfile = {
  name: string;
  agePronouns: string;
  ethnicity: string;
  mrn: string;
  dob: string;
  communication: Communication;
  language: string;
  translator: YesNo;
  caretaker: YesNo;
  smoker: string;
  diagnosis: string[];
  medications: Array<{ name: string; dose: string; source: string }>;
  considerations: string;
  monitoringStart: string;
  lastPracticeVisit: string;
};

const INITIAL_PROFILE: PatientProfile = {
  name: "Carlitos Alcaraz",
  agePronouns: "87 /non-binary/ he, she, they",
  ethnicity: "Black",
  mrn: "55878",
  dob: "15/04/1933",
  communication: "phone",
  language: "English",
  translator: "no",
  caretaker: "no",
  smoker: "Non-smoker",
  diagnosis: [
    "J45.51 Severe persistent asthma, (acute) exacerbation",
    "J45.991 Cough variant asthma",
    "J45.21 Mild intermit. Asthma, acute exacerbation",
  ],
  medications: [
    { name: "Budesonide", dose: "9mg once a day", source: "11/05/2022 - Medical record" },
    { name: "Ciclesonide", dose: "12mg three times a day", source: "11/05/2022 - Patient reported" },
    { name: "Fluticasone Propionate", dose: "up to 5x as needed", source: "11/05/2022 - Patient reported" },
  ],
  considerations: "Their dog snores like a human!",
  monitoringStart: "12/12/2022",
  lastPracticeVisit: "12/12/2022",
};

export function AlwaysOnPatientPanel() {
  const [profile, setProfile] = React.useState(INITIAL_PROFILE);
  const [isInfoOpen, setIsInfoOpen] = React.useState(true);
  const [isDiagnosisOpen, setIsDiagnosisOpen] = React.useState(false);
  const [isMedicationsOpen, setIsMedicationsOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(profile);
  const [isMounted, setIsMounted] = React.useState(false);

  const languageOptions = ["English", "Spanish", "French", "Portuguese"];

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  function openEdit() {
    setDraft(profile);
    setIsEditOpen(true);
  }

  function saveEdit() {
    setProfile(draft);
    setIsEditOpen(false);
  }

  const sectionMotion = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.22, ease: [0.2, 0.8, 0.2, 1] as const },
  };

  return (
    <>
      <aside className="w-full space-y-3">
        <section className="rounded-xl border border-numo-blue-400/10 bg-numo-gray-500">
          <div className="flex items-start justify-between gap-3 p-4">
            <div className="space-y-1">
              <p className="text-xl font-semibold text-numo-blue-900">{profile.name}</p>
              <p className="text-sm text-numo-blue-900">{profile.agePronouns}</p>
            </div>
            <button
              type="button"
              onClick={openEdit}
              className="inline-flex items-center gap-1 rounded-md border border-numo-blue-500/50 bg-background/80 px-2 py-1 text-xs font-medium text-numo-blue-900 transition hover:border-numo-teal-600/50 hover:bg-numo-teal-400/10"
            >
              <Pencil className="h-3.5 w-3.5 text-numo-blue-700" />
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-numo-blue-400/10 bg-numo-gray-500">
          <button
            type="button"
            onClick={() => setIsInfoOpen((value) => !value)}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
          >
            <span className="text-sm font-semibold text-numo-blue-900 ">Patient info</span>
            {isInfoOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <AnimatePresence initial={false}>
            {isInfoOpen ? (
              <motion.div {...sectionMotion} className="overflow-hidden">
                <div className="space-y-3 px-4 pb-4 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-numo-blue-500/15">
                      <NotebookPen className="h-3.5 w-3.5 text-numo-blue-800" />
                    </span>
                    <p>
                      <span className="font-semibold text-numo-blue-900">MRN: </span>
                      <span className="text-foreground">{profile.mrn}</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-numo-blue-500/15">
                      <Calendar className="h-3.5 w-3.5 text-numo-blue-800" />
                    </span>
                    <p>
                      <span className="font-semibold text-numo-blue-900">DOB: </span>
                      <span className="text-foreground">{profile.dob}</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-numo-teal-500/15">
                      <MessageSquare className="h-3.5 w-3.5 text-numo-teal-800" />
                    </span>
                    <p>
                      <span className="font-semibold text-numo-blue-900">Communication: </span>
                      <span className="text-foreground">
                        {profile.communication === "sms" ? "SMS" : profile.communication}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-numo-teal-500/15">
                      <Globe className="h-3.5 w-3.5 text-numo-teal-800" />
                    </span>
                    <div>
                      <p className="font-semibold text-numo-blue-900">Language:</p>
                      <p className="text-foreground">Languages: {profile.language}</p>
                      <p className="text-foreground">
                        Translator: {profile.translator === "yes" ? "Yes" : "No"}
                      </p>
                      <p className="text-foreground">
                        Caretaker: {profile.caretaker === "yes" ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-numo-orange-500/15">
                      <Cigarette className="h-3.5 w-3.5 text-numo-orange-800" />
                    </span>
                    <p>
                      <span className="font-semibold text-numo-blue-900">Smoker: </span>
                      <span className="text-foreground">{profile.smoker}</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-numo-yellow-500/20">
                      <BellElectric className="h-3.5 w-3.5 text-numo-yellow-900" />
                    </span>
                    <p>
                      <span className="font-semibold text-numo-blue-900">Considerations: </span>
                      <span className="text-foreground">{profile.considerations}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>

        <section className="rounded-xl border border-numo-blue-500/35 bg-numo-blue-400/5">
          <button
            type="button"
            onClick={() => setIsDiagnosisOpen((v) => !v)}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-numo-blue-900">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-numo-blue-500/20">
                <Stethoscope className="h-3.5 w-3.5 text-numo-blue-800" />
              </span>
              Diagnosis
            </span>
            {isDiagnosisOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <AnimatePresence initial={false}>
            {isDiagnosisOpen ? (
              <motion.div {...sectionMotion} className="overflow-hidden">
                <div className="space-y-2 px-4 pb-4">
                  {profile.diagnosis.map((item) => {
                    const [code, ...rest] = item.split(" ");
                    return (
                      <div key={item} className="rounded-xl  px-3 py-2 text-sm text-foreground">
                        <span className="font-semibold text-numo-warm-blue-400-blue-900">{code}</span> {rest.join(" ")}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>

        <section className="rounded-xl border border-numo-blue-500/35 bg-numo-blue-400/5">
          <button
            type="button"
            onClick={() => setIsMedicationsOpen((v) => !v)}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-numo-blue-900">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-numo-blue-500/20">
                <Pill className="h-3.5 w-3.5 text-numo-blue-800" />
              </span>
              Medications
            </span>
            {isMedicationsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <AnimatePresence initial={false}>
            {isMedicationsOpen ? (
              <motion.div {...sectionMotion} className="overflow-hidden">
                <div className="space-y-4 rounded-xl  px-4 py-2 pb-4 text-sm text-foreground">
                  {profile.medications.map((med) => (
                    <div key={med.name}>
                      <p className="text-sm font-semibold text-numo-blue-900">{med.name}</p>
                      <p className="text-sm text-foreground">{med.dose}</p>
                      <p className="text-sm text-muted-foreground">{med.source}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>

        <section className="space-y-3 rounded-xl border border-numo-blue-500/35 bg-numo-blue-400/5 p-4">
          <p className="text-sm">
            <span className="font-semibold text-numo-blue-900">Monitoring start: </span>
            <span className="text-foreground">{profile.monitoringStart}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-numo-blue-900">Last practice visit: </span>
            <span className="text-foreground">{profile.lastPracticeVisit}</span>
          </p>
        </section>
      </aside>

      {isEditOpen && isMounted
        ? createPortal(
            <div className="fixed inset-0 z-100 grid place-items-center bg-black/40 p-4">
              <div className="relative z-101 isolate flex max-h-[calc(100vh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border bg-background shadow-xl">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <h3 className="text-base font-semibold text-foreground">Edit Patient Profile</h3>
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    aria-label="Close edit dialog"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4 overflow-y-auto p-4">
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-foreground">Patient name</span>
                    <input
                      value={draft.name}
                      onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
                      className="w-full rounded-md border border-border bg-background px-3 py-2"
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-foreground">Age / pronouns</span>
                    <input
                      value={draft.agePronouns}
                      onChange={(event) =>
                        setDraft((prev) => ({ ...prev, agePronouns: event.target.value }))
                      }
                      className="w-full rounded-md border border-border bg-background px-3 py-2"
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-foreground">Smoker status</span>
                    <input
                      value={draft.smoker}
                      onChange={(event) => setDraft((prev) => ({ ...prev, smoker: event.target.value }))}
                      className="w-full rounded-md border border-border bg-background px-3 py-2"
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-foreground">Language preference</span>
                    <select
                      value={draft.language}
                      onChange={(event) => setDraft((prev) => ({ ...prev, language: event.target.value }))}
                      className="w-full rounded-md border border-border bg-background px-3 py-2"
                    >
                      {languageOptions.map((language) => (
                        <option key={language} value={language}>
                          {language}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-foreground">Considerations</span>
                    <textarea
                      value={draft.considerations}
                      onChange={(event) =>
                        setDraft((prev) => ({ ...prev, considerations: event.target.value }))
                      }
                      rows={3}
                      className="w-full resize-none rounded-md border border-border bg-background px-3 py-2"
                    />
                  </label>

                  <div>
                    <p className="mb-1 text-sm font-medium text-foreground">Preferred communication</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      {(["phone", "sms", "email"] as const).map((option) => (
                        <label key={option} className="inline-flex items-center gap-2">
                          <input
                            type="radio"
                            name="dialog-communication"
                            value={option}
                            checked={draft.communication === option}
                            onChange={() =>
                              setDraft((prev) => ({ ...prev, communication: option }))
                            }
                          />
                          <span className="capitalize">{option === "sms" ? "SMS" : option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 text-sm font-medium text-foreground">Translator needed?</p>
                    <div className="flex gap-4 text-sm">
                      {(["yes", "no"] as const).map((choice) => (
                        <label key={choice} className="inline-flex items-center gap-2">
                          <input
                            type="radio"
                            name="translator"
                            checked={draft.translator === choice}
                            onChange={() => setDraft((prev) => ({ ...prev, translator: choice }))}
                          />
                          <span className="capitalize">{choice}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 border-t border-border px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveEdit}
                    className="rounded-md bg-numo-blue-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-numo-blue-700"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
