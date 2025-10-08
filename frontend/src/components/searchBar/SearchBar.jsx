import { useState } from "react"
import "./SearchBar.scss"
import { Link } from "react-router-dom"

const types = ["buy","rent"]

function SearchBar(){
    const[query,setQuery] = useState({
        type:"buy",
        location:"",
        MinPrice:0,
        MaxPrice:0,
    });

    const switchType = (val)=>{
        setQuery(prev=>({...prev,type:val}));
    };

    const handleChange = e=>{
        setQuery(prev=>({...prev,[e.target.name] : e.target.value}));
    }
    return (
        <div className="searchBar">
        <div className="type">
        {types.map((type)=>(
        <button key={type} onClick={()=>switchType(type)} className={query.type == type ? "active" : "" }>
            {type}
        </button>
        ))}
        </div>
       <form>
        <input type="text" name="city" placeholder="City" onChange={handleChange} />
        <input type="number" name="MinPrice" min={0} max={1000000} placeholder="Min Price" onChange={handleChange}/>
        <input type="number" name="MaxPrice" min={0} max={1000000} placeholder="Max Price" onChange={handleChange}/>
        <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.MinPrice}&maxPrice=${query.MaxPrice}`}>
        <button>
            <img src="/search.png" alt="Search image" />
        </button>
        </Link>
       </form>
        
        </div>
        
    )
}

export default SearchBar