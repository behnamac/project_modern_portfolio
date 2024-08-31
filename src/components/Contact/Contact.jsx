import React, { useRef, useState } from "react";
import "./Contact.scss";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

const varients = {
  initial: {
    y: 500,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      straggerChildren: 0.1,
    },
  },
};

const phoneSvgVarients = {
  initial: {
    opacity: 1,
  },
  transition: { delay: 3, duration: 1 },
};
const formVarients = {
  initial: {
    opacity: 0,
  },
  whileInView: { opacity: 1 },
  transition: { delay: 4, duration: 1 },
};

const Contact = () => {
  const ref = useRef();
  const formRef = useRef();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_rfy7zn7",
        "template_75qof56",
        formRef.current,
        "Qm-xieQBwaaZLHAYh"
      )
      .then(
        () => {
          console.log("SUCCESS!");
          setSuccess(true);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setError(true);
        }
      );
  };

  const isInView = useInView(ref, { margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      className="contact"
      variants={varients}
      initial={varients.initial}
      whileInView={varients.animate}
    >
      <div className="textContainer">
        <motion.h1>Get In Touch</motion.h1>
        <motion.div className="item">
          <h2>Mail</h2>
          <span>hello@react.dev</span>
        </motion.div>
        <motion.div className="item">
          <h2>Address</h2>
          <span>123 Avenue street New York</span>
        </motion.div>
        <motion.div className="item">
          <h2>Phone</h2>
          <span>+1 234 5678</span>
        </motion.div>
      </div>
      <div className="formContainer">
        <motion.div
          className="phoneSvg"
          variants={phoneSvgVarients}
          initial={phoneSvgVarients.initial}
          animate={isInView && { opacity: 0 }}
          transition={phoneSvgVarients.transition}
        >
          <svg
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={isInView && { pathLength: 1 }}
              transition={{ duration: 1 }}
              d="M53.26 54.62a4.09 4.09 0 0 0 2.51-5.22l-1.36-3.87A4.1 4.1 0 0 0 49.18 43c-7.73 2.71-10.45-5-11.81-8.88S33.3 22.55 41 19.83a4.1 4.1 0 0 0 2.51-5.22l-1.36-3.87A4.1 4.1 0 0 0 37 8.23c-9.66 3.4-14.1 9.3-7.31 28.63S43.6 58 53.26 54.62z"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={isInView && { pathLength: 1 }}
              transition={{ duration: 1 }}
              d="M34.81 48.18A4 4 0 0 0 32 52a4 4 0 0 1-8 0 4 4 0 0 0-8 0 4 4 0 0 1-8 0"
            />
          </svg>
        </motion.div>
        <motion.form
          variants={formVarients}
          initial="initial"
          whileInView="whileInView"
          transition={formVarients.transition}
          ref={formRef}
          onSubmit={sendEmail}
        >
          <input type="text" required placeholder="Name" name="name" />
          <input type="text" required placeholder="Email" name="email" />
          <textarea rows={8} placeholder="Message" name="message" />
          <button>Submit</button>
          {success && "Success"}
          {error && "Error"}
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Contact;
