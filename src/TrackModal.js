import React, { Component } from 'react';
import $ from 'jquery';

export default class TrackModal extends Component {
	
	constructor(props){
		super(props);
		this.state = {albumData: '', trackData: []};
		this.closeModal = this.closeModal.bind(this);
		this.getTrackDuration = this.getTrackDuration.bind(this);
		this.populateTracks = this.populateTracks.bind(this);
	}

	componentDidMount(){
		this.setState({ albumData: this.props.location.state.albumData });
    $('#loader').removeClass('hidden');
		$.ajax({
			url: 'https://www.theaudiodb.com/api/v1/json/1/track.php',
			type: 'GET',
			data: {m: this.props.location.state.albumData.idAlbum},
			crossOrigin: true
		}).then((data) => {
      	$('#loader').addClass('hidden');
				this.setState({ trackData: data.track });
			});
	}

	closeModal(e){
		e.stopPropagation();
		if(e.target.className.indexOf('overlay') > -1 || e.target.id === "close-btn"){
			window.history.back();
		}
	}

	getTrackDuration(duration){
		var trackDuration = parseInt(duration, 10)/60000;
		return(
			<div className="track-duration">{trackDuration.toFixed(2).replace('.', ':')}</div>
		);
	}

	populateTracks(){
		var trackData = [];
		for(var i=0;i < this.state.trackData.length;i++){
			trackData.push(
				<div className="track-item flex-row">
					<div className="track-name">{this.state.trackData[i].strTrack}</div>
					{this.getTrackDuration(this.state.trackData[i].intDuration)}
				</div>
			);
		}
		return(
			<div id="track-cont">
				{trackData}
			</div>
		);
	}

	render(){
		if(this.state.trackData && this.state.trackData.length){
			return(
				<div className="overlay flex-row flex-center" onClick={this.closeModal}>
					<div className="modal">
						<div className="modal-title flex-row">
							<h2>Tracks List</h2>
							<div id="close-btn" onClick={this.closeModal}>x</div>
						</div>
						{this.populateTracks()}
					</div>
				</div>
			);
		}
		else{
			return(
				<div className="overlay">
				</div>
			);
		}
	}
}