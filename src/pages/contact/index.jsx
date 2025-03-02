import { useState } from "react";
import Transition from "@/components/Transitions/Transition";
import SplitText from "@/components/SplitText/SplitText";
import Head from "next/head";
import Btn from "@/components/Btn/btn";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user types in the field
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async () => {
    // Check for empty fields
    const emptyFields = Object.entries(formData).filter(([key, value]) => !value.trim());
    if (emptyFields.length > 0) {
      setErrors({ ...errors, ...Object.fromEntries(emptyFields.map(([key]) => [key, 'Field is required'])) });
      setStatus('');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({ ...errors, email: 'Invalid email address' });
      setStatus('');
      return;
    }

    setStatus("Sending...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", service: "", message: "" });
      } else {
        const data = await response.json();
        setStatus(`Failed to send message: ${data.message}`);
      }
    } catch (error) {
      setStatus(`Failed to send message: ${error.message}`);
    }
    setTimeout(() => setStatus(""), 5000); // Clear the status message after 5 seconds
  };

  return (
    <>
      <Head>
        <title>Contact | Mugunth</title>
        <meta name="description" content="Get in touch with Mugunth for web development, design, or any project inquiries. Let's bring your ideas to life!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Mugunth, Contact Mugunth, Web Development, Freelance Developer, JavaScript, Python, Next.js, Portfolio" />
        <meta name="author" content="Mugunth" />
        
        <meta property="og:title" content="Mugunth | Contact" />
        <meta property="og:description" content="Reach out to Mugunth for your web development projects and ideas." />
        <meta property="og:image" content="/images/1.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mugunth.me/contact" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mugunth | Contact" />
        <meta name="twitter:description" content="Reach out to Mugunth for your web development projects and ideas." />
        <meta name="twitter:image" content="/images/1.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Transition>
        <div className="contact-container">
          <div className="contact-title">
            <h1>
              <SplitText text=" Have a Project in Mind?
             Drop Me a Mail" />
            </h1>
          </div>
          <hr className="contact-route-hr" />
          <section className="contact-form-container">
            <form className="contact-form">
              <div className="input">
                <label htmlFor="name">What&apos;s your Name?</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name..."
                  aria-label="Name"
                  required
                />

                  {errors.name && <p className="error">Please enter your name.</p>}
                <hr className="contact-hr" />
              </div>

              <div className="input">
                <label htmlFor="email">What&apos;s your Email?</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email..."
                  required
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <hr className="contact-hr" />
              </div>

              <div className="input">
                <label htmlFor="service">
                  What services are you looking for?
                </label>
                <input
                  type="text"
                  name="service"
                  id="service"
                  value={formData.service}
                  onChange={handleChange}
                  placeholder="Design, Development..."
                  required
                />
                {errors.service && <p className="error">{errors.service}</p>}
                <hr className="contact-hr" />
              </div>

              <div className="input">
                <label htmlFor="message">What&apos;s on your mind?</label>
                <br />
                <textarea
                  name="message"
                  id="message"
                  cols={30}
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  required
                ></textarea>
                {errors.message && <p className="error">{errors.message}</p>}
              </div>

              <div className="form-btn">
                <Btn onClick={handleSubmit}>
                  <p>Send Mail</p>
                </Btn>
              </div>
            </form>
            {status && (
              <div className={`status-message ${status.includes('successfully') ? 'success' : 'error'}`}>
                {status}
              </div>
            )}
          </section>
        </div>
      </Transition>
    </>
  );
}
