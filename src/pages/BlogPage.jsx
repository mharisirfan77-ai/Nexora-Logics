import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { PageHeader } from '../components/public/PageHeader';
import { ArrowUpRight, Calendar, User, Tag, X } from 'lucide-react';

export const BlogPage = () => {
  const { data } = useCMS();
  const { posts = [] } = data;
  const [selectedPost, setSelectedPost] = useState(null);

  const publishedPosts = posts.filter((p) => p.status === 'Published' || !p.status);

  return (
    <>
      <PageHeader
        title="Blog & Industry Insights"
        subtitle="Articles on web development, eBook publishing, social media marketing, and growth advertising."
        categoryLabel="Latest News"
      />

      <section className="section-padding" style={{ background: '#07090E' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {publishedPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  background: '#12162B',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
                onClick={() => setSelectedPost(post)}
              >
                <div style={{ width: '100%', height: '220px', overflow: 'hidden', background: '#000' }}>
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#8F95B2' }}>
                    <span className="tag-pill" style={{ background: 'rgba(210,245,53,0.15)', color: '#D2F535' }}>
                      {post.category}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={13} /> {post.date}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.3 }}>
                    {post.title}
                  </h3>

                  <p style={{ color: '#8F95B2', fontSize: '0.94rem', lineHeight: 1.6 }}>
                    {post.excerpt}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#D2F535', fontWeight: 700, fontSize: '0.9rem' }}>
                    <span>Read Article</span>
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Article Detail Modal */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
            <div className="modal-header">
              <span className="tag-pill" style={{ background: 'rgba(210,245,53,0.15)', color: '#D2F535' }}>
                {selectedPost.category}
              </span>
              <button className="modal-close" onClick={() => setSelectedPost(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '2.5rem' }}>
              <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
                {selectedPost.title}
              </h1>

              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.88rem', color: '#8F95B2', marginBottom: '2rem' }}>
                <span>Author: {selectedPost.author}</span>
                <span>Date: {selectedPost.date}</span>
              </div>

              <img
                src={selectedPost.featuredImage}
                alt=""
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px', marginBottom: '2rem' }}
              />

              <div style={{ color: '#D4D7EC', fontSize: '1.1rem', lineHeight: '1.85', whiteSpace: 'pre-line' }}>
                {selectedPost.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
