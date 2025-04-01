import React, { useState } from 'react';
import Header from '../components/Header';
import NavLinks from '../components/NavLinks';
import SearchBar from '../components/SearchBar';
import QuestionButtons from '../components/QuestionButtons';
import Footer from '../components/Footer';

// Local storage setup for API key
let keyData = '';
const saveKeyData = 'MYKEY';
const prevKey = localStorage.getItem(saveKeyData);

if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

const Home: React.FC = () => {
  const [key, setKey] = useState<string>(keyData);

  const handleSubmit = () => {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  };

  const changeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  return (
    <div className="career-helpi-app">
      <Header />
      <div className="tabs">
        <button>Chat</button>
        <button>Prompt</button>
      </div>
      <div className="main-content">
        <h1>Welcome to Career Helpi</h1>
        <div className="welcome-box">
          <SearchBar />
          <QuestionButtons />
        </div>
        <Footer />
        <NavLinks />
        <div style={{ marginTop: '40px' }}>
          <label>API Key:</label>
          <input
            type="password"
            placeholder="Insert API Key Here"
            value={key}
            onChange={changeKey}
            style={{
              padding: '8px',
              marginLeft: '10px',
              marginRight: '10px',
              border: '1px solid black',
              borderRadius: '8px',
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: '8px 16px',
              fontWeight: 'bold',
              border: '2px solid black',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
