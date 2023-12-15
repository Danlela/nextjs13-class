import {
    GoogleReCaptchaProvider,
  } from 'react-google-recaptcha-v3';

  interface RecaptchaProps {
    children: React.ReactNode;
  }

  export default function ReCaptcha(props: RecaptchaProps) {
    return(
        <GoogleReCaptchaProvider reCaptchaKey="6LeWdvwmAAAAALwIWPAp1uqPGtNbMdH_tgGdEquQ">
            {props.children}
            </GoogleReCaptchaProvider>
    
    )
}