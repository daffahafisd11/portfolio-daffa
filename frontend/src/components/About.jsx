import React from 'react';

const About = ({ data }) => {
  const skills = [
  { name: 'HTML', value: 90, color: 'from-orange-500 to-orange-600' },
  { name: 'CSS', value: 85, color: 'from-blue-500 to-blue-600' },
  { name: 'JavaScript', value: 88, color: 'from-yellow-400 to-yellow-500' },
  { name: 'React', value: 70, color: 'from-cyan-400 to-cyan-600' },
  { name: 'Tailwind', value: 80, color: 'from-teal-400 to-teal-600' },
  { name: 'PHP', value: 85, color: 'from-purple-500 to-purple-600' },
  { name: 'Node.js', value: 65, color: 'from-green-500 to-green-600' },
  { name: 'MySQL', value: 75, color: 'from-amber-500 to-amber-600' },
  { name: 'Bootstrap', value: 85, color: 'from-purple-400 to-purple-600' },
  { name: 'SQL', value: 80, color: 'from-blue-600 to-blue-700' },
];
  
  return (
    <section id="about" className="section-padding bg-blue-50/50 dark:bg-blue-950/30 transition-colors duration-300">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Tentang Aku</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-5sm text-gray-700 dark:text-blue-200 leading-relaxed">
              Halo! Saya Daffa, pelajar kelas 3 SMK jurusan PPLG yang juga aktif sebagai developer di DBI TECH. Saya suka ngoding dan membantu klien mewujudkan ide mereka jadi website yang fungsional dan menarik.
              Di sekolah, saya belajar SQL, HTML, CSS, JavaScript, Bootstrap, dan PHP. Sisanya seperti React, Tailwind, dan Node.js saya pelajari otodidak karena saya suka eksplor hal baru.
              Meski masih pelajar, saya selalu berusaha kasih yang terbaik di setiap karya. Cita-cita saya jadi full-stack developer!
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-bold text-2xl text-blue-600 dark:text-blue-400">3+</h3>
                <p className="text-gray-700 dark:text-blue-300">Tahun Belajar</p>
              </div>
              <div className="p-4 bg-cyan-100 dark:bg-cyan-900/50 rounded-lg border border-cyan-200 dark:border-cyan-800">
                <h3 className="font-bold text- text-cyan-600 dark:text-cyan-400">DBI TECH</h3>
                <p className="text-gray-700 dark:text-blue-300">Developer</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-blue-200 mb-6">Skill yang Dipelajari</h3>
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-blue-300">
                      {skill.name}
                    </span>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {skill.value}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-blue-200 dark:bg-blue-800/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: `${skill.value}%`,
                        animation: 'slideIn 1s ease-out'
                      }}
                    >
                      <div className="h-full w-full bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;