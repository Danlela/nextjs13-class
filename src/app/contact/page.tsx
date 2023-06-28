import ContactProvider from "@/context/contact.provider";
import ContactTemplate from "@/components/templates/contact-template/contact-template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page",
  description: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <ContactProvider>
        <ContactTemplate />
      </ContactProvider>
    </>
  ); 
}
