"use client";

import { usePathname } from "next/navigation";
import ContactForm from "./ContactForm";

/** The footer's "Get in Touch" form — left off /contact, which already has the full form. */
export default function FooterContact() {
  if (usePathname() === "/contact") return null;
  return (
    <>
      <h2 className="mt-12 text-3xl font-bold tracking-[-0.02em] md:mt-16">Get in Touch</h2>
      <div className="mt-5">
        <ContactForm compact />
      </div>
    </>
  );
}
