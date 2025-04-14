import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

interface BasicAssessmentState {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
}

const Basic: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BasicAssessmentState>({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Basic Questions Completed!", { duration: 3000 });
    console.log('Basic Assessment Data:', formData);
    navigate('/results');
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h3>Question 1</h3>
            <div className="form-group">
              <label htmlFor="question1">[Your question text here]</label>
              <input
                type="text"
                id="question1"
                name="question1"
                value={formData.question1}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h3>Question 2</h3>
            <div className="form-group">
              <label htmlFor="question2">[Your question text here]</label>
              <input
                type="text"
                id="question2"
                name="question2"
                value={formData.question2}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h3>Question 3</h3>
            <div className="form-group">
              <label htmlFor="question3">[Your question text here]</label>
              <input
                type="text"
                id="question3"
                name="question3"
                value={formData.question3}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <h3>Question 4</h3>
            <div className="form-group">
              <label htmlFor="question4">[Your question text here]</label>
              <input
                type="text"
                id="question4"
                name="question4"
                value={formData.question4}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="form-step">
            <h3>Question 5</h3>
            <div className="form-group">
              <label htmlFor="question5">[Your question text here]</label>
              <input
                type="text"
                id="question5"
                name="question5"
                value={formData.question5}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page">
      <Header />
      <div className="assessment-container">
        <h2>Basic Career Assessment</h2>
        <p className="subtitle">Answer these simple questions to begin your career discovery journey.</p>
        <form onSubmit={handleSubmit} className="assessment-form">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(currentStep / 5) * 100}%` }}></div>
          </div>
          {renderStep()}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="nav-button">
                Previous
              </button>
            )}
            {currentStep < 5 ? (
              <button type="button" onClick={nextStep} className="nav-button">
                Next
              </button>
            ) : (
              <button type="submit" className="submit-button">
                Get Basic Career Suggestions
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Basic;
