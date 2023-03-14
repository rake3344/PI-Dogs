import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDogs,
    getTemperaments,
    filterByTemperament,
    orderByName,
    orderByWeight,
    getDogByDb
} from "../../redux/actions";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import style from "./HomePage.module.css"
import { Link } from "react-router-dom";

export const HomePage = () => {

    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs);
    const temperaments = useSelector(state => state.temperaments);
    const dogsDb = useSelector(state => state.dogsDb);

    const [actualPage, setActualPage] = useState(1);
    const [dogsPorPage, setDogsPorPage] = useState(8);
    const lastIndex = actualPage * dogsPorPage;
    const firstIndex = lastIndex - dogsPorPage;
    const currentDogs = allDogs.slice(firstIndex, lastIndex);

    console.log(dogsDb);

    const paginate = (numberPage) => {
        setActualPage(numberPage);
    }

    const [ orden, setOrden ] = useState("");

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);

    const handleFilterTemperament = (e) => {
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value));
    }

    const handleOrderByName = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setOrden(e.target.value);
    }

    const handleOrderByWeight = (e) => {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setOrden(e.target.value);
    }

    const handleOrderByCreated = (e) => {
        e.preventDefault();
        dispatch(getDogByDb(e.target.value));
        setOrden(e.target.value);
    }

    return (
        <div className={style.main}>
            <header className={style.header}>
                <div className={style.header_content}>
                    <Link to="/">
                        <div className={style.logo}>
                            <h1>Dogs</h1>
                        </div>
                    </Link>
                        <SearchBar />
                    <div className={style.secHeader}>

                        {/* Orden por orden alfabetico */}
                        <div className={style.filters}>
                            <select onChange={handleOrderByName}>
                                <option disabled selected defaultValue>Orden alfabetico</option>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                            </select>


                            {/* // Orden por peso */}

                            <select onChange={handleOrderByWeight}>
                                <option disabled selected defaultValue>Ordenar por peso</option>
                                <option value="Max-Weight">Max</option>
                                <option value="Min-Weight">Min</option>
                            </select>


                            {/* // Filtro por temperamento */}

                            <select onChange={handleFilterTemperament}>
                                <option disabled selected defaultValue>Filtrar por temperamento</option>
                                <option value="All">All</option>
                                {
                                    temperaments?.map(temp => {
                                        return (
                                            <option value={temp.name} key={temp.id}>{temp.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>

                {/* Boton para crear un nuevo perro */}
                <div className={style.createDog}>
                    <Link to="/create">
                        <button type="button" className={style.createDogBtn}>Create Dog</button>
                    </Link>
                </div>
            </header>

            <div className={style.container}>
                <div className={style.card_container}>
                    {
                        currentDogs?.map(dog => {
                            return (
                                <div className={style.card}>
                                    <Link to={`/details/${dog.id}`}>
                                        <Card key={dog.id} name={dog.name} image={dog.image} temperaments={dog.temperaments[0].name ? dog.temperaments.map(t => t.name) : dog.temperaments} weight={dog.weight} />
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={style.pagination}>
                <Paginate dogsPorPage={dogsPorPage} allDogs={allDogs.length} paginate={paginate} />
            </div>

        </div>
    )
}