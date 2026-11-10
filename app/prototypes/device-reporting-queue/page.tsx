import { DSPage } from "@/components/ds/page";
import { DeviceReportingQueue } from "@/components/patterns/DeviceReportingQueue";

export const metadata = { title: "Clinician device-reporting queue" };

export default function DeviceReportingQueuePage() {
  return (
    <DSPage title="Device reporting" hidePageIntro>
      <DeviceReportingQueue />
    </DSPage>
  );
}
