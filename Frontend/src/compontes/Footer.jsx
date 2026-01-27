import React from 'react';
import { Github, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">StudentHub</h3>
            <p className="text-gray-500 text-sm">Building the bridge between students and innovation.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-indigo-600">Discord Server</a></li>
              <li><a href="#" className="hover:text-indigo-600">Hackathons</a></li>
              <li><a href="#" className="hover:text-indigo-600">Showcase</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-indigo-600">Privacy</a></li>
              <li><a href="#" className="hover:text-indigo-600">Terms</a></li>
              <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-start">
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <Github className="text-gray-400 hover:text-black cursor-pointer" size={20} />
              <Twitter className="text-gray-400 hover:text-blue-400 cursor-pointer" size={20} />
              <MessageCircle className="text-gray-400 hover:text-[#5865F2] cursor-pointer" size={20} />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} StudentHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;