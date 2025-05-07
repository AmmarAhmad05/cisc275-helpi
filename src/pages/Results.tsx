import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import OpenAI from 'openai';
import './Results.css';

interface Question {
  title: string;
  response: string | string[] | number;
}

interface BasicAssessmentState {
  [key: string]: Question;
}

const Results: React.FC = () => {
  const location = useLocation();
  const formData = location.state?.formData as BasicAssessmentState | undefined;
  const [suggestions, setSuggestions] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!formData) return;

      const savedKey = localStorage.getItem("MYKEY");
      if (!savedKey) {
        setSuggestions("API key not found. Please enter your key on the home page.");
        setLoading(false);
        return;
      }

      const apiKey = JSON.parse(savedKey);
      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
      });

      const summary = Object.values(formData)
        .map(q => `${q.title}: ${Array.isArray(q.response) ? q.response.join(", ") : q.response}`)
        .join("\n");

      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a career guidance expert. Provide detailed career suggestions based on the assessment responses. For each career path, include the title, description, and key skills required. Format your response in a clear, structured way."
            },
            {
              role: "user",
              content: `Based on the following career assessment, suggest 3-4 ideal career paths that would be a good match:\n\n${summary}`
            }
          ],
        });

        const message = completion.choices[0].message.content;
        setSuggestions(message || "No suggestions received.");
      } catch (error) {
        console.error("Failed to fetch career suggestions:", error);
        setSuggestions("Failed to fetch career suggestions.");
      }
      setLoading(false);
    };

    fetchSuggestions();
  }, [formData]);

  // Function to parse the suggestions text into sections
  const parseSuggestions = (text: string) => {
    const sections = text.split('\n\n').filter(section => section.trim());
    return sections.map(section => {
      const lines = section.split('\n');
      const title = lines[0].replace(/^[0-9]+\.\s*/, '').trim();
      const description = lines.slice(1).join('\n').trim();
      return { title, description };
    });
  };

  return (
    <div className="results-page">
      <Header />
      <div className="results-container">
        <h2>Your Career Assessment Results</h2>
        
        {formData ? (
          <div className="results-content">
            <div className="assessment-summary">
              <h3>Your Assessment Summary</h3>
              <div className="summary-cards">
                {Object.entries(formData).map(([key, { title, response }]) => (
                  <div key={key} className="summary-card">
                    <h4>{title}</h4>
                    <p>{Array.isArray(response) ? response.join(", ") : response}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="career-suggestions">
              <h3>Career Path Suggestions</h3>
              {loading ? (
                <div className="loading">Analyzing your profile...</div>
              ) : (
                <div className="suggestion-cards">
                  {parseSuggestions(suggestions).map((suggestion, index) => (
                    <div key={index} className="suggestion-card">
                      <h4>{suggestion.title}</h4>
                      <p>{suggestion.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="no-data">
            <p>No assessment data available. Please complete the assessment first.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
