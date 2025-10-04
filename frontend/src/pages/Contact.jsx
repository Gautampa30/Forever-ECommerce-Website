import React, { useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Contact Form Section */}
        <div className="md:w-2/3">
          <Title text1="Contact" text2="Us" />
          <p className="mt-4 text-gray-600 mb-8">
            Have a question or feedback? We'd love to hear from you. Fill out
            the form below and we'll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information Section */}
        <div className="md:w-1/3 space-y-8">
          <img
            src={assets.contact_img}
            alt="Contact Us"
            className="w-full rounded-lg shadow-lg mb-8"
          />

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Store Location</h3>
              <p className="text-gray-600">
                123 Fashion Street
                <br />
                Mumbai, Maharashtra 400001
                <br />
                India
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
              <p className="text-gray-600">
                Email: support@fashionstore.com
                <br />
                Phone: +91 123 456 7890
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
              <p className="text-gray-600">
                Monday - Saturday: 10:00 AM - 8:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
              <div className="flex items-center gap-4">
                <img
                  src={assets.support_img}
                  alt="Support"
                  className="w-12 h-12"
                />
                <div>
                  <p className="font-medium">Need Help?</p>
                  <p className="text-gray-600">
                    Our support team is available 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
