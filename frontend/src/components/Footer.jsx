import React from "react";
import YoumDropLogo from "../assets/YumDropLogo.svg";

function Footer() {
  return (
    <footer className="bg-[#000000] border-t border-gray-200">
      <div className="flex items-center lg:flex-1 mt-5 ">
        <img
          src={YoumDropLogo}
          alt="YumDrop Logo"
          className="h-10 md:h-12 w-auto"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center md:text-left">
          <div>
            <h4 className="font-semibold text-white mb-3">About</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Help</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 ">Follow Us</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />
        <p className="text-center text-sm text-white">© 2026 YumDrop</p>
      </div>
    </footer>
  );
}

export default Footer;
