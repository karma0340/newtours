
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                                <MapPin size={20} />
                            </div>
                            <span className="font-bold text-xl tracking-tight">NewTours</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Discover the world with NewTours. We provide the best travel experiences, curating unforgettable journeys that leave lasting memories.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link></li>
                            <li><Link href="/tours" className="text-gray-400 hover:text-white text-sm transition-colors">Tours</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Top Destinations */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Top Destinations</h3>
                        <ul className="space-y-3">
                            <li><Link href="/tours?destination=paris" className="text-gray-400 hover:text-white text-sm transition-colors">Paris, France</Link></li>
                            <li><Link href="/tours?destination=bali" className="text-gray-400 hover:text-white text-sm transition-colors">Bali, Indonesia</Link></li>
                            <li><Link href="/tours?destination=tokyo" className="text-gray-400 hover:text-white text-sm transition-colors">Tokyo, Japan</Link></li>
                            <li><Link href="/tours?destination=rome" className="text-gray-400 hover:text-white text-sm transition-colors">Rome, Italy</Link></li>
                            <li><Link href="/tours?destination=newyork" className="text-gray-400 hover:text-white text-sm transition-colors">New York, USA</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
                                <span>123 Travel Street, Adventure City, AC 56789</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone size={18} className="text-blue-500 shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail size={18} className="text-blue-500 shrink-0" />
                                <span>hello@newtours.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} NewTours. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm text-gray-500">
                        <Link href="/terms" className="hover:text-white">Terms</Link>
                        <Link href="/privacy" className="hover:text-white">Privacy</Link>
                        <Link href="/cookies" className="hover:text-white">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
