// Contact.jsx
import React, { useContext, useState } from "react";
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
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Contact = () => {
  const { backendUrl } = useContext(ShopContext);

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

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!isEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(backendUrl + "/api/contact", {
        name,
        email,
        subject,
        message,
      });
      toast.success(response.data.message || "Message sent successfully!");

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <MapPin className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Contact Us
          </h1>

          <p className="text-gray-700 max-w-2xl mx-auto">
            Have a question, want to work together, or need help with an order?
            Send us a message and our team will respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                Get in touch
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                We're here to help — email, call, or visit us at the address
                below.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-3 rounded-lg bg-gray-200">
                    <Phone className="w-5 h-5 text-gray-800" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Phone</p>
                    <a
                      href="tel:+1234567890"
                      className="text-sm text-gray-700 hover:text-gray-900"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-3 rounded-lg bg-gray-200">
                    <Mail className="w-5 h-5 text-gray-800" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Email</p>
                    <a
                      href="mailto:hello@yourdomain.com"
                      className="text-sm text-gray-700 hover:text-gray-900"
                    >
                      hello@yourdomain.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-3 rounded-lg bg-gray-200">
                    <MapPin className="w-5 h-5 text-gray-800" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Address</p>
                    <address className="not-italic text-sm text-gray-700">
                      123 Commerce St, Suite 400
                      <br />
                      Kathmandu, Nepal
                    </address>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-3 rounded-lg bg-gray-200">
                    <Clock className="w-5 h-5 text-gray-800" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Hours</p>
                    <p className="text-sm text-gray-700">Mon–Fri: 9am — 6pm</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <h3 className="text-sm font-semibold mb-3 text-gray-800">
                Follow us
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gray-800" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-gray-800" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-gray-800" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-800 mb-2"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 outline-none transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-800 mb-2"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-800 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Order / Partnership / Other"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 outline-none transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-800 mb-2"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-800 outline-none transition resize-none"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-700 transition transform hover:scale-[1.02]"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
