import React, { useEffect, useState } from 'react';
import './App.css';

const LOCAL_STORAGE_KEY = 'quote.ye'

const App = () => {
  const [quote, setQuote] = useState({quote: 'Please generate yourself a quote!'})
  const [quotesGenerated, setQuotesGenerated] = useState(0)

  useEffect(() => {
    document.title = 'Ye Quote';
  }, []);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) === null ) {
      localStorage.setItem(LOCAL_STORAGE_KEY, 0)
    }
    const storedQuoteCount = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY))
    setQuotesGenerated(storedQuoteCount)
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, quotesGenerated)

  }, [quotesGenerated])

  const getQuote = () => {
    setQuotesGenerated(quotesGenerated + 1) 
    fetch('https://api.kanye.rest/')
    .then(result => result.json())
    .then(
      data => setQuote(data)
    )
  }

  const resetQuoteCount = () => {
    setQuotesGenerated(0)
  }

  //localStorage.setItem(LOCAL_STORAGE_KEY, 0)
  //console.log(quote)

  return (
    <div className="App">
      <div className='container'>
        <h1>{quote.quote}</h1>
      </div>
      <div className='container2'> 
        <button className='newQuoteButton' onClick={getQuote}>New quote</button>
      </div>
      <div className='container3'>
        <button className='resetButton' onClick={resetQuoteCount}>
            <h2>You have been blessed with {quotesGenerated} {quotesGenerated === 1 ? 'quote' : 'quotes'}!</h2>
        </button>
      </div>
    </div>
  );
}

export default App;
