export type ReportingStatus = "overdue" | "disconnected" | "unknown" | "restored" | "paused";

export type DeviceReportingRow = {
  patientId: string;
  clinic: string;
  device: string;
  reportingStatus: ReportingStatus;
  lastReport: string | null;
  clinicalStatus: "Not assessed" | "Deterioration documented";
};

export const QUEUE_AS_OF = "2026-11-10T20:00:00Z";
export const QUEUE_TIMEZONE = "America/Los_Angeles";

// All statuses are explicit synthetic fixtures, never inferred from elapsed time.
export const DEVICE_REPORTING_FIXTURES: readonly DeviceReportingRow[] = [
  { patientId: "SYN-001", clinic: "North Clinic", device: "Pulse oximeter", reportingStatus: "overdue", lastReport: "2026-11-10T18:00:00Z", clinicalStatus: "Not assessed" },
  { patientId: "SYN-002", clinic: "South Clinic", device: "Home spirometer", reportingStatus: "disconnected", lastReport: "2026-11-10T16:00:00Z", clinicalStatus: "Not assessed" },
  { patientId: "SYN-003", clinic: "North Clinic", device: "Pulse oximeter", reportingStatus: "unknown", lastReport: null, clinicalStatus: "Not assessed" },
  { patientId: "SYN-004", clinic: "South Clinic", device: "Home spirometer", reportingStatus: "restored", lastReport: "2026-11-10T19:55:00Z", clinicalStatus: "Not assessed" },
  { patientId: "SYN-005", clinic: "North Clinic", device: "Pulse oximeter", reportingStatus: "overdue", lastReport: "2026-11-10T17:30:00Z", clinicalStatus: "Deterioration documented" },
  { patientId: "SYN-006", clinic: "South Clinic", device: "Home spirometer", reportingStatus: "paused", lastReport: "2026-11-09T20:00:00Z", clinicalStatus: "Not assessed" },
];
