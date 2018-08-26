import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class ArtistItem extends Component {
	
	constructor(props){
		super(props);
		this.getDescription = this.getDescription.bind(this);
	}

	getDescription(){
		if(this.props.data.strBiographyEN){
			if(this.props.data.strBiographyEN.length <= 120){
				return this.props.data.strBiographyEN;
			}
			else{
				return this.props.data.strBiographyEN.substr(0, 120) + "...";
			}
		}
	}

	render(){
		return(
			<div className="artist-item flex-row">
        <div className="artist-img-cont flex-row flex-center">
          <img src={this.props.data.strArtistThumb} alt={this.props.data.strArtist + "Image"} className="artist-img" />
        </div>
        <div className="artist-data flex-column">
        	<div>
	          <div className="artist-name">
	            {this.props.data.strArtist}
	          </div>
	          <div className="artist-genre">
	          	{this.props.data.strGenre}
	          </div>
	          <div className="artist-descp">
	          	{this.getDescription()}
	          </div>
	        </div>
          <div>
          	<Link to={{ pathname: "/"+this.props.data.strArtist.toLowerCase(), state: {artistData: this.props.data} }} className="view-albums-btn">View Albums</Link>
          </div>
        </div>
      </div>
		);
	}
}