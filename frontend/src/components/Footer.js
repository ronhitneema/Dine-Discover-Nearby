import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 w-full">
      <div className="container flex flex-col md:flex-row justify-between mx-auto">
        {/* Contact Information */}
        <div className="flex flex-col items-center mb-8 md:mb-0 md:mr-12">
          <h2 className="mb-4 text-lg font-semibold -ml-35">Contact Us</h2>
          <p className="text-gray-400 ml-20">
            123 Main St
            <br />
            Anytown, USA 12345
            <br />
            (123) 456-7890
            <br />
            info@example.com
          </p>
        </div>

        {/* Social Media Handles */}
        <div className="flex items-center space-x-4">
        <a
            href="https://www.facebook.com"
            className="text-gray-400 hover:text-white hover:underline mr-3"
          >
            Facebook
          </a>
          <a
            href="https://www.twitter.com"
            className="text-gray-400 hover:text-white hover:underline mr-10"
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com"
            className="text-gray-400 hover:text-white hover:underline mr-20"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;