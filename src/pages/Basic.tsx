import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import '../styles/shared.css';

interface Question {
  title: string;
  response: string | string[] | number;
}

interface BasicAssessmentState {
  question1: Question;
  question2: Question;
  question3: Question;
  question4: Question;
  question5: Question;
  question6: Question;
  question7: Question;
  question8: Question;
  question9: Question;
  question10: Question;
}

const Basic: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BasicAssessmentState>({
    question1: { title: "Do you currently have a job?", response: "" },
    question2: { title: "What is your highest level of education completed?", response: "" },
    question3: { title: "Which of the following fields are you most interested in?", response: [] },
    question4: { title: "On a scale of 1 to 10, how satisfied are you with your current career direction?", response: 0 },
    question5: { title: "What motivates you most in a job?", response: "" },
    question6: { title: "Are you open to relocating for a job?", response: "" },
    question7: { title: "Which type of work environment do you prefer?", response: "" },
    question8: { title: "What's your current employment status?", response: "" },
    question9: { title: "What are your biggest job search challenges?", response: [] },
    question10: { title: "How soon are you looking to start a new job?", response: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: { ...prev[name as keyof BasicAssessmentState], response: value },
    }));
  };

  const handleMultipleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => {
      const currentValue = prev[name as keyof BasicAssessmentState].response;

      if (Array.isArray(currentValue)) {
        let newValue = [...currentValue];
        if (checked) {
          newValue.push(value);
        } else {
          newValue = newValue.filter((item: string) => item !== value);
        }
        return { ...prev, [name]: { ...prev[name as keyof BasicAssessmentState], response: newValue } };
      } else {
        let newValue = checked ? [value] : [];
        return { ...prev, [name]: { ...prev[name as keyof BasicAssessmentState], response: newValue } };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Basic Questions Completed!", { duration: 3000 });
    navigate('/results', { state: { formData } });
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h3>{formData.question1.title}</h3>
            <div className="form-group">
              <label htmlFor="question1">Do you currently have a job?</label>
              <input
                type="radio"
                id="yes1"
                name="question1"
                value="Yes"
                checked={formData.question1.response === 'Yes'}
                onChange={handleChange}
              />
              <label htmlFor="yes1">Yes</label>
              <input
                type="radio"
                id="no1"
                name="question1"
                value="No"
                checked={formData.question1.response === 'No'}
                onChange={handleChange}
              />
              <label htmlFor="no1">No</label>
              <input
                type="radio"
                id="notSure1"
                name="question1"
                value="Not Sure"
                checked={formData.question1.response === 'Not Sure'}
                onChange={handleChange}
              />
              <label htmlFor="notSure1">Not Sure</label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h3>{formData.question2.title}</h3>
            <div className="form-group">
              <label htmlFor="question2">Select your education level</label>
              <select
                id="question2"
                name="question2"
                value={formData.question2.response as string}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="High School Diploma or GED">High School Diploma or GED</option>
                <option value="Some College">Some College</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate or Professional Degree">Doctorate or Professional Degree</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h3>{formData.question3.title}</h3>
            <div className="form-group">
              <label htmlFor="question3">Check all that apply:</label>
              <input
                type="checkbox"
                id="tech"
                name="question3"
                value="Technology & IT"
                checked={(formData.question3.response as string[]).includes('Technology & IT')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="tech">Technology & IT</label>
              <input
                type="checkbox"
                id="healthcare"
                name="question3"
                value="Healthcare & Medicine"
                checked={(formData.question3.response as string[]).includes('Healthcare & Medicine')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="healthcare">Healthcare & Medicine</label>
              <input
                type="checkbox"
                id="business"
                name="question3"
                value="Business & Finance"
                checked={(formData.question3.response as string[]).includes('Business & Finance')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="business">Business & Finance</label>
              <input
                type="checkbox"
                id="arts"
                name="question3"
                value="Arts & Design"
                checked={(formData.question3.response as string[]).includes('Arts & Design')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="arts">Arts & Design</label>
              <input
                type="checkbox"
                id="notSure3"
                name="question3"
                value="Not Sure"
                checked={(formData.question3.response as string[]).includes('Not Sure')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="notSure">Not Sure</label>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <h3>{formData.question4.title}</h3>
            <div className="form-group">
              <label htmlFor="question4">Satisfaction Level</label>
              <input
                type="number"
                id="question4"
                name="question4"
                value={formData.question4.response as number}
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
            <h3>{formData.question5.title}</h3>
            <div className="form-group">
              <label htmlFor="question5">Select your main motivation:</label>
              <select
                id="question5"
                name="question5"
                value={formData.question5.response as string}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Salary and benefits">Salary and benefits</option>
                <option value="Making a difference">Making a difference</option>
                <option value="Job stability">Job stability</option>
                <option value="Opportunities for growth">Opportunities for growth</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="form-step">
            <h3>{formData.question6.title}</h3>
            <div className="form-group">
            <label htmlFor="question6">Are you open to relocating for a job?</label>
              <input
                type="radio"
                id="yes6"
                name="question6"
                value="Yes"
                checked={formData.question6.response === 'Yes'}
                onChange={handleChange}
              />
              <label htmlFor="yes6">Yes</label>
              <input
                type="radio"
                id="no6"
                name="question6"
                value="No"
                checked={formData.question6.response === 'No'}
                onChange={handleChange}
              />
              <label htmlFor="no6">No</label>
              <input
                type="radio"
                id="notSure6"
                name="question6"
                value="Not Sure"
                checked={formData.question6.response === 'Not Sure'}
                onChange={handleChange}
              />
              <label htmlFor="notSure6">Not Sure</label>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="form-step">
            <h3>{formData.question7.title}</h3>
            <div className="form-group">
              <label htmlFor="question7">Select your preferred work environment:</label>
              <select
                id="question7"
                name="question7"
                value={formData.question7.response as string}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Office-based">Office-based</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="form-step">
            <h3>{formData.question8.title}</h3>
            <div className="form-group">
              <label htmlFor="question8">Select your employment status:</label>
              <select
                id="question8"
                name="question8"
                value={formData.question8.response as string}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Employed full-time">Employed full-time</option>
                <option value="Employed part-time">Employed part-time</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="form-step">
            <h3>{formData.question9.title}</h3>
            <div className="form-group">
              <label>Check all that apply:</label>
              <input
                type="checkbox"
                id="resume"
                name="question9"
                value="Writing a strong resume"
                checked={(formData.question9.response as string[]).includes('Writing a strong resume')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="resume">Writing a strong resume</label>
              <input
                type="checkbox"
                id="interview"
                name="question9"
                value="Interviewing"
                checked={(formData.question9.response as string[]).includes('Interviewing')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="interview">Interviewing</label>
              <input
                type="checkbox"
                id="finding_jobs"
                name="question9"
                value="Finding the right jobs"
                checked={(formData.question9.response as string[]).includes('Finding the right jobs')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="finding_jobs">Finding the right jobs</label>
              <input
                type="checkbox"
                id="experience"
                name="question9"
                value="Lack of experience"
                checked={(formData.question9.response as string[]).includes('Lack of experience')}
                onChange={handleMultipleChoiceChange}
              />
              <label htmlFor="experience">Lack of experience</label>
              <input
                type="checkbox"
                id="notSure9"
                name="question9"
                value="Not Sure"
                checked={(formData.question9.response as string[]).includes('Not Sure')}
                onChange={handleChange}
              />
              <label htmlFor="notSure9">Not Sure</label>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="form-step">
            <h3>{formData.question10.title}</h3>
            <div className="form-group">
              <label htmlFor="question10">Select your job start timeframe:</label>
              <select
                id="question10"
                name="question10"
                value={formData.question10.response as string}
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
    <div className="career-helpi-app">
      <Header />
      <div className="page-container">
        <h2>Basic Career Assessment</h2>
        <p className="subtitle" style={{ textAlign: 'center', color: '#4a5568', marginBottom: 32 }}>
          Answer these simple questions to begin your career discovery journey.
        </p>
        <div className="card">
          <form onSubmit={handleSubmit} className="assessment-form">
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(currentStep / 10) * 100}%` }}></div>
            </div>
            {renderStep()}
            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} className="button button-secondary">
                  Previous
                </button>
              )}
              {currentStep < 10 ? (
                <button type="button" onClick={nextStep} className="button button-primary">
                  Next
                </button>
              ) : (
                <button type="submit" className="button button-primary">
                  Get Basic Career Suggestions
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Basic;
