import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import FeatureCard from '../components/FeatureCard';

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

  return (
    <Layout>
      <div className="hero">
        <div className="hero-content">
          <h2>Transforming Legal Procedures with AI</h2>
          <p>Upload legal documents, predict case outcomes, and access legal resources seamlessly.</p>
          <div className="hero-buttons">
            <Link to="/upload" className="primary-btn">Upload Document</Link>
            <Link to="/features" className="secondary-btn">Explore Features</Link>
          </div>
        </div>
      </div>

      <section className="features" id="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              link={feature.link}
              linkText={feature.linkText}
              icon={feature.icon}
            />
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Upload Document</h3>
            <p>Upload your legal document in PDF, DOCX, or TXT format.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Analysis</h3>
            <p>Our AI engine analyzes the document for key insights and relevant laws.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Predictions</h3>
            <p>Receive outcome predictions, case summaries, and precedent suggestions.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Take Action</h3>
            <p>Use insights to strengthen your case or make informed legal decisions.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Legal Professionals Say About AI in Indian Legal System</h2>
        <div className="testimonial-slider">
          <div className="testimonial">
            <p>"AI technologies in the legal sphere can potentially improve access to justice by reducing costs, delays and backlogs. However, we must ensure that AI systems comply with the principles of natural justice and transparency."</p>
            <div className="testimonial-author">
              <h4>Hon. Justice D.Y. Chandrachud</h4>
              <p>Chief Justice of India</p>
            </div>
          </div>

          <div className="testimonial">
            <p>"AI is not a replacement for judicial wisdom but a tool that can assist in research and case preparation. The Indian judiciary must adopt suitable AI tools while maintaining the sanctity of human judgment in delivering justice."</p>
            <div className="testimonial-author">
              <h4>Hon. Justice B.N. Srikrishna</h4>
              <p>Former Supreme Court Judge</p>
            </div>
          </div>

          <div className="testimonial">
            <p>"The introduction of AI in legal research has revolutionized how we prepare for cases. It has reduced weeks of research into hours, allowing lawyers to focus more on strategy and argumentation."</p>
            <div className="testimonial-author">
              <h4>Adv. Menaka Guruswamy</h4>
              <p>Senior Advocate, Supreme Court</p>
            </div>
          </div>

          <div className="testimonial">
            <p>"In a country with a backlog of over 40 million cases, AI can be instrumental in categorizing, prioritizing, and expediting case management. The key is to ensure these systems remain transparent and accountable."</p>
            <div className="testimonial-author">
              <h4>Adv. Indira Jaising</h4>
              <p>Senior Advocate, Supreme Court</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Transform Your Legal Practice?</h2>
        <p>Join legal professionals using VerdictIQ to enhance their case analysis and predictions.</p>
        <div className="cta-buttons">
          <Link to="/signup" className="primary-btn">Sign Up Now</Link>
          <Link to="/demo" className="secondary-btn">Request Demo</Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home; 