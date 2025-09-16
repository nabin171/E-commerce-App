// Contact.jsx
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import { toast } from "react-toastify";

const Contact = ({ onSubmitContact }) => {
  // simple local form state + validation
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmail = (s) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i.test(
      s
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill name, email and message.");
      return;
    }
    if (!isEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      // If you pass an onSubmitContact prop, call it
      if (onSubmitContact) {
        await onSubmitContact({ name, email, subject, message });
      } else {
        // fallback: simulate network
        await new Promise((r) => setTimeout(r, 900));
        toast.success("Message sent! We'll get back to you soon.");
      }

      // reset
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <MapPin className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Contact Us
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question, want to work together, or need help with an order?
            Send us a message and our team will respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/20">
              <h2 className="text-lg font-semibold mb-2">Get in touch</h2>
              <p className="text-sm text-gray-600 mb-4">
                We're here to help — email, call, or visit us at the address
                below.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <a
                      href="tel:+1234567890"
                      className="text-sm text-gray-700 hover:text-blue-600"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a
                      href="mailto:hello@yourdomain.com"
                      className="text-sm text-gray-700 hover:text-blue-600"
                    >
                      hello@yourdomain.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <address className="not-italic text-sm text-gray-700">
                      123 Commerce St, Suite 400
                      <br />
                      Kathmandu, Nepal
                    </address>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Hours</p>
                    <p className="text-sm text-gray-700">Mon–Fri: 9am — 6pm</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/20">
              <h3 className="text-sm font-semibold mb-3">Follow us</h3>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:scale-105 transition-transform"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-blue-600" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:scale-105 transition-transform"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-blue-600" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:scale-105 transition-transform"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-blue-600" />
                </a>
              </div>
            </div>

            {/* Map (optional) */}
            <div className="hidden lg:block bg-white/80 backdrop-blur-sm rounded-2xl p-0 overflow-hidden shadow-md border border-white/20 h-56">
              {/* Replace src with your real embed if desired */}
              <iframe
                title="company-location"
                src="https://maps.google.com/maps?q=Kathmandu&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Order / Partnership / Other"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    required
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-xl transform hover:scale-[1.02] transition"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? "Sending..." : "Send message"}
                  </button>

                  <p className="text-sm text-gray-500">
                    We'll respond within 24 hours.
                  </p>
                </div>
              </form>
            </div>

            {/* Small CTA / Additional info below form */}
            <div className="mt-6 text-sm text-gray-600">
              <p>
                Prefer phone? Call us at{" "}
                <a
                  href="tel:+1234567890"
                  className="text-blue-600 hover:underline font-medium"
                >
                  +1 (234) 567-890
                </a>
                . For partnership enquiries, please include company details and
                a brief summary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
