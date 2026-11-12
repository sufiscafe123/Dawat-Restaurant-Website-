"use client";

import type { FormEvent } from "react";
import { IoCalendarClearOutline, IoChevronDown, IoPersonOutline, IoTimeOutline } from "react-icons/io5";
import { Button } from "../Button";
import { PRIMARY_TEL, site } from "@/lib/site";

const partySizes = ["1 Person", "2 Person", "3 Person", "4 Person", "5 Person", "6 Person", "7 Person", "Family / Big Party"];

// 1 PM → 12 AM, matching opening hours.
const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour24 = 13 + i;
  const hour12 = hour24 % 12 || 12;
  const suffix = hour24 >= 24 || hour24 < 12 ? "am" : "pm";
  return `${String(hour12).padStart(2, "0")}:00 ${suffix}`;
});

const WHATSAPP_NUMBER = site.phones.primary.tel.replace(/\D/g, "");

/** Sends the booking details to the restaurant on WhatsApp, pre-filled. */
function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const field = (name: string) => String(data.get(name) ?? "").trim();

  const lines = [
    "Hello Dawat Restaurant, I would like to book a table.",
    `Name: ${field("name") || "-"}`,
    `Phone: ${field("phone") || "-"}`,
    `Guests: ${field("person")}`,
    `Date: ${field("date") || "-"}`,
    `Time: ${field("time")}`,
  ];
  const message = field("message");
  if (message) lines.push(`Note: ${message}`);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * @param standalone When true the form is a normal section; on the home page it
 * overlaps the testimonial above it.
 */
export default function Reservation({ standalone = false }: { standalone?: boolean }) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <section className={`reservation${standalone ? " reservation-standalone" : ""}`} id="reservation">
      <div className="container">
        <div className="form reservation-form bg-black-10">
          <form onSubmit={handleSubmit} className="form-left">
            <h2 className="headline-1 text-center">Online Reservation</h2>

            <p className="form-text text-center">
              Booking request: Call{" "}
              <a href={PRIMARY_TEL} className="link">
                {site.phones.primary.label}
              </a>{" "}
              or fill the form to reserve your table on WhatsApp
            </p>

            <div className="input-wrapper">
              <input type="text" name="name" placeholder="Your Name" autoComplete="name" required className="input-field" />
              <input type="tel" name="phone" placeholder="Phone Number" autoComplete="tel" required className="input-field" />
            </div>

            <div className="input-wrapper">
              <div className="icon-wrapper">
                <IoPersonOutline aria-hidden="true" />
                <select name="person" className="input-field" aria-label="Number of guests" defaultValue="2 Person">
                  {partySizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <IoChevronDown aria-hidden="true" />
              </div>

              <div className="icon-wrapper">
                <IoCalendarClearOutline aria-hidden="true" />
                <input
                  type="date"
                  name="date"
                  min={today}
                  aria-label="Reservation date"
                  required
                  className="input-field"
                  suppressHydrationWarning
                />
                <IoChevronDown aria-hidden="true" />
              </div>

              <div className="icon-wrapper">
                <IoTimeOutline aria-hidden="true" />
                <select name="time" className="input-field" aria-label="Reservation time">
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <IoChevronDown aria-hidden="true" />
              </div>
            </div>

            <textarea
              name="message"
              placeholder="Message or Special Requests (e.g. Birthday, Anniversary, Rooftop seating)"
              className="input-field"
            />

            <Button type="submit" label="Book A Table Instantly" variant="secondary" />
          </form>

          <div className="form-right text-center" style={{ backgroundImage: "url('/images/form-pattern.png')" }}>
            <h2 className="headline-1 text-center">Contact Us</h2>

            <p className="contact-label">Booking Request</p>

            <a href={PRIMARY_TEL} className="body-1 contact-number hover-underline">
              {site.phones.primary.label}
            </a>

            <div className="separator" />

            <p className="contact-label">Location</p>

            <address className="body-4">
              {site.address.line1}
              <br />
              {site.address.line2}
            </address>

            <p className="contact-label">Lunch &amp; Dinner Time</p>

            <p className="body-4">Daily : {site.hours} (Open Everyday)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
