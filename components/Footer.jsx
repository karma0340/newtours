import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0b1220] to-[#0f1a2e] text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 pb-16">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Link href="/">
                <Logo variant="light" className="scale-110 origin-left" />
              </Link>
            </div>

            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              Discover the majestic beauty of the Himalayas with curated journeys designed for the soul.
              We craft unforgettable adventure experiences with expertise and passion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">
              Quick Links
            </h3>

            <ul className="flex flex-col space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">
              Contact Us
            </h3>

            <ul className="space-y-5 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin size={18} className="text-blue-500 mt-1" />
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Shimla, Himachal Pradesh, India <br />
                  PIN: 171001
                </a>
              </li>

              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-blue-500" />
                <a
                  href="tel:+918580566099"
                  className="hover:text-white transition"
                >
                  +91 85805 66099 / +91 80919 66099
                </a>
              </li>

              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-blue-500" />
                <a
                  href="mailto:info.hikethehimalaya@gmail.com"
                  className="hover:text-white transition"
                >
                  info.hikethehimalaya@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Center Social Icons */}
        <div className="flex justify-center space-x-6 pb-10">
          {[
            { Icon: Facebook, color: "hover:bg-[#1877F2]", link: "#" },
            { Icon: Twitter, color: "hover:bg-[#1DA1F2]", link: "#" },
            {
              Icon: Instagram,
              color: "hover:bg-[#E4405F]",
              link: "#",
            },
            { Icon: Linkedin, color: "hover:bg-[#0A66C2]", link: "#" },
          ].map(({ Icon, color, link }, index) => (
            <a
              key={index}
              href={link}
              target={link !== "#" ? "_blank" : undefined}
              rel={link !== "#" ? "noopener noreferrer" : undefined}
              className={`w-10 h-10 flex items-center justify-center rounded-full bg-[#162235] ${color} transition-all duration-300 hover:scale-110`}
            >
              <Icon size={18} className="text-gray-300 hover:text-white" />
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-[#1f2c45] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Hike The Himalaya. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-white transition">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
