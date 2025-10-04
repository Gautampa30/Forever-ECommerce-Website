import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
        <div className="md:w-1/2">
          <Title text1="About" text2="Us" />
          <p className="mt-6 text-gray-600 leading-relaxed">
            Welcome to our fashion destination, where style meets comfort. Since
            our establishment in 2020, we've been dedicated to bringing you the
            latest trends in fashion while maintaining the highest standards of
            quality and customer service.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Our curated collection features a diverse range of clothing for men,
            women, and children, ensuring that everyone can find their perfect
            style with us.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src={assets.about_img}
            alt="About Us"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Mission & Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Our Mission & Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Quality First</h3>
            <p className="text-gray-600">
              We believe in providing our customers with the highest quality
              products that stand the test of time.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Sustainable Fashion</h3>
            <p className="text-gray-600">
              We're committed to reducing our environmental impact through
              responsible sourcing and sustainable practices.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Customer First</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority. We strive to provide
              exceptional service at every step.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Why Choose Us</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <img
              src={assets.quality_icon}
              alt="Quality"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h3 className="font-medium mb-2">Premium Quality</h3>
            <p className="text-sm text-gray-600">
              Hand-picked quality products
            </p>
          </div>
          <div className="text-center">
            <img
              src={assets.exchange_icon}
              alt="Exchange"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h3 className="font-medium mb-2">Easy Returns</h3>
            <p className="text-sm text-gray-600">7-day return policy</p>
          </div>
          <div className="text-center">
            <img
              src={assets.support_img}
              alt="Support"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h3 className="font-medium mb-2">24/7 Support</h3>
            <p className="text-sm text-gray-600">Round the clock assistance</p>
          </div>
          <div className="text-center">
            <img
              src={assets.star_icon}
              alt="Trust"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h3 className="font-medium mb-2">Trusted Brand</h3>
            <p className="text-sm text-gray-600">Loved by customers</p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
        <button
          onClick={() => (window.location.href = "/contact")}
          className="bg-black text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default About;
