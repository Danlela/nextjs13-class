"use client";

import HeaderTitle from "@/components/atoms/header-title/header-title";
import { Container } from "@mui/material";
import { useContext, useEffect } from "react";
import { ApplicationContext } from "@/context/application.provider";
import { ContactContext } from "@/context/contact.provider";
import ContactForm from "@/components/organisms/contact-form/contact-form";


export default function ContactTemplate() {
  const applicationContext = useContext(ApplicationContext);
  const contactContext = useContext(ContactContext);

  return (
    <Container>
      <HeaderTitle
        title="Contact Page"
        subtitle="Cette page est créée avec Material UI."/>
      <ContactForm/>
    </Container>
  );
}
