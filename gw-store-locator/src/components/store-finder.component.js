import React, { Component } from "react";
import axios from "axios";
import { overwrite, getCode } from "country-list";
import NearestStore from './nearest-store.componant.js'
import OtherStores from './other-stores.componant.js'
import LocationMap from './map/view-map.componant.js'
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/slider.css";
export default class StoreFinder extends Component {

	constructor(props) {
		super(props);
		this.state = {  userAddress: "",
		                userCoordinates: [],
		                userCountry: "",
		                userDistance: 30,
		                nearestStore: {},
		                otherStoresInRange:[],
		                allStores:[],
		                allValidStores:[]

		    };

		this.fxFindStoreDistance = this.fxFindStoreDistance.bind(this);
		this.onChangeAddress = this.onChangeAddress.bind(this);
		this.onChangeDistance = this.onChangeDistance.bind(this);
    }

    componentDidMount(){
        axios
            .get("http://localhost:4000/locations/")
            .then(res => {
                this.setState({allStores: res.data })
            })
            .catch(function(error){
                console.log(error);
            })
            //overwrites country-list to match the standards used by both BING and Starbuck
            overwrite([{
                code: 'GB',
                name: 'United Kingdom'
            }]);
    }


    async fxFindStoreDistance(){

        let userLocation =
           await axios
                .get("http://dev.virtualearth.net/REST/v1/Locations/UK/"+this.state.userAddress+"?maxResults=1&key=BING_MAPS_API_KEY")
                .then(res => {
                     return( {
                        userCoordinates: res.data.resourceSets[0].resources[0].point.coordinates,
                        userCountry: getCode(res.data.resourceSets[0].resources[0].address.countryRegion)
                     });
                })
                .catch(function(error){
                    console.log(error);
                })


        console.log(userLocation)
        let arrStoresInRange = [];

        let arrInCountry = this.state.allStores.filter(loc => {
            return loc.Country == userLocation.userCountry;
        })

       let arrDestinations = await arrInCountry.map(loc => {
            return{
                longitude: loc.Longitude,
                latitude: loc.Latitude
            }
        })

        console.log(arrDestinations);
        //for await (let loc of arrInCountry ){
            await axios
                .post("https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?key=BING_MAPS_API_KEY", {
                    "origins":[
                        {
                            "latitude": userLocation.userCoordinates[0],
                            "longitude": userLocation.userCoordinates[1]
                        }
                    ],
                    "destinations": arrDestinations,
                    "travelMode": "driving",
                    "distanceUnit":"mile"
                })
                .then(res => {

                 for(let x=0; x < arrInCountry.length; x++){
                    arrInCountry[x]["distance"] = (res.data.resourceSets[0].resources[0].results[x].travelDistance);
                }


                arrStoresInRange = arrInCountry.filter(loc => {
                           return loc.distance <= this.state.userDistance;
                       })

                 console.log(arrStoresInRange);
               })
                .catch(function(error){
                    console.log(error);
               })


     //   }
     //   console.log(arrStoresInRange);

        arrStoresInRange.sort((a,b) => parseFloat(a.distance) - parseFloat(b.distance));
        let arrAllValidStores = arrStoresInRange;
        let nearestStore = arrStoresInRange.shift();

        this.setState({
            allValidStores: arrAllValidStores,
            nearestStore: nearestStore,
            otherStoresInRange: arrStoresInRange
        });
    }







    onChangeAddress(e){
        this.setState({
            userAddress: e.target.value
        });
    }

    onChangeDistance(e){
        this.setState({
            userDistance: e.target.value
        });
    }

    render(){
        return(

        <div class="container-fluid">
        	<div class="row">
        		<div className="col-md-12">
        		                    <div>
        		                    <div>{this.state.otherStoresInRange.length !== 0 ?
                                                                     <LocationMap stores={this.state.otherStoresInRange}/> :
                                                                     <p>Please Enter a valid location and submit </p>
                                                                     }
                                                                     </div></div>
        		</div>
        	</div>
        	<div class="mh-25 row">
        		<div class="col-md-4">
        			 <section id="searchBox">
                                                <h3>Enter Postcode or Town</h3>
                                                <div>
                                                    <input class="form-control" id="search-address" type="test" onChange={this.onChangeAddress} /> <br/>
                                                    <label  class="form-text text-muted" for="search-distance">within {this.state.userDistance} miles</label>
                                                    <input type="range" class="slider"   id="search-distance" name="points" step="5" min="5" max="100" value={this.state.userDistance} onChange={this.onChangeDistance}/>
                                                    <br/><br/>
                                                    <button class="btn btn-secondary" type="submit" onClick={this.fxFindStoreDistance}>Find Stores</button>
                                                </div>
                                            </section>
        		</div>
        		<div class="col-md-4">
        			<section id="storeDetails">
                                                <h3>Your Nearest Stores</h3>
                                                <div>{Object.entries(this.state.nearestStore).length !== 0 ?
                                                <NearestStore id={this.state.nearestStore["_id"]}  name={this.state.nearestStore["Store Name"]} city={this.state.nearestStore["City"]} street={this.state.nearestStore["City"]} postcode={this.state.nearestStore["Postcode"]} distance={this.state.nearestStore["distance"]} phone={this.state.nearestStore["Phone Number"]}/> :
                                                <p class="form-text text-muted">Please Enter a valid location and submit </p>
                                                }
                                                </div>

                                            </section>
        		</div>
        		<div class="col-md-4">
        			<section id="otherStores">
                                                <h3>Other Nearby Stores</h3>
                                                <div>{this.state.otherStoresInRange.length !== 0 ?
                                                <OtherStores stores={this.state.otherStoresInRange}/> :
                                                <p class="form-text text-muted">Please Enter a valid location and submit </p>
                                                }
                                                </div>
                                            </section>
        		</div>
        	</div>
        </div>

        )
    }
}