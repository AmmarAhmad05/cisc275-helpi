import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import '../styles/shared.css';

/**
 * TypeScript interface that defines the shape of our form state
 * Contains nested objects for different sections of the assessment
 */
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

/**
 * Detailed Career Assessment Component
 * Provides a multi-step form for users to complete a comprehensive career assessment
 */
const Detailed: React.FC = () => {
  // Hook for programmatic navigation
  const navigate = useNavigate();
  
  // State to track which step of the form is currently active (1-4)
  const [currentStep, setCurrentStep] = useState(1);
  
  // Initialize form data with default values
  const [formData, setFormData] = useState<DetailedAssessmentState>({
    personality: {
      extroverted: 3, // Default to middle value for all sliders
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
      workHours: '', // Empty strings for dropdowns to force selection
      workLocation: '',
      teamSize: '',
      salaryImportance: 3, // Default middle value for importance slider
    },
    experience: {
      years: '',
      industries: [], // Empty array for multiple industries
      certifications: '',
    },
  });

  /**
   * Generic change handler for form inputs
   * Handles both direct fields and nested object properties using dot notation
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      // Handle nested properties (e.g., "personality.extroverted")
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof DetailedAssessmentState],
          [field]: value
        }
      }));
    } else {
      // Handle top-level properties
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  /**
   * Form submission handler
   * Formats the collected data and navigates to the results page
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the data for display and API consumption
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

    // Create a human-readable summary of all assessment answers
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

    // Create a structured object for the results page with section titles
    const resultsData = {
      question1: { title: "Personality Assessment", response: formattedData.personality },
      question2: { title: "Skills Assessment", response: formattedData.skills },
      question3: { title: "Work Preferences", response: Object.entries(formattedData.preferences).map(([key, value]) => `${key}: ${value}`).join('\n') },
      question4: { title: "Experience & Education", response: Object.entries(formattedData.experience).map(([key, value]) => `${key}: ${value}`).join('\n') },
      summary: { title: "Complete Assessment Summary", response: summary }
    };

    // Show success notification
    toast.success("Detailed Questions Completed!", { duration: 3000 });
    
    // Log data for debugging purposes
    console.log('Detailed Assessment Data:', formData);
    
    // Navigate to results page, passing the formatted assessment data
    navigate('/results', { state: { formData: resultsData } });
  };

  /**
   * Validates if a step is completed based on required fields
   * Different validation logic for each step
   */
  const isStepAnswered = (step: number, formData: DetailedAssessmentState) => {
    switch (step) {
      case 1:
        // All personality traits must be answered (range 1-5, default is 3)
        return Object.values(formData.personality).every(val => val >= 1 && val <= 5);
      case 2:
        // All skills must be answered (range 1-5, default is 3)
        return Object.values(formData.skills).every(val => val >= 1 && val <= 5);
      case 3:
        // All preferences must be answered
        return (
          formData.preferences.workHours !== '' &&
          formData.preferences.workLocation !== '' &&
          formData.preferences.teamSize !== '' &&
          formData.preferences.salaryImportance >= 1 &&
          formData.preferences.salaryImportance <= 5
        );
      case 4:
        // All experience fields must be answered
        return (
          formData.experience.years !== '' &&
          formData.experience.industries.length > 0 &&
          formData.experience.certifications !== ''
        );
      default:
        return false;
    }
  };

  /**
   * Advances to the next step if the current step is valid
   */
  const nextStep = () => {
    if (!isStepAnswered(currentStep, formData)) {
      // Show error if current step is incomplete
      toast.error('Please complete this step to continue.');
      return;
    }
    // Clear any previous toast notifications
    toast.dismiss();
    // Move to next step
    setCurrentStep(prev => prev + 1);
  };

  /**
   * Moves back to the previous step
   */
  const prevStep = () => setCurrentStep(prev => prev - 1);

  /**
   * Renders the appropriate form fields based on the current step
   */
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        // Step 1: Personality Traits (slider inputs)
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
        // Step 2: Skills Assessment (slider inputs)
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
        // Step 3: Work Preferences (dropdown and slider inputs)
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
        // Step 4: Experience & Education (dropdown, text, and textarea inputs)
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
                  // Special handling for comma-separated industries
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
    <div className="career-helpi-app">
      {/* Header component imported from components directory */}
      <Header />
      
      {/* Main content container with centered layout */}
      <div className="page-container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          className="card"
          style={{
            maxWidth: 600,
            width: '100%',
            margin: '0 auto',
            background: '#fff',
            border: '1px solid #e5e7eb',
            boxShadow: '0 8px 32px rgba(99,102,241,0.10)',
            borderRadius: 24,
            padding: '48px 40px',
            animation: 'fadeInUp 0.8s cubic-bezier(.23,1.01,.32,1) 0.1s both', // Smooth entrance animation
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Card title and description */}
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#2c3e50', marginBottom: 8, textAlign: 'center', letterSpacing: '-1px' }}>
            Detailed Career Assessment
          </h2>
          <p style={{ color: '#4a5568', fontSize: '1.18rem', marginBottom: 32, textAlign: 'center', maxWidth: 480 }}>
            Take your time to answer these comprehensive questions for personalized career insights.
          </p>
          
          {/* Assessment form */}
          <form onSubmit={handleSubmit} className="assessment-form" style={{ width: '100%' }}>
            {/* Progress bar - visually shows completion status */}
            <div className="progress-bar" style={{ marginBottom: 32, height: 10, background: '#e5e7eb' }}>
              <div className="progress" style={{ width: `${(currentStep / 4) * 100}%`, background: 'linear-gradient(90deg, #6366f1 0%, #38bdf8 100%)', height: '100%' }}></div>
            </div>
            
            {/* Dynamic form step based on currentStep state */}
            {renderStep()}
            
            {/* Navigation buttons for moving between steps */}
            <div className="form-navigation" style={{ marginTop: 32 }}>
              {/* Only show Previous button if not on first step */}
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} className="button button-secondary" style={{ minWidth: 120 }}>
                  Previous
                </button>
              )}
              
              {/* Show Next button for steps 1-3, Submit button for final step */}
              {currentStep < 4 ? (
                <button type="button" onClick={nextStep} className="button button-primary" style={{ minWidth: 120 }}>
                  Next
                </button>
              ) : (
                <button type="submit" className="button button-primary" style={{ minWidth: 180 }}>
                  Get Detailed Career Suggestions
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      
      {/* Inline animation styling */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Detailed;