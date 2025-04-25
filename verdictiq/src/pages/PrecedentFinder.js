import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const PrecedentFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    court: 'all',
    year: 'all',
    caseType: 'all',
    subject: 'all'
  });
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for demonstrating the precedent finder
  const mockPrecedents = [
    {
      id: 1,
      title: 'Supreme Court of India vs Property Rights Association',
      citation: 'AIR 2022 SC 1234',
      court: 'Supreme Court',
      date: '2022-03-15',
      relevance: 92,
      summary: 'Landmark judgment establishing the framework for digital property rights in India, emphasizing the need for clear documentation and registration in online assets.',
      keyPoints: [
        'Digital assets require proper documentation',
        'Registration with appropriate authorities is essential',
        'Traditional property laws apply to digital assets with specific modifications'
      ],
      judges: ['Justice A.K. Sharma', 'Justice R. Patel']
    },
    {
      id: 2,
      title: 'Mehta vs State of Maharashtra',
      citation: 'AIR 2021 BOM 567',
      court: 'Bombay High Court',
      date: '2021-07-22',
      relevance: 87,
      summary: 'Case regarding land acquisition procedures and notification requirements, establishing stricter timelines for government notifications to affected parties.',
      keyPoints: [
        'Mandatory 60-day notice period before land acquisition',
        'Clear communication channels with property owners',
        'Compensation calculation methodology clarified'
      ],
      judges: ['Justice P.N. Desai']
    },
    {
      id: 3,
      title: 'Intellectual Property Rights Board vs Tech Innovations Ltd.',
      citation: '(2020) 4 SCC 789',
      court: 'Supreme Court',
      date: '2020-11-05',
      relevance: 78,
      summary: 'Significant case dealing with software patent protections in India, balancing innovation incentives with public access to technology.',
      keyPoints: [
        'Software algorithms require unique patent considerations',
        'Two-step verification process for tech patents',
        'Limited term protections for rapidly evolving technologies'
      ],
      judges: ['Justice M.L. Verma', 'Justice K.S. Rao', 'Justice T.N. Patel']
    },
    {
      id: 4,
      title: 'Singh Property Holdings vs Municipal Corporation of Delhi',
      citation: 'AIR 2019 DEL 456',
      court: 'Delhi High Court',
      date: '2019-05-18',
      relevance: 73,
      summary: 'Case determining the limits of municipal authority in rezoning residential areas for commercial use, establishing clear consultation requirements.',
      keyPoints: [
        'Public consultation mandatory for rezoning',
        'Environmental impact studies required',
        'Compensation for affected residential property owners'
      ],
      judges: ['Justice A.B. Kumar']
    },
    {
      id: 5,
      title: 'Digital Rights Forum vs Union of India',
      citation: '(2018) 7 SCC 213',
      court: 'Supreme Court',
      date: '2018-09-10',
      relevance: 65,
      summary: 'Foundational case establishing data privacy rights as an extension of property rights, particularly for personal information stored by corporations.',
      keyPoints: [
        'Personal data classified as private property',
        'Consent requirements for data use',
        'Compensation framework for data breaches'
      ],
      judges: ['Justice D.Y. Chandrachud', 'Justice A.M. Khanwilkar', 'Justice S. Bobde']
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call with slight delay
    setTimeout(() => {
      // Filter mock data based on search term and filters
      // In a real app, this would be an API call
      const filteredResults = mockPrecedents.filter(precedent => {
        const matchesSearch = precedent.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           precedent.summary.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCourt = filters.court === 'all' || precedent.court.includes(filters.court);
        const matchesYear = filters.year === 'all' || precedent.date.includes(filters.year);
        
        return matchesSearch && matchesCourt && matchesYear;
      });
      
      setResults(filteredResults);
      setIsSearching(false);
    }, 1500);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <Layout>
      <div className="precedent-finder-page">
        <div className="page-header">
          <h1>Legal Precedent Finder</h1>
          <p>Search for relevant case laws and precedents to strengthen your legal arguments</p>
        </div>

        <div className="search-container">
          <form onSubmit={handleSearch}>
            <div className="main-search">
              <input
                type="text"
                placeholder="Search for legal precedents, case laws, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" disabled={isSearching}>
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
            
            <button 
              type="button" 
              className="toggle-filters-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {showFilters && (
              <div className="advanced-filters">
                <div className="filter-group">
                  <label htmlFor="court">Court</label>
                  <select 
                    id="court" 
                    name="court" 
                    value={filters.court}
                    onChange={handleFilterChange}
                  >
                    <option value="all">All Courts</option>
                    <option value="Supreme Court">Supreme Court</option>
                    <option value="High Court">High Courts</option>
                    <option value="District Court">District Courts</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label htmlFor="year">Year</label>
                  <select 
                    id="year" 
                    name="year" 
                    value={filters.year}
                    onChange={handleFilterChange}
                  >
                    <option value="all">All Years</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label htmlFor="caseType">Case Type</label>
                  <select 
                    id="caseType" 
                    name="caseType" 
                    value={filters.caseType}
                    onChange={handleFilterChange}
                  >
                    <option value="all">All Types</option>
                    <option value="civil">Civil</option>
                    <option value="criminal">Criminal</option>
                    <option value="constitutional">Constitutional</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label htmlFor="subject">Subject</label>
                  <select 
                    id="subject" 
                    name="subject" 
                    value={filters.subject}
                    onChange={handleFilterChange}
                  >
                    <option value="all">All Subjects</option>
                    <option value="property">Property Law</option>
                    <option value="contracts">Contract Law</option>
                    <option value="intellectual">Intellectual Property</option>
                    <option value="family">Family Law</option>
                  </select>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="search-results">
          {isSearching ? (
            <div className="loading-results">
              <div className="loader"></div>
              <p>Searching for relevant precedents...</p>
            </div>
          ) : results.length > 0 ? (
            <>
              <h2>Found {results.length} Relevant Precedents</h2>
              <div className="precedents-list">
                {results.map(precedent => (
                  <div key={precedent.id} className="precedent-card">
                    <div className="precedent-header">
                      <h3>{precedent.title}</h3>
                      <span className="relevance-badge">
                        {precedent.relevance}% Relevant
                      </span>
                    </div>
                    
                    <div className="precedent-meta">
                      <span className="citation">{precedent.citation}</span>
                      <span className="court">{precedent.court}</span>
                      <span className="date">{precedent.date}</span>
                    </div>
                    
                    <p className="precedent-summary">{precedent.summary}</p>
                    
                    <div className="key-points">
                      <h4>Key Points:</h4>
                      <ul>
                        {precedent.keyPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="judges">
                      <h4>Judges:</h4>
                      <p>{precedent.judges.join(', ')}</p>
                    </div>
                    
                    <div className="precedent-actions">
                      <Link to={`/precedent/${precedent.id}`} className="view-full-btn">
                        View Full Judgment
                      </Link>
                      <button className="cite-btn">Cite This Case</button>
                      <button className="save-btn">Save for Later</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : searchTerm ? (
            <div className="no-results">
              <h2>No matching precedents found</h2>
              <p>Try broadening your search terms or adjusting your filters</p>
            </div>
          ) : (
            <div className="search-instructions">
              <h2>How to Use Precedent Finder</h2>
              <ol>
                <li>Enter keywords related to your case (e.g., "property rights digital assets")</li>
                <li>Use filters to narrow down by court, year, case type, or subject</li>
                <li>Review matching precedents ranked by relevance</li>
                <li>Click on a case to view the full judgment details</li>
              </ol>
              <p>Our AI analyzes the semantic meaning of your search terms to find the most relevant precedents, even if they don't contain the exact words you searched for.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PrecedentFinder; 