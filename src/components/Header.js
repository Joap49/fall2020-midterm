import React from 'react';

function Header(){
    return (
        <header className="Header">
            <div>
                <h1>Restaurant App</h1>
            </div>
            <nav>
                <a href="/?cityName=Boston">Boston</a>
                <a href="/?cityName=Manhattan">New York</a>
                <a href="/?cityName=Seattle">Seattle</a>
                <a href="/?cityName=Miami">Miami</a>
            </nav>
      </header>
    );
}

export default Header;