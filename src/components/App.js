import React from 'react';
import Navbar from './Navbar';
import NewsList from './NewList/NewsList';
import NewsAddForm from './NewsAddForm';
import NewsFilter from './NewsFilter';
function App(props) {
  return (
    <div className='app'>
      <Navbar />
      <div className='content'>
        <NewsList />
        <div className='content__page'>
          <NewsAddForm />
          <NewsFilter />
        </div>
      </div>
    </div>
  );
}

export default App;