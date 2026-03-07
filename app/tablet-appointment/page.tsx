import { DSPage } from "@/components/ds/page";
import { TabletAppointmentDemo } from "@/components/patterns/TabletAppointmentDemo";

export default function TabletAppointmentPage() {
  return (
    <DSPage
      title="Tablet Appointment"
      description="Prototype: minimize next appointment into nav appointment icon with gooey motion."
      hideDescriptionOnMobile
      hidePageIntro
    >
      <section className="px-32  rounded-xl bg-muted/25 p-5 md:p-8">
      <TabletAppointmentDemo />
      </section>
    </DSPage>
  );
}
