import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="ultra-premium-home">
      {/* Ultra Premium Hero Section with Background Image */}
      <div className="ultra-hero-section">
        {/* Background Image with Overlay */}
        <div className="hero-background-image">
          <div className="background-overlay"></div>
          {/* Animated Gradient Orbs */}
          <div className="gradient-orbs">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
          </div>
          
          {/* Floating Particles */}
          <div className="floating-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{
                '--delay': `${i * 0.3}s`,
                '--duration': `${10 + i * 1.5}s`,
                '--x': `${(i * 5) % 100}%`,
                '--y': `${(i * 7) % 100}%`
              }}></div>
            ))}
          </div>
        </div>
        
        <div className="hero-content-ultra">
          <div className="hero-text-ultra">
            {/* Main Title with Staggered Animation */}
            <h1 className="hero-title-ultra">
              <span className="title-line line-1">
                <span className="title-gradient">Culinary</span>
              </span>
              <span className="title-line line-2">
                <span className="title-highlight">Masterpiece</span>
              </span>
              <span className="title-line line-3">
                Your Smart Kitchen Assistant
              </span>
            </h1>
            
            {/* Animated Subtitle */}
            <p className="hero-subtitle-ultra">
              Plan meals, generate shopping lists, and discover delicious recipes - 
              all in one beautiful, intuitive platform that transforms your cooking experience.
            </p>
            
            {/* Action Buttons */}
            {token ? (
              <div className="hero-actions-ultra">
                <Link to="/dashboard" className="btn-ultra btn-primary-ultra">
                  <span className="btn-glow"></span>
                  <span className="btn-icon">🏠</span>
                  Go to Dashboard
                  <span className="btn-arrow">→</span>
                </Link>
                <Link to="/meal-planner" className="btn-ultra btn-secondary-ultra">
                  <span className="btn-icon">📅</span>
                  Plan Meals
                </Link>
              </div>
            ) : (
              <div className="hero-actions-ultra">
                <Link to="/register" className="btn-ultra btn-primary-ultra">
                  <span className="btn-glow"></span>
                  <span className="btn-icon">🚀</span>
                  Get Started Free
                  <span className="btn-arrow">→</span>
                </Link>
                <Link to="/login" className="btn-ultra btn-secondary-ultra">
                  <span className="btn-icon">🔐</span>
                  Login
                </Link>
              </div>
            )}
            
            {/* Stats */}
            <div className="hero-stats-ultra">
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Recipes Created</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">5K+</div>
                <div className="stat-label">Happy Cooks</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Meals Planned</div>
              </div>
            </div>
          </div>
          
          {/* Hero Visual - App Preview */}
          <div className="hero-visual-ultra">
            <div className="app-preview-ultra">
              <div className="preview-card-ultra card-1" data-tilt>
                <div className="card-header">
                  <div className="card-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="card-content">
                  <div className="recipe-preview active">
                    <div className="recipe-image"></div>
                    <div className="recipe-info">
                      <h4>Gourmet Pasta</h4>
                      <p>30 min • Italian</p>
                    </div>
                  </div>
                  <div className="recipe-preview">
                    <div className="recipe-image"></div>
                    <div className="recipe-info">
                      <h4>Fresh Salad</h4>
                      <p>15 min • Healthy</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="preview-card-ultra card-2" data-tilt data-tilt-reverse="true">
                <div className="calendar-preview">
                  <div className="calendar-header">
                    <span>Meal Planner</span>
                  </div>
                  <div className="calendar-grid">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                      <div key={i} className="calendar-day">
                        <span className="day-label">{day}</span>
                        <div className="meal-dot breakfast"></div>
                        <div className="meal-dot lunch"></div>
                        <div className="meal-dot dinner"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="preview-card-ultra card-3" data-tilt>
                <div className="shopping-preview">
                  <div className="list-header">
                    <span>Shopping List</span>
                  </div>
                  <div className="list-items">
                    {['Tomatoes', 'Pasta', 'Olive Oil', 'Garlic', 'Basil'].map((item, i) => (
                      <div key={i} className="list-item">
                        <div className="checkbox"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span>Discover More</span>
        </div>
      </div>

      {/* Premium Features Section */}
      <div className="premium-features-section">
        <div className="container-ultra">
          <div className="section-header-ultra">
            <h2 className="section-title-ultra">
              Why <span className="gradient-text">RecipeMaster</span> Stands Out
            </h2>
            <p className="section-subtitle-ultra">
              Experience the future of meal planning with our powerful, intuitive features
            </p>
          </div>
          
          <div className="features-grid-ultra">
            {[
              {
                icon: '🎯',
                title: 'Smart Meal Planning',
                description: 'Drag & drop interface makes weekly meal planning intuitive and fun. Visual calendar helps you stay organized.',
                color: '#e63946'
              },
              {
                icon: '🛒',
                title: 'Auto Shopping Lists',
                description: 'Generate complete grocery lists from your meal plans. Check off items as you shop and track your progress.',
                color: '#ffd166'
              },
              {
                icon: '📊',
                title: 'Recipe Analytics',
                description: 'Track your cooking habits with beautiful charts and statistics. Discover your most-used ingredients and categories.',
                color: '#06d6a0'
              },
              {
                icon: '📱',
                title: 'Responsive Design',
                description: 'Perfect experience on any device. Plan meals on your desktop, check recipes on your phone while cooking.',
                color: '#118ab2'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Built with modern technology for blazing fast performance. Your recipes load instantly, always.',
                color: '#9d4edd'
              },
              {
                icon: '🔒',
                title: 'Secure & Private',
                description: 'Your recipes and meal plans are yours alone. We use enterprise-grade security to protect your data.',
                color: '#f72585'
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card-ultra">
                <div 
                  className="feature-icon-ultra"
                  style={{ '--icon-color': feature.color }}
                >
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-glow" style={{ '--glow-color': feature.color }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!token && (
        <div className="cta-section-ultra">
          <div className="cta-background">
            <div className="cta-orb orb-1"></div>
            <div className="cta-orb orb-2"></div>
          </div>
          <div className="container-ultra">
            <div className="cta-content-ultra">
              <h2>Ready to Transform Your Cooking Experience?</h2>
              <p>Join thousands of home cooks who use RecipeMaster to simplify their kitchen life</p>
              <Link to="/register" className="btn-ultra btn-cta-ultra">
                <span className="btn-glow"></span>
                Start Your Culinary Journey Today
                <span className="btn-sparkles">✨</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Premium Footer */}
      <footer className="premium-footer">
        <div className="footer-background">
          <div className="footer-orb orb-1"></div>
          <div className="footer-orb orb-2"></div>
        </div>
        
        <div className="container-ultra">
          <div className="footer-content">
            {/* Developer Info */}
            <div className="developer-section">
              <div className="developer-info">
                <div className="developer-avatar">
                  <div className="avatar-placeholder">A</div>
                </div>
                <div className="developer-details">
                  <h3>Ayesha Developer</h3>
                  <p className="developer-bio">
                    Full Stack Developer & UI/UX Enthusiast passionate about creating 
                    beautiful, functional web applications that solve real-world problems.
                  </p>
                  <div className="developer-contact">
                    <p className="contact-email">
                      <span className="contact-icon">📧</span>
                      ayesha.developer@example.com
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="social-links">
                <h4>Connect With Me</h4>
                <div className="social-icons">
                  <a 
                    href="https://github.com/ayesha-developer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link github"
                  >
                    <span className="social-icon">🐙</span>
                    <span className="social-text">GitHub</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/ayesha-developer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link linkedin"
                  >
                    <span className="social-icon">💼</span>
                    <span className="social-text">LinkedIn</span>
                  </a>
                  <a 
                    href="https://twitter.com/ayesha_dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link twitter"
                  >
                    <span className="social-icon">🐦</span>
                    <span className="social-text">Twitter</span>
                  </a>
                  <a 
                    href="https://portfolio.ayesha.dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link portfolio"
                  >
                    <span className="social-icon">🌟</span>
                    <span className="social-text">Portfolio</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-links">
              <div className="link-column">
                <h4>Product</h4>
                <a href="/features">Features</a>
                <a href="/pricing">Pricing</a>
                <a href="/updates">Updates</a>
                <a href="/download">Download</a>
              </div>
              
              <div className="link-column">
                <h4>Resources</h4>
                <a href="/blog">Blog</a>
                <a href="/tutorials">Tutorials</a>
                <a href="/documentation">Documentation</a>
                <a href="/community">Community</a>
              </div>
              
              <div className="link-column">
                <h4>Company</h4>
                <a href="/about">About</a>
                <a href="/careers">Careers</a>
                <a href="/contact">Contact</a>
                <a href="/press">Press Kit</a>
              </div>
              
              <div className="link-column">
                <h4>Legal</h4>
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
                <a href="/cookies">Cookies</a>
                <a href="/license">License</a>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <div className="bottom-content">
              <div className="copyright">
                <p>&copy; 2024 RecipeMaster. Crafted with ❤️ by Ayesha Developer</p>
              </div>
              <div className="footer-badges">
                <span className="badge">🚀 Built with React</span>
                <span className="badge">🎨 Beautiful Design</span>
                <span className="badge">⚡ Blazing Fast</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;