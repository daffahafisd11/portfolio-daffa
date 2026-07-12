import React, { useState } from 'react';

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ===== AUTO DETECT IP =====
  const getApiUrl = () => {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8000/api/save-message.php';
    }
    return `http://${hostname}:8000/api/save-message.php`;
  };

  const API_URL = getApiUrl();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      console.log('Sending to:', API_URL);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      const data = await response.json();
      console.log('Response:', data);

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Gagal mengirim');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setErrorMessage('Tidak bisa terhubung ke server: ' + error.message);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Hubungi Saya</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Ada proyek atau ide? Yuk, ngobrol bareng!</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 border border-blue-200 dark:border-blue-500/20">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Email</h4>
                <p className="text-gray-600 dark:text-gray-400">daffahafisd10@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-cyan-500/50 transition-colors">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center flex-shrink-0 border border-cyan-200 dark:border-cyan-500/20">
                <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 0111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Lokasi</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Timulyo, Genuk, Semarang Jawa Tengah, Indonesia</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Anda"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Anda"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Pesan Anda"
                required
                rows="4"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
            
            {status === 'success' && (
              <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-500/20">
                Pesan berhasil dikirim!
              </div>
            )}
            
            {status === 'error' && (
              <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-500/20">
                ❌ {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;