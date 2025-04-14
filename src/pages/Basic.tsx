import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

interface BasicAssessmentState {
  interests: string;
  skills: string;
  workEnvironment: string;
  educationLevel: string;
}

const Basic: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BasicAssessmentState>({
    interests: '',
    skills: '',
    workEnvironment: '',
    educationLevel: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission, To navigate to result page.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Basic Questions Completed!", { duration: 3000 });
    console.log('Basic Assessment Data:', formData);
    navigate('/results');
  };

  return (
    <div className="page">
      <Header />
      <div className="assessment-container">
        <h2>Basic Career Assessment</h2>
        <p className="subtitle">Answer these questions to receive quick career suggestions.</p>
        <form onSubmit={handleSubmit} className="assessment-form">
          <div className="form-group">
            <label htmlFor="interests">What are your main interests?</label>
            <select
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="technology">Technology and Computers</option>
              <option value="health">Healthcare and Medicine</option>
              <option value="business">Business and Finance</option>
              <option value="arts">Arts and Creativity</option>
              <option value="science">Science and Research</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="skills">What are your strongest skills?</label>
            <select
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="analytical">Analytical Thinking</option>
              <option value="creative">Creative Problem Solving</option>
              <option value="communication">Communication</option>
              <option value="technical">Technical Skills</option>
              <option value="leadership">Leadership</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="workEnvironment">What type of work environment do you prefer?</label>
            <select
              id="workEnvironment"
              name="workEnvironment"
              value={formData.workEnvironment}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="office">Office Environment</option>
              <option value="remote">Remote Work</option>
              <option value="outdoor">Outdoor/Field Work</option>
              <option value="lab">Laboratory</option>
              <option value="creative">Creative Space</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="educationLevel">What is your highest level of education?</label>
            <select
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="highschool">High School</option>
              <option value="associate">Associate's Degree</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD or Higher</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Get Career Suggestions
          </button>
        </form>
      </div>
    </div>
  );
};

export default Basic;
