import { useState, useEffect } from 'react';

const Autocomplete = ({
  onBlur,
  placeholder,
  inputValue,
  setInputValue,
  data,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (inputValue) {
      const filteredSuggestions = data.filter((country) =>
        country.toLowerCase().startsWith(inputValue.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, data]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = (suggestion) => {
    onBlur(suggestion);
    setInputValue(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // Enter key
      setInputValue(suggestions[activeSuggestion]);
      setActiveSuggestion(0);
      setShowSuggestions(false);
    } else if (e.keyCode === 38) {
      // Up arrow
      if (activeSuggestion === 0) return;
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      // Down arrow
      if (activeSuggestion - 1 === suggestions.length) return;
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const renderSuggestions = () => {
    if (showSuggestions && inputValue) {
      if (suggestions.length) {
        return (
          <ul className='fixed bg-white border border-gray-50 shadow-md max-h-56 overflow-y-scroll'>
            {suggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestion) {
                className = 'suggestion-active';
              }
              return (
                <li
                  className={
                    'px-4 py-2 cursor-pointer m-2 hover:bg-gray-100 ' +
                    className
                  }
                  key={suggestion}
                  onClick={() => handleClick(suggestion)}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      }
      // else {
      //   return (
      //     <div className='no-suggestions'>
      //       <em>No suggestions available</em>
      //     </div>
      //   );
      // }
    }
    return null;
  };

  return (
    <div className='autocomplete w-full'>
      <input
        type='text'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setTimeout(() => {
            setShowSuggestions(false);
          }, 150);
          setTimeout(() => {
            onBlur(inputValue);
          }, 500);
        }}
        value={inputValue}
        placeholder={placeholder}
        className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500'
      />
      {renderSuggestions()}
    </div>
  );
};

export default Autocomplete;
