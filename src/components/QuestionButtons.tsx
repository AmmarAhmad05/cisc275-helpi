import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="question-buttons">
      <div className="question-block">
        <button onClick={() => navigate('/basic')}>Basic Questions</button>
        <div className="bubble">Questions based on interests and preferences</div>
      </div>
      <div className="question-block">
        <button onClick={() => navigate('/detailed')}>Detailed Questions</button>
        <div className="bubble">In-depth career analysis for tailored advice</div>
      </div>
    </div>
  );
};

export default QuestionButtons;
