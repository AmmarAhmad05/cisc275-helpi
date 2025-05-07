import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import OpenAI from 'openai';

interface DetailedAssessmentState {
  personality: {
    extroverted: number;
    analytical: number;
    creative: number;
    organized: number;
  };
  skills: {
    technical: number;
    communication: number;
    leadership: number;
    problemSolving: number;
  };
  preferences: {
    workHours: string;
    workLocation: string;
    teamSize: string;
    salaryImportance: number;
  };
  experience: {
    years: string;
    industries: string[];
    certifications: string;
  };
}

const Detailed: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DetailedAssessmentState>({
    personality: {
      extroverted: 3,
      analytical: 3,
      creative: 3,
      organized: 3,
    },
    skills: {
      technical: 3,
      communication: 3,
      leadership: 3,
      problemSolving: 3,
    },
    preferences: {
      workHours: '',
      workLocation: '',
      teamSize: '',
      salaryImportance: 3,
    },
    experience: {
      years: '',
      industries: [],
      certifications: '',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof DetailedAssessmentState],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // navigate to the result page
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the data for OpenAI
    const formattedData = {
      personality: Object.entries(formData.personality)
        .map(([trait, value]) => `${trait}: ${value}/5`)
        .join('\n'),
      skills: Object.entries(formData.skills)
        .map(([skill, value]) => `${skill}: ${value}/5`)
        .join('\n'),
      preferences: {
        workHours: formData.preferences.workHours,
        workLocation: formData.preferences.workLocation,
        teamSize: formData.preferences.teamSize,
        salaryImportance: `${formData.preferences.salaryImportance}/5`
      },
      experience: {
        years: formData.experience.years,
        industries: formData.experience.industries.join(', '),
        certifications: formData.experience.certifications
      }
    };

    // Create a summary string for OpenAI
    const summary = `
Personality Assessment:
${formattedData.personality}

Skills Assessment:
${formattedData.skills}

Work Preferences:
- Work Hours: ${formattedData.preferences.workHours}
- Work Location: ${formattedData.preferences.workLocation}
- Team Size: ${formattedData.preferences.teamSize}
- Salary Importance: ${formattedData.preferences.salaryImportance}

Experience & Education:
- Years of Experience: ${formattedData.experience.years}
- Industries: ${formattedData.experience.industries}
- Certifications: ${formattedData.experience.certifications}
    `.trim();

    // Create a structured object for the results page
    const resultsData = {
      question1: { title: "Personality Assessment", response: formattedData.personality },
      question2: { title: "Skills Assessment", response: formattedData.skills },
      question3: { title: "Work Preferences", response: Object.entries(formattedData.preferences).map(([key, value]) => `${key}: ${value}`).join('\n') },
      question4: { title: "Experience & Education", response: Object.entries(formattedData.experience).map(([key, value]) => `${key}: ${value}`).join('\n') }
    };

    toast.success("Detailed Questions Completed!", { duration: 3000 });
    console.log('Detailed Assessment Data:', formData);
    navigate('/results', { state: { formData: resultsData } });
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h3>Personality Traits</h3>
            <p>Rate yourself on the following traits (1-5):</p>
            {Object.entries(formData.personality).map(([trait, value]) => (
              <div key={trait} className="form-group">
                <label htmlFor={`personality.${trait}`}>
                  {trait.charAt(0).toUpperCase() + trait.slice(1)}:
                </label>
                <input
                  type="range"
                  id={`personality.${trait}`}
                  name={`personality.${trait}`}
                  min="1"
                  max="5"
                  value={value}
                  onChange={handleChange}
                />
                <span className="value-display">{value}</span>
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h3>Skills Assessment</h3>
            <p>Rate your proficiency in the following skills (1-5):</p>
            {Object.entries(formData.skills).map(([skill, value]) => (
              <div key={skill} className="form-group">
                <label htmlFor={`skills.${skill}`}>
                  {skill.charAt(0).toUpperCase() + skill.slice(1)}:
                </label>
                <input
                  type="range"
                  id={`skills.${skill}`}
                  name={`skills.${skill}`}
                  min="1"
                  max="5"
                  value={value}
                  onChange={handleChange}
                />
                <span className="value-display">{value}</span>
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h3>Work Preferences</h3>
            <div className="form-group">
              <label htmlFor="preferences.workHours">Preferred Work Hours:</label>
              <select
                id="preferences.workHours"
                name="preferences.workHours"
                value={formData.preferences.workHours}
                onChange={handleChange}
                required
              >
                <option value="">Select an option</option>
                <option value="standard">Standard 9-5</option>
                <option value="flexible">Flexible Hours</option>
                <option value="shift">Shift Work</option>
                <option value="parttime">Part-time</option>
                <option value="notSure">Not Sure</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="preferences.workLocation">Preferred Work Location:</label>
              <select
                id="preferences.workLocation"
                name="preferences.workLocation"
                value={formData.preferences.workLocation}
                onChange={handleChange}
                required
              >
                <option value="">Select an option</option>
                <option value="office">Office</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="field">Field Work</option>
                <option value="notSure">Not Sure</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="preferences.teamSize">Preferred Team Size:</label>
              <select
                id="preferences.teamSize"
                name="preferences.teamSize"
                value={formData.preferences.teamSize}
                onChange={handleChange}
                required
              >
                <option value="">Select an option</option>
                <option value="solo">Solo Work</option>
                <option value="small">Small Team (2-5)</option>
                <option value="medium">Medium Team (6-15)</option>
                <option value="large">Large Team (16+)</option>
                <option value="notSure">Not Sure</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="preferences.salaryImportance">Salary Importance (1-5):</label>
              <input
                type="range"
                id="preferences.salaryImportance"
                name="preferences.salaryImportance"
                min="1"
                max="5"
                value={formData.preferences.salaryImportance}
                onChange={handleChange}
              />
              <span className="value-display">{formData.preferences.salaryImportance}</span>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <h3>Experience & Education</h3>
            <div className="form-group">
              <label htmlFor="experience.years">Years of Experience:</label>
              <select
                id="experience.years"
                name="experience.years"
                value={formData.experience.years}
                onChange={handleChange}
                //required
              >
                <option value="">Select an option</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="10+">10+ years</option>
                <option value="notSure">Not Sure</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="experience.industries">Previous Industries (comma-separated):</label>
              <input
                type="text"
                id="experience.industries"
                name="experience.industries"
                value={formData.experience.industries.join(', ')}
                onChange={(e) => {
                  const industries = e.target.value.split(',').map(i => i.trim());
                  setFormData(prev => ({
                    ...prev,
                    experience: {
                      ...prev.experience,
                      industries
                    }
                  }));
                }}
                placeholder="e.g., Technology, Healthcare, Finance"
              />
            </div>
            <div className="form-group">
              <label htmlFor="experience.certifications">Relevant Certifications:</label>
              <textarea
                id="experience.certifications"
                name="experience.certifications"
                value={formData.experience.certifications}
                onChange={handleChange}
                placeholder="List any relevant certifications or qualifications"
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
        <h2>Detailed Career Assessment</h2>
        <p className="subtitle">Take your time to answer these comprehensive questions for personalized career insights.</p>
        <form onSubmit={handleSubmit} className="assessment-form">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
          </div>
          {renderStep()}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="nav-button">
                Previous
              </button>
            )}
            {currentStep < 4 ? (
              <button type="button" onClick={nextStep} className="nav-button">
                Next
              </button>
            ) : (
              <button type="submit" className="submit-button">
                Get Detailed Career Suggestions
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Detailed;
