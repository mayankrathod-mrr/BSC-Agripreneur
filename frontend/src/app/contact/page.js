// frontend/src/app/contact/page.js
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", { name, email, message });
    setFeedback("✅ Thank you for your message! We’ll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-10 text-green-700">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Information Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                Get in Touch
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We’d love to hear from you! Whether you have a question about
                our products, pricing, or anything else, our team is ready to
                answer all your questions.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Our Office</h3>
                <p className="text-gray-600">
                  123 Agri Street, Farmville, India 12345
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
                <p>
                  <a
                    href="mailto:contact@agristore.com"
                    className="text-green-600 hover:underline"
                  >
                    contact@agristore.com
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
                <p className="text-gray-600 hover:text-green-600 transition">
                  +91 98765 43210
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-md space-y-5"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Send Us a Message
              </h2>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              >
                Submit
              </button>

              {feedback && (
                <p className="text-center text-green-700 font-medium pt-3">
                  {feedback}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
