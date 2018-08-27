import React, { Component } from 'react';
import $ from 'jquery';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import './App.css';
import ArtistItem from './ArtistItem';
import Loader from './Loader';

export default class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {searchString: '', artistData: [], noResults: false, currentPage: 1, pageSize: 10};
    this.updateSearchString = this.updateSearchString.bind(this);
    this.changePage = this.changePage.bind(this);
    this.getArtistData = this.getArtistData.bind(this);
    this.populateArtistData = this.populateArtistData.bind(this);
  }

  updateSearchString(e){
    var searchString = e.currentTarget.value;
    this.setState({ searchString: searchString });
  }

  changePage(page){
    this.setState({ currentPage: page });
  }

  getArtistData(){
    if(this.state.searchString){
      $('#loader').removeClass('hidden');
      $.ajax({
        url: 'https://www.theaudiodb.com/api/v1/json/1/search.php',
        type: 'GET',
        data: {s: this.state.searchString},
        crossOrigin: true
      }).then((data) => {
          $('#loader').addClass('hidden');
          if(data.artists){
            this.setState({ artistData: data.artists, noResults: false });
          }
          else{
            this.setState({ artistData: [], noResults: true });
          }
        });
    }
    else{
      this.setState({ artistData: [], noResults: false });
    }
  }

  populateArtistData(){
    if(this.state.artistData && this.state.artistData.length){
      var artistData = [];
      var endValue = (this.state.currentPage*10) < this.state.artistData.length ? (this.state.currentPage*10) : this.state.artistData.length;
      for(var i=(this.state.currentPage-1)*10;i < endValue;i++){
        artistData.push(<ArtistItem data={this.state.artistData[i]} />);
      }
      return(
        <div id="artists-container" className="flex-column">
          {artistData}
          <Pagination onChange={this.changePage} showTitle={false} current={this.state.currentPage} pageSize={this.state.pageSize} total={this.state.artistData.length} />
        </div>
      );
    }
    else if(this.state.artistData && !this.state.artistData.length && this.state.noResults){
      return(
        <div id="no-results-cont">
          Sorry! No Results Found
        </div>
      );
    }
    return;
  }

  render() {
    return (
      <div>
        <header id="header" className="flex-column">
          <h1 id="title">Musicly</h1>
          <div id="search-bar-container" className="flex-row flex-center">
            <input type="search" id="search-bar" placeholder="Search for artists" value={this.state.searchString} onChange={this.updateSearchString} />
            <button type="button" id="search-btn" onClick={this.getArtistData}><img src="search.svg" alt="Search Icon" height="16px" width="16px" /></button>
          </div>
        </header>
        <section className="flex-row flex-center">
          {this.populateArtistData()}
        </section>
        <Loader />
      </div>
    );
  }
}
