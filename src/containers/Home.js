import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Header from "../components/Header.js";


const drinkKey = '8477b258b4msh899dd24261167b1p1f92f6jsn6f7391baa85b';
const foodKey = '0bf18475f2628bd608f2add8be1bbe3d';


function Home() {

    const history = useHistory();

    const [cuisineNames, setCuisineNames] = useState(); // can add ID as parameter
    const [cocktail, setCocktail] = useState(null);
    const [cityID, setCityID] = useState();
    const [cityName, setCity] = useState("");

    /*--- City API ---*/

    useEffect(() => {
      axios.get(
          `https://developers.zomato.com/api/v2.1/cities?q=${cityName}' 
          ` , {
          headers: {
              'user-key': foodKey
          }
      }) 
      .then(function (response) {
        const cityID = response.data.location_suggestions[0].id
        setCityID(cityID);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
  
      });
    }, [cityName]); 
    
    useEffect(() => {
      const searchParams = history.location.search;
      const urlParams = new URLSearchParams(searchParams);
      const cityName = urlParams.get("cityName");
  
    
      if(cityName){
          setCity(cityName)
      }
      console.log("urlParams", urlParams)
    }, [history]);

/*--- cuisines ---*/
      useEffect(() => {
        if(cityID){
          console.log('cityID')
        }else{
          console.log('no')
        }
        axios.get(
            `https://developers.zomato.com/api/v2.1/cuisines?city_id=${cityID}`
            , {
            headers: {
                'user-key': foodKey
            }
        }) 
        .then(function (response) {
        
          const cuisines = response.data.cuisines;
          const names = cuisines.map(c => c.cuisine.cuisine_name) + ' ' // maps through array to retrieve cuisine_name value
          setCuisineNames(names);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      }, [cityID]); // everytime this value updates, runs callback function

    /*--- Cocktail API ---*/

    const options = { //rapidAPI code
      method: 'GET',
      url: 'https://rapidapi.p.rapidapi.com/random.php',
      headers: {
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
        'x-rapidapi-key': drinkKey
      }
    };
    
    axios.request(options)
    .then(function (response) {
      console.log(response.data);
      const drinks = response.data.drinks;
      const randomCocktail = drinks.map(r => r.strDrink)
      setCocktail(randomCocktail);
    })
    .catch(function (error) {
      console.error(error);
    },[]);
  

    return(
      <>
      <Header />
      <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"> </script>
      <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"></link>
      <main>
        <h1>What type of food do you want to eat?</h1>
        <div className="mainContainer">
          <h3>Types of Cuisine:</h3>
          <p>{cuisineNames}</p>
          <h3> Random Drink:</h3>
          <p>{cocktail}</p>
        </div>
      </main>
    </>
    
    );
}

export default Home;