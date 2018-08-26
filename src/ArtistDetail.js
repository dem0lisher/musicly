import React, { Component } from 'react';
import $ from 'jquery';
import { Route } from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import './ArtistDetail.css';
import AlbumItem from './AlbumItem';
import TrackModal from './TrackModal';
import Loader from './Loader';

export default class ArtistDetail extends Component {
	
	constructor(props){
		super(props);
		this.state = {artistData: '', albumData: [], currentPage: 1, pageSize: 10};
		this.changePage = this.changePage.bind(this);
		this.populateAlbumData = this.populateAlbumData.bind(this);
		this.goBack = this.goBack.bind(this);
	}

	componentDidMount(){
		this.setState({ artistData: this.props.location.state.artistData });
    $('#loader').removeClass('hidden');
		$.ajax({
			url: 'https://www.theaudiodb.com/api/v1/json/1/searchalbum.php',
			type: 'GET',
			data: {s: this.props.match.params.artist},
			crossOrigin: true
		}).then((data) => {
      	$('#loader').addClass('hidden');
				this.setState({ albumData: data.album });
			});
	}

	changePage(page){
		this.setState({ currentPage: page });
	}

	populateAlbumData(){
		if(this.state.albumData && this.state.albumData.length){
			var albumData = [];
			var endValue = (this.state.currentPage*10) < this.state.albumData.length ? (this.state.currentPage*10) : this.state.albumData.length;
			for(var i=(this.state.currentPage-1)*10;i < endValue;i++){
				albumData.push(<AlbumItem data={this.state.albumData[i]} />);
			}
			return(
				<div id="album-data-cont">
					<h1 id="album-heading">Albums</h1>
					<div id="album-container">
						{albumData}
					</div>
					<Pagination onChange={this.changePage} showTitle={false} current={this.state.currentPage} pageSize={this.state.pageSize} total={this.state.albumData.length} />
				</div>
			);
		}
		return;
	}

	goBack(){
		window.history.back();
	}

	render(){
		if(this.state.artistData){
			return(
				<section id="artist-detail-section" className="flex-row flex-center">
					<div id="artist-detail-cont">
						<div id="back-btn-cont">
							<button type="button" id="back-btn" onClick={this.goBack}><img src="scroll-arrow-to-left.svg" className="back-icon" alt="Back Icon" />Back</button>
						</div>
						<div id="artist-data-cont" className="flex-row">
							<div className="artist-img-cont">
			          <img src={this.state.artistData.strArtistThumb} alt={this.state.artistData.strArtist + "Image"} className="artist-img" />
			        </div>
			        <div className="artist-data">
			          <div className="artist-name">
			            {this.state.artistData.strArtist}
			          </div>
			          <div className="artist-genre">
			          	{this.state.artistData.strGenre}
			          </div>
			        </div>
						</div>
						{this.populateAlbumData()}
					</div>
					<Route path='/:artist/:album' component={TrackModal} />
					<Loader />
				</section>
			);
		}
		else{
			return(
				<div>
					<Loader />
				</div>
			);
		}
	}
}