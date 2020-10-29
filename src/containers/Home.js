import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Header from "../components/Header.js";


const drinkKey = '8477b258b4msh899dd24261167b1p1f92f6jsn6f7391baa85b';
const foodKey = '0bf18475f2628bd608f2add8be1bbe3d';


function Home() {

    const history = useHistory();

    const [cuisineNames, setCuisineNames] = useState(); // can add ID as parameter
    const [cocktail, setCocktail] = useState();
    const [cityID, setCityID] = useState();
    const [cityName, setCity] = useState();

    /*--- Find City ID API ---*/
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
    }, [history]);

/*--- List of Cuisines API ---*/
      useEffect(() => {
        if(cityID){
        }else{
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
          const names = cuisines.map(c => c.cuisine.cuisine_name) + " " // maps through array to retrieve cuisine_name value
          setCuisineNames(names);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      }, [cityID]); // everytime this value updates, runs callback function

/*--- Random Cocktail Generator API ---*/
    useEffect(() => {
      if(history){
      }else{
      }
      axios.get(
        'https://rapidapi.p.rapidapi.com/random.php'
          , {
          headers: {
            'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
            'x-rapidapi-key': drinkKey
          }
      })
      .then(function (response) {
        console.log(response.data);
        const drinks = response.data.drinks;
        const randomCocktail = drinks.map(r => r.strDrink);
        setCocktail(randomCocktail);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    }, [history]); // everytime this value updates, runs callback function



    return(
      <>
        <Header />
        <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet"/>
        <main className="Home">
          <h2></h2>
          <div className="mainContainer">
            <div className="dinnerContainer">
              <h3 className="dinnerHeaders">Types of Cuisine:</h3>
              <p className="cuisine">{cuisineNames}</p>
            </div>
            <div className="drinkContainer">
              <h3 className="dinnerHeaders">Random Drink:</h3>
              <p className="drinks">{cocktail}</p>
            </div>
          </div>
        </main>
      </>

    );
}

export default Home;
