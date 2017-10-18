const clientId = 'QhZRGY6iRVBittvNcnWwww';
const secret = 'rBQ0cbadbTA1ehyImlfi0KTdK9JRySNHoUpgZLKi0eqtR6D8tVjIAdUYkXXTImec';

let accessToken;

const Yelp = {

  getAccessToken(){
    if(accessToken){
      return new Promise(resolve => resolve(accessToken));
    }

    return (fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,{
      method: 'POST',
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      accessToken = jsonResponse.access_token;
      console.log(accessToken);
    }))
  },

  search(term, location, sortBy){
    console.log('Yelp:'+term+location+sortBy);
    console.log(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`);
    return (Yelp.getAccessToken().then(() =>{
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,{
        headers: { Authorization: `Bearer ${accessToken}`}
      });
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.business){
        return jsonResponse.map(business =>{
            console.log('Object: '+business);
            return ({
              id: business.id,
              imageSrc: business.image_url,
            });
        });
      }
    }));
  }
};

export default Yelp;
