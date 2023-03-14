import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {

    const dispatch = useDispatch();
    const [ search, setSearch ] = useState("");

    const handleInput = (e) => {
        e.preventDefault()
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getDogsByName(search));
    }

    return (
        // <div className={style.container}>
        //     <div className={style.search}>
        //         <input type="text" onChange={handleInput} placeholder = "Search.." className={style.input}/>
        //         <button type = "submit" onClick={handleSubmit} className = {style.button}>
        //             Search
        //         </button>
        //     </div>
        // </div>
        <div className={style.container}>
            <input type="text" onChange={handleInput} placeholder = "Search..." className={style.input}/>
            <button type = "submit" className={style.button} onClick={handleSubmit}>search</button>
        </div>
    )
}

export default SearchBar;