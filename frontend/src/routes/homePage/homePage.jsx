import { useContext } from 'react';
import SearchBar from '../../components/searchBar/SearchBar';
import './homePage.scss'
import { AuthContext } from '../../context/AuthContext';

function HomePage(){
    const {currentUser} = useContext(AuthContext)
    console.log(currentUser);
    return(
        <div className='HomePage'>
        <div className="textContainer">
            <div className="wrapper">
                <h1 className='Title'>Find Real Estate Near You and Get Your Dream Place</h1>
                <p>
                    Browse top properties, compare prices, and connect instantly with owners and agents. Your next home or investment is just a few clicks away.
                </p>
                <SearchBar />
                <div className="boxes">
                    <div className="box">
                        <h1>16+</h1>
                        <h2>Years of Experience</h2>
                    </div>
                    <div className="box">
                        <h1>200</h1>
                        <h2>Award Gained</h2>
                    </div>
                    <div className="box">
                        <h1>1200+</h1>
                        <h2>Property Ready</h2>
                    </div>
                </div>
            </div>
        </div>
      
        <div className="imagecontainer">
        <img src="/bg.png" alt='' />
        </div>
        
        </div> 
        
    )
}

export default HomePage;