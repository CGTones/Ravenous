import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
      
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlesortByChange = this.handleSortByChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count',
      'Distance': 'distance'
    };          
  }
        
  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    }
    return '';
  }
  
  // additional functionality added on lines 38. and 39. to automatically handle results upon a change in sorting option 
  // **troubleshoot** 
  //   1.) method isn't returning results in proper order 
  handleSortByChange(sortByOption) { 
    this.setState({ sortBy: sortByOption }, () => {
      if (this.state.term && this.state.location) {
        this.props.searchYelp(this.state.term, this.state.location, sortByOption);
      }
    });
  }

  // handles business name (term) input from the user
  handleTermChange(e) {
    // updates state
    this.setState({ term: e.target.value });
  }

  // handles location input from the user
  handleLocationChange(e) {
    // updates state
    this.setState({ location: e.target.value });
  }

  
  
  handleSearch(e) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    
    // e.preventDefault();
  }
  
  // --addtional feature-- sortByDistance method  **troubleshoot**
  handleSortByDistance(e) {
    
  }
  
  // --additional feature-- onKeyPress Enter method 
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }

  // provides visual feedback/confirmation on sorting option that has been chosen by highlighting the chosen sorting option
  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return <li className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>;
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} />
          <input placeholder="Where?" onChange={this.handleLocationChange} onKeyPress={this.handleKeyPress} />
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>Let's Go</a>
        </div>
      </div>
    );
  }
};

export default SearchBar;