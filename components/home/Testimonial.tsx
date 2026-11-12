import Image from "next/image";

export default function Testimonial() {
  return (
    <section
      className="section testi text-center has-bg-image"
      style={{ backgroundImage: "url('/images/testimonial-bg.jpg')" }}
      aria-label="testimonials"
    >
      <div className="container">
        <div className="quote" aria-hidden="true">
          ”
        </div>

        <blockquote className="headline-2 testi-text">
          I wanted to thank you for inviting me down for that amazing dinner the other night. The food was
          extraordinary.
        </blockquote>

        <div className="wrapper">
          <div className="separator" />
          <div className="separator" />
          <div className="separator" />
        </div>

        <div className="profile">
          <Image src="/images/testi-avatar.jpg" width={100} height={100} alt="Sam Jhonson" className="img" />
          <p className="label-2 profile-name">Sam Jhonson</p>
        </div>
      </div>
    </section>
  );
}
