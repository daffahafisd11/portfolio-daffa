import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const Portfolio = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [commentName, setCommentName] = useState('');

  const projects = data && data.length > 0 ? data : [];

  // Load komentar dari localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem('portfolioComments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  // Simpan komentar ke localStorage
  const saveComments = (updatedComments) => {
    localStorage.setItem('portfolioComments', JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    setNewComment('');
    setCommentName('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const handleAddComment = (projectId) => {
    if (!newComment.trim() || !commentName.trim()) {
      alert('Nama dan komentar harus diisi!');
      return;
    }

    const updatedComments = { ...comments };
    if (!updatedComments[projectId]) {
      updatedComments[projectId] = [];
    }

    const comment = {
      id: Date.now(),
      name: commentName.trim(),
      text: newComment.trim(),
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    updatedComments[projectId].push(comment);
    saveComments(updatedComments);
    setNewComment('');
    setCommentName('');
  };

  const handleDeleteComment = (projectId, commentId) => {
    if (window.confirm('Yakin ingin menghapus komentar ini?')) {
      const updatedComments = { ...comments };
      updatedComments[projectId] = updatedComments[projectId].filter(c => c.id !== commentId);
      if (updatedComments[projectId].length === 0) {
        delete updatedComments[projectId];
      }
      saveComments(updatedComments);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (projects.length === 0) {
    return (
      <section id="portfolio" className="pt-20 pb-16 px-4 bg-blue-50/30 dark:bg-blue-950/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Karyaku</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Belum ada proyek nih. Nanti cek lagi ya! 🚀</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="portfolio" className="pt-20 pb-16 px-4 bg-blue-50/30 dark:bg-blue-950/20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Karyaku</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Klik proyek buat lihat detailnya 😊</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => openModal(project)}
                className="group bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
              >
                {/* Gambar Cover */}
                <div className="h-48 overflow-hidden bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 relative flex items-center justify-center">
                  {project.image ? (
                    project.image.startsWith('http') || project.image.startsWith('/') ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          const parent = e.target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="h-48 flex items-center justify-center text-6xl">📁</div>`;
                          }
                        }}
                      />
                    ) : (
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{project.image}</span>
                    )
                  ) : (
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">📁</span>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium bg-blue-600/80 px-4 py-2 rounded-lg">
                      🔍 Lihat Proyek
                    </span>
                  </div>
                </div>
                
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    💬 {comments[project.id]?.length || 0} komentar
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Detail Proyek */}
      {isModalOpen && selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-blue-400/30 dark:border-blue-600/30 shadow-2xl shadow-blue-500/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex justify-between items-center p-4 border-b border-blue-400/20 dark:border-blue-600/20 sticky top-0 bg-white dark:bg-gray-900 z-10 rounded-t-2xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedProject.title}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-2xl hover:scale-110 transform"
              >
                ✕
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-6">
              {/* Gambar Project */}
              <div className="rounded-xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800 border border-blue-200 dark:border-blue-600/20 flex items-center justify-center">
                {selectedProject.image ? (
                  selectedProject.image.startsWith('http') || selectedProject.image.startsWith('/') ? (
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      className="w-full h-auto max-h-[50vh] object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '';
                        e.target.alt = 'Gambar tidak tersedia';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-64 w-full">
                      <span className="text-8xl">{selectedProject.image}</span>
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center h-64 w-full">
                    <span className="text-8xl">📁</span>
                  </div>
                )}
              </div>

              {/* Deskripsi */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">📝 Deskripsi</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Tags */}
              {selectedProject.tags && selectedProject.tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">⚡ Teknologi</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== FITUR KOMENTAR ===== */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
                  💬 Komentar ({comments[selectedProject.id]?.length || 0})
                </h4>

                {/* Form Komentar */}
                <div className="mb-6 space-y-3">
                  <input
                    type="text"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="Nama Anda"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Tulis komentar..."
                      className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment(selectedProject.id);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleAddComment(selectedProject.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all hover:scale-105"
                    >
                      Kirim
                    </button>
                  </div>
                </div>

                {/* Daftar Komentar */}
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {comments[selectedProject.id]?.length > 0 ? (
                    [...comments[selectedProject.id]]
                      .reverse()
                      .map((comment) => (
                        <div 
                          key={comment.id} 
                          className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-semibold text-blue-600 dark:text-blue-400">
                                {comment.name}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                {comment.date}
                              </span>
                            </div>
                            <button
                              onClick={() => handleDeleteComment(selectedProject.id, comment.id)}
                              className="text-red-500 hover:text-red-400 text-sm transition-colors"
                            >
                              🗑️ Hapus
                            </button>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mt-1">
                            {comment.text}
                          </p>
                        </div>
                      ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      Belum ada komentar. Jadi yang pertama! 😊
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t border-blue-400/20 dark:border-blue-600/20 flex justify-end sticky bottom-0 bg-white dark:bg-gray-900 rounded-b-2xl">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;