import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class AlbumItem extends Component {

	render(){
		return(
			<div className="album-item flex-row">
        <div className="album-img-cont flex-row flex-center">
          <img src={this.props.data.strAlbumThumb} alt={this.props.data.strAlbum + " Image"} className="album-img" />
        </div>
        <div className="album-data">
          <div className="album-name">
            {this.props.data.strAlbum}
          </div>
          <div className="track-btn-cont">
            <Link to={{ pathname: window.location.pathname + "/" + this.props.data.strAlbum.toLowerCase().replace(/\s/g, '-'), state: {albumData: this.props.data} }} className="view-tracks-btn">View Tracks</Link>
          </div>
        </div>
      </div>
		);
	}
}