import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

interface BasicAssessmentState {
  question1: string;
  question2: string;
  question3: string[];
  question4: number;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
  question9: string[];
  question10: string;
}

const Basic: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BasicAssessmentState>({
    question1: '',
    question2: '',
    question3: [],
    question4: 0,
    question5: '',
    question6: '',
    question7: '',
    question8: '',
    question9: [],
    question10: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultipleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => {
      const currentValue = prev[name as keyof BasicAssessmentState];

      if (Array.isArray(currentValue)) {
        let newValue = [...currentValue];
        if (checked) {
          newValue.push(value);
        } else {
          newValue = newValue.filter((item: string) => item !== value);
        }
        return { ...prev, [name]: newValue };
      } else {
        let newValue = checked ? [value] : [];
        return { ...prev, [name]: newValue };
      }
    });
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
            <h3>Do you currently have a job?</h3>
            <div className="form-group">
              <input
                type="radio"
                id="yes1"
                name="question1"
                value="Yes"
                checked={formData.question1 === 'Yes'}
                onChange={handleChange}
              />
              <label htmlFor="yes1">Yes</label>
              <input
                type="radio"
                id="no1"
                name="question1"
                value="No"
                checked={formData.question1 === 'No'}
                onChange={handleChange}
              />
              <label htmlFor="no1">No</label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h3>What is your highest level of education completed?</h3>
            <div className="form-group">
              <label htmlFor="question2">Select your education level</label>
              <select
                id="question2"
                name="question2"
                value={formData.question2}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="High School Diploma or GED">High School Diploma or GED</option>
                <option value="Some College">Some College</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate or Professional Degree">Doctorate or Professional Degree</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h3>Which of the following fields are you most interested in?</h3>
            <div className="form-group">
              <label>Check all that apply:</label>
              <input
                type="checkbox"
                id="tech"
                name="question3"
                value="Technology & IT"
                checked={formData.question3.includes('Technology & IT')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="tech">Technology & IT</label>
              <input
                type="checkbox"
                id="healthcare"
                name="question3"
                value="Healthcare & Medicine"
                checked={formData.question3.includes('Healthcare & Medicine')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="healthcare">Healthcare & Medicine</label>
              <input
                type="checkbox"
                id="business"
                name="question3"
                value="Business & Finance"
                checked={formData.question3.includes('Business & Finance')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="business">Business & Finance</label>
              <input
                type="checkbox"
                id="arts"
                name="question3"
                value="Arts & Design"
                checked={formData.question3.includes('Arts & Design')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="arts">Arts & Design</label>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <h3>On a scale of 1 to 10, how satisfied are you with your current career direction?</h3>
            <div className="form-group">
              <label htmlFor="question4">Satisfaction Level</label>
              <input
                type="number"
                id="question4"
                name="question4"
                value={formData.question4}
                onChange={handleChange}
                min="1"
                max="10"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="form-step">
            <h3>What motivates you most in a job?</h3>
            <div className="form-group">
              <label htmlFor="question5">Select your main motivation:</label>
              <select
                id="question5"
                name="question5"
                value={formData.question5}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Salary and benefits">Salary and benefits</option>
                <option value="Making a difference">Making a difference</option>
                <option value="Job stability">Job stability</option>
                <option value="Opportunities for growth">Opportunities for growth</option>
              </select>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="form-step">
            <h3>Are you open to relocating for a job?</h3>
            <div className="form-group">
              <input
                type="radio"
                id="yes6"
                name="question6"
                value="Yes"
                checked={formData.question6 === 'Yes'}
                onChange={handleChange}
              />
              <label htmlFor="yes6">Yes</label>
              <input
                type="radio"
                id="no6"
                name="question6"
                value="No"
                checked={formData.question6 === 'No'}
                onChange={handleChange}
              />
              <label htmlFor="no6">No</label>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="form-step">
            <h3>Which type of work environment do you prefer?</h3>
            <div className="form-group">
              <label htmlFor="question7">Select your preferred work environment:</label>
              <select
                id="question7"
                name="question7"
                value={formData.question7}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Office-based">Office-based</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="form-step">
            <h3>What’s your current employment status?</h3>
            <div className="form-group">
              <label htmlFor="question8">Select your employment status:</label>
              <select
                id="question8"
                name="question8"
                value={formData.question8}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Employed full-time">Employed full-time</option>
                <option value="Employed part-time">Employed part-time</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
              </select>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="form-step">
            <h3>What are your biggest job search challenges?</h3>
            <div className="form-group">
              <label>Check all that apply:</label>
              <input
                type="checkbox"
                id="resume"
                name="question9"
                value="Writing a strong resume"
                checked={formData.question9.includes('Writing a strong resume')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="resume">Writing a strong resume</label>
              <input
                type="checkbox"
                id="interview"
                name="question9"
                value="Interviewing"
                checked={formData.question9.includes('Interviewing')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="interview">Interviewing</label>
              <input
                type="checkbox"
                id="finding_jobs"
                name="question9"
                value="Finding the right jobs"
                checked={formData.question9.includes('Finding the right jobs')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="finding_jobs">Finding the right jobs</label>
              <input
                type="checkbox"
                id="experience"
                name="question9"
                value="Lack of experience"
                checked={formData.question9.includes('Lack of experience')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="experience">Lack of experience</label>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="form-step">
            <h3>How soon are you looking to start a new job?</h3>
            <div className="form-group">
              <label htmlFor="question10">Select your job start timeframe:</label>
              <select
                id="question10"
                name="question10"
                value={formData.question10}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Immediately">Immediately</option>
                <option value="Within the next 1-3 months">Within the next 1-3 months</option>
                <option value="Within 6 months">Within 6 months</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
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
            <div className="progress" style={{ width: `${(currentStep / 10) * 100}%` }}></div>
          </div>
          {renderStep()}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="nav-button">
                Previous
              </button>
            )}
            {currentStep < 10 ? (
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
