import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import OpenAI from 'openai';

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

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!formData) return;

      const savedKey = localStorage.getItem("MYKEY");
      if (!savedKey) {
        setSuggestions("API key not found. Please enter your key on the home page.");
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
              role: "user",
              content: `Based on the following career assessment, suggest a few ideal career paths:\n\n${summary}`,
            },
          ],
        });

        const message = completion.choices[0].message.content;
        setSuggestions(message || "No suggestions received.");
      } catch (error) {
        console.error("Failed to fetch career suggestions:", error);
        setSuggestions("Failed to fetch career suggestions.");
      }
    };

    fetchSuggestions();
  }, [formData]);

  return (
    <div className="page">
      <Header />
      <h2>Results Page</h2>
      {formData ? (
        <div>
          <p>Here are your responses:</p>
          <ul>
            {Object.entries(formData).map(([key, { title, response }]) => (
              <li key={key}>
                <strong>{title}:</strong> {Array.isArray(response) ? response.join(", ") : response}
              </li>
            ))}
          </ul>
          <h3>Career Suggestions</h3>
          <p>{suggestions}</p>
        </div>
      ) : (
        <p>No data available. Please complete the assessment first.</p>
      )}
    </div>
  );
};

export default Results;
