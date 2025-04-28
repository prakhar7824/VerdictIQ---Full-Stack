import React from 'react';
import { FaChartLine, FaBalanceScale, FaGavel, FaLightbulb } from 'react-icons/fa';
import { Doughnut, Bar, Radar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  BarElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  BarElement
);

const PredictionOutcome = ({ predictionData }) => {
  // Calculate probability percentage
  const probability = predictionData.probability * 100;
  
  // Set confidence level based on probability
  const getConfidenceLevel = (prob) => {
    if (prob >= 70) return 'high';
    if (prob >= 40) return 'medium';
    return 'low';
  };

  const confidenceLevel = getConfidenceLevel(probability);

  // Doughnut chart data for main prediction
  const doughnutData = {
    labels: ['Prediction Confidence', 'Remaining'],
    datasets: [{
      data: [probability, 100 - probability],
      backgroundColor: [
        probability >= 70 ? '#10b981' : probability >= 40 ? '#f59e0b' : '#ef4444',
        '#374151'
      ],
      borderWidth: 0,
    }]
  };

  // Bar chart data for key factors
  const barData = {
    labels: predictionData.keyFactors.map(factor => factor.title),
    datasets: [{
      label: 'Impact Strength',
      data: predictionData.keyFactors.map(factor => {
        const impact = factor.description.toLowerCase();
        if (impact.includes('strong')) return 90;
        if (impact.includes('moderate')) return 60;
        return 30;
      }),
      backgroundColor: '#2563eb',
      borderRadius: 5,
    }]
  };

  // Radar chart data for confidence metrics
  const radarData = {
    labels: ['Evidence Quality', 'Legal Arguments', 'Precedent Match', 'Procedural Compliance', 'Judge History'],
    datasets: [{
      label: 'Confidence Metrics',
      data: [85, 75, 65, 80, 70],
      backgroundColor: 'rgba(37, 99, 235, 0.2)',
      borderColor: '#2563eb',
      pointBackgroundColor: '#2563eb',
    }]
  };

  // Line chart data for historical trends
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Similar Cases Success Rate',
      data: [65, 68, 72, 70, 75, 78],
      borderColor: '#2563eb',
      tension: 0.4,
      fill: false,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e5e7eb',
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="prediction-results">
      <div className="prediction-header">
        <h2>Case Outcome Prediction</h2>
        <p>Based on historical data and case analysis</p>
      </div>

      <div className="prediction-visualization">
        <div className="chart-grid">
          {/* Main Prediction Chart */}
          <div className="chart-container">
            <h3>Prediction Confidence</h3>
            <div className="chart-wrapper">
              <Doughnut data={doughnutData} options={chartOptions} />
            </div>
          </div>

          {/* Key Factors Chart */}
          <div className="chart-container">
            <h3>Key Factors Impact</h3>
            <div className="chart-wrapper">
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>

          {/* Confidence Metrics Chart */}
          <div className="chart-container">
            <h3>Confidence Metrics</h3>
            <div className="chart-wrapper">
              <Radar data={radarData} options={chartOptions} />
            </div>
          </div>

          {/* Historical Trends Chart */}
          <div className="chart-container">
            <h3>Historical Trends</h3>
            <div className="chart-wrapper">
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Key Factors Section */}
      <div className="key-factors">
        <h3>Key Factors Influencing Prediction</h3>
        <div className="factors-grid">
          {predictionData.keyFactors.map((factor, index) => (
            <div key={index} className="factor-card">
              <div className="factor-icon">
                <FaChartLine />
              </div>
              <h4 className="factor-title">{factor.title}</h4>
              <p className="factor-description">{factor.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation Section */}
      <div className="recommendation">
        <h3>Recommended Actions</h3>
        <div className="recommendation-content">
          <p>Based on the analysis, here are the recommended next steps:</p>
          <div className="action-steps">
            {predictionData.recommendations.map((step, index) => (
              <div key={index} className="action-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionOutcome; 