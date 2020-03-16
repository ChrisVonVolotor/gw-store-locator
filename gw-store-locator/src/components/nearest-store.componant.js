import React, { Component } from "react";
export default class NearestStore extends Component {
    	constructor(props) {
    		super(props);
    		this.state = {
    		    };
        }

    render(){
        return(
                <div>
                    <h4>{this.props.name}</h4>
                    <h5>Distance {this.props.distance} miles </h5>
                    <p>{this.props.street}</p>
                    <p>{this.props.city}</p>
                    <p>{this.props.Postcode}</p>
                    <p>{this.props.Phone}</p>
                </div>
            )
    }


}