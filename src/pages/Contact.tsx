import React, { useState } from 'react'; // Import React and useState for managing form state
import Header from '../components/Header'; // Shared Header component
import '../styles/shared.css'; // Shared styling

const Contact: React.FC = () => {
  // State to hold form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle form submission (currently logs to console)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate form submission logic (e.g., send to backend or email)
    console.log('Form submitted:', formData);
  };

  // Handle input changes for all fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="career-helpi-app"> {/* App wrapper */}
      <Header /> {/* Site header */}
      <div className="page-container"> {/* Main content wrapper */}
        <h2>Contact Us</h2>
        <div className="form-container"> {/* Form wrapper */}
          <form onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>
            
            {/* Email field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email address"
              />
            </div>
            
            {/* Message field */}
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message"
                rows={5}
              />
            </div>
            
            {/* Submit button */}
            <button type="submit" className="button button-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; // Export component
