"use client";

import { Alert, Box, Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "@/context/application.provider";
import { ContactContext } from "@/context/contact.provider";

const schema = yup
  .object({
    name: yup.string().min(2).max(20).required(),
    email: yup.string().email("This is not a valid e-mail.").required(),
    subject: yup.string().required(),
    message: yup.string().required(),
  })
  .required();

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface AlertMessage {
  severity: "success" | "info" | "warning" | "error";
  message: string;
}

export default function ContactForm() {
  const applicationContext = useContext(ApplicationContext);
  const contactContext = useContext(ContactContext);
  const [alertMessage, setAlertMessage] = useState<AlertMessage | undefined>(
    undefined
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ContactForm>({
    defaultValues: {
      name: applicationContext.name,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  function onFormSubmit(data: ContactForm) {
    applicationContext.setName(data.name);

    if (isValid) {
      fetch("/api/v1/contact", { method: "POST", body: JSON.stringify(data) })
        .then((response) => {
          if (response.ok) {
            setAlertMessage({
              severity: "success",
              message: "Your form was successfully submited",
            });
          } else {
            setAlertMessage({
              severity: "error",
              message: "An error occured while submitting your form",
            });
          }
        })
        .catch((error) => {
          setAlertMessage({
            severity: "error",
            message: "An error occured while submitting your form : ",
          });
        });

      useEffect(() => {
        applicationContext.setName(watch("name"));
      }, [watch("name")]);

      useEffect(() => {
        contactContext.setEmail(watch("email"));
      }, [watch("email")]);

      return (
        <>
          {alertMessage && (
            <Box sx={{ mb: 3 }}>
              <Alert severity={alertMessage.severity}>
                {alertMessage.message}
              </Alert>
            </Box>
          )}
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid container rowSpacing={3}>
              <Grid item sm={12}>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  required
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  id="email"
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  required
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  id="subject"
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  {...register("subject")}
                  error={!!errors.subject}
                  helperText={errors.subject?.message}
                  required
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  id="message"
                  label="Message"
                  variant="outlined"
                  multiline
                  fullWidth
                  {...register("message")}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                  required
                />
              </Grid>
              <Grid item sm={12}>
                <Button variant="contained" type="submit" disabled={!isValid}>
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </>
      ); 
    }
  } 
}
