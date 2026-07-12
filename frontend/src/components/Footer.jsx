import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaDiscord } from 'react-icons/fa';
import logo from '../assets/logoDHP.png';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo & Brand */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-20 w-auto object-contain mx-auto md:mx-0" 
            />
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Belajar, Ngoding, Berkarya 
            </p>
          </div>

          {/* Social Media */}
          <div className="flex space-x-4">
            <a 
              href="https://www.facebook.com/profile.php?id=61550735349855&locale=id_ID" 
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-110 transform"
              aria-label="Facebook"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
            <a 
              href="https://discord.com/users/1384037671197741139" 
              className="text-gray-500 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-all hover:scale-110 transform"
              aria-label="Twitter"
            >
              <FaDiscord className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/zmnoo__/" 
              className="text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-all hover:scale-110 transform"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/daffahafisd11" 
              className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all hover:scale-110 transform"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          </div>

        </div>

        {/* Alamat & Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            📍 Timulyo, Genuk, Semarang, Jawa Tengah, Indonesia
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            © {new Date().getFullYear()} Daffa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;