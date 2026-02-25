import { DSPage } from "@/components/ds/page";
import { TabletAppointmentDemo } from "@/components/patterns/TabletAppointmentDemo";

export default function TabletAppointmentPage() {
  return (
    <DSPage
      title="Tablet Appointment"
      description="Prototype: minimize next appointment into nav appointment icon with gooey motion."
    >
      <TabletAppointmentDemo />
    </DSPage>
  );
}
