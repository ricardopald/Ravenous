import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component{
  render(){
    return(
      <div className="BusinessList">
      {
        this.props.businesses.map(function (business){
          //console.log(BusinessList);
          //console.log(business);
          return (<Business key={business.id} business={business}/>);
        })
      } 
      </div>
    );
  }
}

export default BusinessList;
