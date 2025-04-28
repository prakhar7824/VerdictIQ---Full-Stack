import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Home = () => {
  const features = [
    {
      title: 'Document Analysis',
      description: 'Upload and analyze legal documents for key insights and detailed summaries.',
      link: '/upload',
      linkText: 'Upload Now',
      icon: '📄'
    },
    {
      title: 'Case Outcome Prediction',
      description: 'Get AI-driven predictions for your legal cases based on historical data.',
      link: '/predict',
      linkText: 'Predict Outcome',
      icon: '📊'
    },
    {
      title: 'Case Classification',
      description: 'Automatically classify your case type and get relevant legal information.',
      link: '/classify',
      linkText: 'Classify Now',
      icon: '🏷️'
    },
    {
      title: 'Document Summarization',
      description: 'Generate concise summaries for lengthy judgments and legal texts.',
      link: '/summarize',
      linkText: 'Summarize Now',
      icon: '📝'
    },
    {
      title: 'Precedent Finder',
      description: 'Discover relevant precedents and case laws to support your case.',
      link: '/precedents',
      linkText: 'Find Precedents',
      icon: '🔍'
    },
    {
      title: 'Legal Language Support',
      description: 'Analyze documents in regional Indian languages with AI assistance.',
      link: '/languages',
      linkText: 'Explore Now',
      icon: '🌐'
    }
  ];

  const steps = [
    { icon: '📤', title: 'Upload Document', desc: 'Upload your legal document in PDF, DOCX, or TXT format.' },
    { icon: '🤖', title: 'AI Analysis', desc: 'Our AI engine analyzes the document for key insights and relevant laws.' },
    { icon: '📈', title: 'Get Results', desc: 'Receive outcome predictions, case summaries, and precedent suggestions.' },
    { icon: '✅', title: 'Take Action', desc: 'Use insights to strengthen your case or make informed legal decisions.' },
  ];

  const testimonials = [
    {
      quote: 'AI technologies in the legal sphere can potentially improve access to justice by reducing costs, delays and backlogs. However, we must ensure that AI systems comply with the principles of natural justice and transparency.',
      author: 'Hon. Justice D.Y. Chandrachud',
      role: 'Chief Justice of India'
    },
    {
      quote: 'AI is not a replacement for judicial wisdom but a tool that can assist in research and case preparation. The Indian judiciary must adopt suitable AI tools while maintaining the sanctity of human judgment in delivering justice.',
      author: 'Hon. Justice B.N. Srikrishna',
      role: 'Former Supreme Court Judge'
    },
    {
      quote: 'The introduction of AI in legal research has revolutionized how we prepare for cases. It has reduced weeks of research into hours, allowing lawyers to focus more on strategy and argumentation.',
      author: 'Adv. Menaka Guruswamy',
      role: 'Senior Advocate, Supreme Court'
    },
    {
      quote: 'In a country with a backlog of over 40 million cases, AI can be instrumental in categorizing, prioritizing, and expediting case management. The key is to ensure these systems remain transparent and accountable.',
      author: 'Adv. Indira Jaising',
      role: 'Senior Advocate, Supreme Court'
    }
  ];

  return (
    <Layout>
      <div className="home-page" style={{ background: 'none', minHeight: '100vh', padding: '0' }}>
        {/* Hero Section */}
        <section style={{ padding: '4rem 0 2rem 0', textAlign: 'center', background: 'none', backdropFilter: 'none' }}>
          <h1 style={{ fontWeight: 800, fontSize: '2.8rem', color: '#222831', marginBottom: '1rem' }}>VERDICTIQ</h1>
          <p style={{ color: '#393e46', fontSize: '1.3rem', marginBottom: '2rem', maxWidth: 700, margin: '0 auto' }}>
            Your AI-Powered Legal Assistance Platform. Analyze, predict, and strategize your legal cases with cutting-edge AI tools designed for the Indian legal system.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <Link to="/upload" className="primary-btn" style={{ background: '#fff', color: '#222831', borderRadius: '8px', padding: '1rem 2.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '1.1rem', marginRight: 0, border: '1px solid #222831', boxShadow: '0 2px 8px rgba(34,40,49,0.10)' }}>Get Started</Link>
            <Link to="/features" className="primary-btn" style={{ background: '#fff', color: '#222831', borderRadius: '8px', padding: '1rem 2.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '1.1rem', border: '1px solid #222831', boxShadow: '0 2px 8px rgba(34,40,49,0.10)' }}>Explore Features</Link>
          </div>
        </section>

        {/* About/Intro Section */}
        <div className="container" style={{ background: 'none', marginTop: '3rem' }}>
          <h2 style={{ color: '#222831', fontWeight: 700, fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>Why VerdictIQ?</h2>
          <p style={{ color: '#393e46', fontSize: '1.15rem', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            VerdictIQ leverages advanced AI to empower legal professionals, litigants, and researchers. Instantly analyze documents, predict case outcomes, discover relevant precedents, and summarize lengthy judgments. Our platform is built for the unique needs of the Indian legal system, ensuring accuracy, transparency, and actionable insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="container" style={{ background: 'none', marginTop: '3rem' }}>
          <h2 style={{ color: '#222831', fontWeight: 700, fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Platform Features</h2>
          <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '320px', boxShadow: '0 4px 24px rgba(34,40,49,0.12)', borderRadius: '16px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(2px)', padding: '2.5rem 2rem' }}>
                <div className="feature-icon" style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#60a5fa' }}>{feature.icon}</div>
                <h3 style={{ color: '#222831', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1rem', textAlign: 'center' }}>{feature.title}</h3>
                <p style={{ color: '#393e46', fontSize: '1.1rem', marginBottom: '2rem', textAlign: 'center', flex: 1 }}>{feature.description}</p>
                <Link to={feature.link} className="primary-btn" style={{ background: 'none', color: '#222831', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '1rem', boxShadow: 'none', border: '1px solid #222831' }}>{feature.linkText}</Link>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="container" style={{ background: 'none', marginTop: '3rem' }}>
          <h2 style={{ color: '#222831', fontWeight: 700, fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>How It Works</h2>
          <div className="how-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', justifyItems: 'center' }}>
            {steps.map((step, idx) => (
              <div key={idx} className="how-step card" style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '12px', boxShadow: '0 2px 12px rgba(34,40,49,0.10)', padding: '2rem 1.5rem', textAlign: 'center', minHeight: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '1rem', color: '#60a5fa' }}>{step.icon}</div>
                <h4 style={{ color: '#222831', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{step.title}</h4>
                <p style={{ color: '#393e46', fontSize: '1rem' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="container" style={{ background: 'none', marginTop: '3rem' }}>
          <h2 style={{ color: '#222831', fontWeight: 700, fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>What Legal Professionals Say</h2>
          <div className="testimonial-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card card" style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '12px', boxShadow: '0 2px 12px rgba(34,40,49,0.10)', padding: '2rem 1.5rem', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backdropFilter: 'blur(2px)' }}>
                <p style={{ color: '#222831', fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1.05rem' }}>&quot;{t.quote}&quot;</p>
                <div>
                  <h4 style={{ color: '#60a5fa', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.2rem' }}>{t.author}</h4>
                  <p style={{ color: '#393e46', fontSize: '0.95rem' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Us Section */}
        <div id="about" className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3rem' }}>
          <div className="card" style={{
            maxWidth: 700,
            margin: '2rem auto',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            background: 'none',
            borderRadius: '24px',
            color: '#222831',
          }}>
            <h1 style={{ fontWeight: 900, fontSize: '2.4rem', marginBottom: '1.5rem', letterSpacing: '1px', color: '#264653' }}>About VerdictIQ</h1>
            <p style={{ fontSize: '1.15rem', color: '#393e46', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              VerdictIQ is an AI-powered legal assistance platform designed to empower legal professionals, litigants, and researchers in India. Our mission is to make legal research, document analysis, and case prediction accessible, efficient, and transparent for everyone.
            </p>
            <h2 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '1rem', color: '#2a9d8f' }}>Our Mission</h2>
            <p style={{ fontSize: '1.05rem', color: '#393e46', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              To leverage advanced AI to improve access to justice, reduce legal research time, and provide actionable insights for better legal outcomes.
            </p>
            <h2 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '1rem', color: '#e9c46a' }}>Our Values</h2>
            <ul style={{ textAlign: 'left', color: '#222831', fontSize: '1.05rem', margin: '0 auto', maxWidth: 500, lineHeight: 1.7, listStyle: 'disc inside' }}>
              <li>Transparency and fairness in AI-driven legal tools</li>
              <li>Commitment to accuracy and data privacy</li>
              <li>Empowering users with actionable insights</li>
              <li>Continuous innovation and improvement</li>
            </ul>
          </div>
        </div>

        {/* Contact Us Section */}
        <div id="contact" className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3rem', marginBottom: '3rem' }}>
          <div className="card" style={{
            maxWidth: 500,
            margin: '2rem auto',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            background: 'none',
            borderRadius: '24px',
            color: '#222831',
          }}>
            <h1 style={{ fontWeight: 900, fontSize: '2.2rem', marginBottom: '1.5rem', letterSpacing: '1px', color: '#264653' }}>Contact Us</h1>
            <form onSubmit={e => { e.preventDefault(); alert('Thank you for reaching out! We will get back to you soon.'); }}>
              <div style={{ marginBottom: '1.2rem', textAlign: 'left' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#222831' }}>Name</label>
                <input type="text" id="name" name="name" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1.5px solid #bdbdbd', marginBottom: 10, fontSize: '1rem', background: 'rgba(255,255,255,0.7)', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '1.2rem', textAlign: 'left' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#222831' }}>Email</label>
                <input type="email" id="email" name="email" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1.5px solid #bdbdbd', marginBottom: 10, fontSize: '1rem', background: 'rgba(255,255,255,0.7)', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '1.2rem', textAlign: 'left' }}>
                <label htmlFor="message" style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#222831' }}>Message</label>
                <textarea id="message" name="message" required rows={5} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1.5px solid #bdbdbd', fontSize: '1rem', background: 'rgba(255,255,255,0.7)', outline: 'none' }} />
              </div>
              <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: 10, fontSize: '1.1rem', borderRadius: '8px' }}>Send Message</button>
            </form>
          </div>
        </div>

        {/* Call to Action Section */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <h2 style={{ color: '#222831', fontWeight: 800, fontSize: '2.2rem', marginBottom: '1rem' }}>Ready to Transform Your Legal Practice?</h2>
          <p style={{ color: '#393e46', fontSize: '1.15rem', marginBottom: '2rem', maxWidth: 700, margin: '0 auto' }}>
            Join legal professionals using VerdictIQ to enhance their case analysis and predictions.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/signup" className="primary-btn" style={{ background: 'none', color: '#222831', borderRadius: '8px', padding: '1rem 2.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '1.1rem', marginRight: '1rem', border: '1px solid #222831' }}>Sign Up Now</Link>
            <Link to="/demo" className="primary-btn" style={{ background: 'none', color: '#222831', borderRadius: '8px', padding: '1rem 2.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '1.1rem', border: '1px solid #222831' }}>Request Demo</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home; 