import PageTransition from "../components/layout/PageTransition";
import ContactCTA from "../components/home/ContactCTA";

export default function ContactPage() {
  return (
    <PageTransition className="pt-16">
      <ContactCTA />
    </PageTransition>
  );
}
