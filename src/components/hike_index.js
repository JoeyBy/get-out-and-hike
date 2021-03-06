import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { geolocated } from 'react-geolocated';
import _ from 'lodash';

// actions import
import { fetchHikes } from '../actions/hikes';

// component import
import HikeListItem from './hike_list_item';

// define component
class HikeIndex extends Component {
	geoHikeSearch(){
		const {longitude, latitude} = this.props.coords;
		this.props.fetchHikes(longitude, latitude);
	};

	renderHikeList(){
		const { hikes } = this.props;
		console.log(hikes);
		return _.map(hikes, (hike) => {
			return(
				<HikeListItem 
					hike={hike}
					key={hike.unique_id}
				/>
			)
		});
	}

	render(){
		if(!this.props.isGeolocationAvailable && !this.props.isGeolocationEnabled){
  		return(
  			<div className="index align-middle">
  				<div>Geolocation not available</div>
					<div>Search Bar --- Hooked up to action for doing hike by city search</div>
  			</div>
  		);
  	} else {
			if(Object.keys(this.props.hikes).length < 1 && this.props.coords){
				this.geoHikeSearch();
				return(
					<div className="loader">
						<p className="text-xs-center align-middle">Loading your hikes</p>
						<div className="loading"></div>
					</div>
				);
			} else if (Object.keys(this.props.hikes).length >= 1){
				return(
					<div className="container index"> 
						<h1>Hikes near you</h1>
						<div className="row">
							{this.renderHikeList()}
						</div>
	  			</div>
	  		);	
			} else {
				return(
					<div className="loader">
						<p className="text-xs-center">Loading your hikes</p>
						<div className="loading"></div>
					</div>
				);
			}
  	}
	}
}


function mapStateToProps(state){
	return { hikes: state.hikes};
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000
})(
	connect(mapStateToProps, { fetchHikes })(HikeIndex)
);


