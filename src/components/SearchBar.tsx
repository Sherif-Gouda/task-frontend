import React, { useState, ChangeEvent } from 'react';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { searchTask } from '../features/taskSlice';

const SearchBar = () => {
    const [searchText, setSearchText] = useState<string>('');
    const dispatch: AppDispatch = useDispatch()
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    };
    
    const handleClick = ()=>{
      dispatch(searchTask(searchText))
      setSearchText('')
    }
    return (
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for a task by title or description..."
          value={searchText}
          onChange={handleSearch}
          className="search-input"
        />
        <button className="search-button" onClick={handleClick}>Search</button>
      </div>
    );
  };
  
  export default SearchBar;
