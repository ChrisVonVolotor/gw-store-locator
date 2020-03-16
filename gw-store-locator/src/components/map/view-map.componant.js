import React, { Component } from "react";
import axios from "axios";

export default class LocationMap extends Component {
    	constructor(props) {
    		super(props);
    		this.state = {
                    locationMap:""
    		    };
        }

        componentDidMount(){
                        let locationString = "";

                        this.props.stores.forEach((store,index) => {
                            locationString+="pp="+store.Latitude+","+store.Longitude+";;"+(index+1)+"&";
                        })
                        console.log(locationString);
                        axios
                            .get("https://dev.virtualearth.net/REST/v1/Imagery/Map/AerialWithLabels?"+locationString+"key=BING_MAPS_API_KEY")
                            .then(res => {
                            console.log(res)
                            this.setState({locationMap:res})
                            })
                            .catch(function(error){
                                console.log(error);
                            })
                    }

    render(){

            return(
                <div>
               {/* <img src={this.state.locationMap.config.url} /> */}
                </div>
            )

    }


}