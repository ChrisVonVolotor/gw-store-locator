import React, { Component } from "react";
export default class OtherStores extends Component {
    	constructor(props) {
    		super(props);
    		this.state = {
    		    };
        }

render(){

    let stores = []

      for (const [index, loc] of this.props.stores.entries()) {
        stores.push(<div><h5 key={index}>{loc["Store Name"]}</h5>
        <p key={index}>{loc["City"]}</p>
        <p key={index}>distance {loc["distance"]} miles</p></div>)
      }
    return(

    <div class="h-50 overflow-auto">
        {stores}
    </div>)
}

}