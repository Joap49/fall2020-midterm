import React from 'react';

function Header(){
    return (
      <>
        <header className="Header">
            <div className="Title">
                <h1>What's for Dinner?</h1>
                <p className="Tagline">You Choose Your Food and We Choose Your Drink</p>
            </div>
            <div className="navBar">
              <nav>
                <a href="/?cityName=Austin">Austin </a>
                <a href="/?cityName=Boston">Boston </a>
                <a href="/?cityName=Chicago">Chicago </a>
                <a href="/?cityName=Dallas">Dallas </a>
                <a href="/?cityName=Los Angeles">Los Angeles </a>
                <a href="/?cityName=Miami">Miami </a>
                <a href="/?cityName=New York">New York </a>
                <a href="/?cityName=San Francisco">San Francisco </a>
                <a href="/?cityName=San Jose">San Jose </a>
                <a href="/?cityName=Seattle">Seattle </a>
            </nav>

            </div>

        </header>

    </>
    );
}

export default Header;
