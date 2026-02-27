type DSBreadcrumbProps = {
  sectionLabel?: string;
  patientName: string;
  current: string;
  age: string;
  gender: string;
  disease: string;
};

export function DSBreadcrumb({
  sectionLabel = "Patients",
  patientName,
  current,
  age,
  gender,
  disease,
}: DSBreadcrumbProps) {
  return (
    <div className="rounded-md border border-border bg-muted/30 px-3 py-2">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-muted-foreground">{sectionLabel}</span>
        <span className="text-muted-foreground/70">/</span>
        <span className="font-medium text-foreground">{patientName}</span>
        <span className="text-muted-foreground/70">/</span>
        <span className="rounded-full bg-numo-blue-500 px-2 py-0.5 font-medium text-white">
          {current}
        </span>
        <span className="text-muted-foreground/70">/</span>
        <span className="rounded-full bg-background px-2 py-0.5 text-muted-foreground">{age}</span>
        <span className="rounded-full bg-background px-2 py-0.5 text-muted-foreground">
          {gender}
        </span>
        <span className="rounded-full bg-background px-2 py-0.5 text-muted-foreground">
          {disease}
        </span>
      </div>
    </div>
  );
}
