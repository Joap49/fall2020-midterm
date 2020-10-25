import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

//import Header from "../components/Header";


const drinkKey = '8477b258b4msh899dd24261167b1p1f92f6jsn6f7391baa85b';
const foodKey = '0bf18475f2628bd608f2add8be1bbe3d';


function Home() {

    const history = useHistory();

    const [restaurantID, setRestaurantID] = useState(null); // can add ID as parameter

    /*--- Restaurant API ---*/
      useEffect(() => {
        axios.get(
            `https://developers.zomato.com/api/v2.1/search`, {
          //`https://developers.zomato.com/api/v2.1/restaurant?res_id=${restaurantID}`, {
            headers: {
                'user-key': '0bf18475f2628bd608f2add8be1bbe3d'
            }
        }) // restaurantID from Zomato
        .then(function (response) {
          const restaurant = response.data;
          setRestaurantID(restaurant);
          console.log(response.data); //TAKE OUT AT THE END
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      }, [restaurantID]); 

    /*--- Cocktail API ---*/
    const options = {
        method: 'GET',
        url: 'https://rapidapi.p.rapidapi.com/list.php',
        params: {a: 'list'},
        headers: {
          'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
          'x-rapidapi-key': '8477b258b4msh899dd24261167b1p1f92f6jsn6f7391baa85b'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data); //TAKE OUT AT THE END
      }).catch(function (error) {
          console.error(error);
      });



    /*--- any time history updates, we will get new param ---*/
      useEffect(() => {
        const searchParams = history.location.search;
        const urlParams = new URLSearchParams(searchParams);
        const cityID = urlParams.get("cityID");
      
        if(restaurantID){
            setRestaurantID(restaurantID)
        }
        console.log("urlParams", urlParams)
      }, [history]);
    
    

    return(
      <>
      <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"></link>
      <main>
        <h1>Search for Restaurants</h1>
        <div className="mainContainer">
          <form class="searchBarContainer">
            <label for="restaurantName">Search
              <input name="restaurantName" type="text" id="restaurantName" placeholder="What restaurant are you looking for?" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </main>
    </>
    
    );
}

export default Home;