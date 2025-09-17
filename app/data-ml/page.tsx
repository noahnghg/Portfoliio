'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TypingAnimation from '../../components/TypingAnimation';

const DataML = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const projects = [
    {
      id: 1,
      title: "Customer Churn Prediction",
      description: "Machine learning model to predict customer churn using ensemble methods and feature engineering. Achieved 94% accuracy with Random Forest classifier.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
      github: "https://github.com",
      notebook: "https://colab.research.google.com",
      type: "Classification"
    },
    {
      id: 2,
      title: "Stock Price Forecasting",
      description: "Time series analysis and LSTM neural network implementation to predict stock prices with technical indicators and sentiment analysis.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
      tech: ["TensorFlow", "Keras", "NumPy", "yfinance"],
      github: "https://github.com",
      notebook: "https://colab.research.google.com",
      type: "Time Series"
    },
    {
      id: 3,
      title: "Image Classification CNN",
      description: "Deep learning model for image classification using convolutional neural networks. Trained on custom dataset with data augmentation techniques.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
      tech: ["PyTorch", "OpenCV", "Albumentations", "Streamlit"],
      github: "https://github.com",
      notebook: "https://colab.research.google.com",
      type: "Computer Vision"
    },
    {
      id: 4,
      title: "Sentiment Analysis API",
      description: "Natural language processing model for sentiment analysis with REST API deployment. Processes real-time social media data and reviews.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      tech: ["NLTK", "FastAPI", "Docker", "Hugging Face"],
      github: "https://github.com",
      notebook: "https://colab.research.google.com",
      type: "NLP"
    },
    {
      id: 5,
      title: "Recommendation System",
      description: "Collaborative filtering and content-based recommendation system for e-commerce platform. Implements matrix factorization and deep learning approaches.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      tech: ["Surprise", "LightGBM", "Apache Spark", "MLflow"],
      github: "https://github.com",
      notebook: "https://colab.research.google.com",
      type: "Recommendation"
    },
    {
      id: 6,
      title: "Sales Forecasting Dashboard",
      description: "End-to-end data science project with automated data pipeline, feature engineering, and interactive dashboard for business insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      tech: ["Plotly Dash", "Apache Airflow", "PostgreSQL", "Docker"],
      github: "https://github.com",
      notebook: "https://colab.research.google.com",
      type: "Analytics"
    }
  ];

  const typeColors: Record<string, string> = {
    "Classification": "badge-primary",
    "Time Series": "badge-secondary",
    "Computer Vision": "badge-accent",
    "NLP": "badge-info",
    "Recommendation": "badge-neutral",
    "Analytics": "badge-primary"
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Header Section */}
      <section className="pt-20 pb-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            <TypingAnimation
              text="Data/ML Projects"
              speed={100}
              className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent"
              showCursor={false}
              onComplete={() => setShowDescription(true)}
            />
          </h1>
          {showDescription && (
            <div className="animate-fade-in-up">
              <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                <TypingAnimation
                  text="Machine learning models, data analysis projects, and AI applications solving real-world problems"
                  speed={30}
                  delay={500}
                  showCursor={false}
                  onComplete={() => setShowStats(true)}
                />
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {showStats && (
        <section className="px-8 pb-16 animate-fade-in-up">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="stat bg-base-100/50 backdrop-blur-sm rounded-2xl border border-base-300/20 text-center animate-stagger-1">
                <div className="stat-value text-primary text-2xl">15+</div>
                <div className="stat-title text-sm">Models Built</div>
              </div>
              <div className="stat bg-base-100/50 backdrop-blur-sm rounded-2xl border border-base-300/20 text-center animate-stagger-2">
                <div className="stat-value text-secondary text-2xl">94%</div>
                <div className="stat-title text-sm">Best Accuracy</div>
              </div>
              <div className="stat bg-base-100/50 backdrop-blur-sm rounded-2xl border border-base-300/20 text-center animate-stagger-3">
                <div className="stat-value text-accent text-2xl">6</div>
                <div className="stat-title text-sm">Domains</div>
              </div>
              <div className="stat bg-base-100/50 backdrop-blur-sm rounded-2xl border border-base-300/20 text-center animate-stagger-4">
                <div className="stat-value text-info text-2xl">2+</div>
                <div className="stat-title text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section className="px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                {/* Project Image */}
                <figure className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`badge ${typeColors[project.type]} badge-sm`}>
                      {project.type}
                    </span>
                  </div>
                </figure>

                <div className="card-body">
                  <h2 className="card-title text-xl font-bold mb-2">
                    {project.title}
                  </h2>
                  
                  <p className="text-base-content/70 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="badge badge-outline badge-xs hover:badge-secondary transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="card-actions justify-between items-center">
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline hover:btn-secondary transition-all"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Code
                      </a>
                      <a
                        href={project.notebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-secondary hover:btn-secondary-focus transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Notebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="card bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20">
              <div className="card-body text-center">
                <h3 className="text-2xl font-bold mb-4">Let's collaborate on data science projects!</h3>
                <p className="text-base-content/70 mb-6">
                  Interested in machine learning consulting or data science collaboration? Let's discuss your project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/about" className="btn btn-secondary">
                    Learn More About Me
                  </Link>
                  <a href="mailto:noah@example.com" className="btn btn-outline">
                    Discuss a Project
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DataML;
