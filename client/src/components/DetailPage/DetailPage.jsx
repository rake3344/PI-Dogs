import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogById } from '../../redux/actions';
import { Link } from 'react-router-dom';
import style from './DetailPage.module.css';

export const DetailPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { idDog } = useParams();

    useEffect(() => {
        dispatch(getDogById(idDog))
    }, [dispatch, idDog]);

    const handleClick = () => {
        navigate("/home")
    }

    const dogDetail = useSelector(store => store.dogDetail);
    let dogId, dogName, dogImg, dogTemp = [], dogWeight, dogHeight, dogLifeSpan;

    if(dogDetail[0]){
        dogId = dogDetail[0].id;
        dogName = dogDetail[0].name;
        dogImg = dogDetail[0].image;
        dogWeight = dogDetail[0].weight;
        dogHeight = dogDetail[0].height;
        dogLifeSpan = dogDetail[0].life_span;

        if(dogDetail[0].temperaments){
            dogTemp = [...dogDetail[0].temperaments];
        }

        if(dogTemp){
            dogTemp = dogTemp.join(', ');
        }
    }

    
    console.log(dogTemp);

    return (

        <body className={style.body}>
            <article className={style.cta}>
                <img src={dogImg} alt={dogName} className={style.img}/>
                <div className={style.text}>
                    <h2 className={style.h2}>{dogName}</h2>
                    <ul>
                        <li><strong>Id: </strong>{dogId}</li>
                        <li><strong>Weight: </strong>{dogWeight && dogWeight[0]} - {dogWeight && dogWeight[1]} KG</li>
                        <li><strong>Height: </strong>{dogHeight && dogHeight[0]} - {dogHeight && dogHeight[1]} CM</li>
                        <li><strong>LifeSpan: </strong>{dogLifeSpan}</li>
                        <li><strong>Temperaments: </strong>{dogTemp}</li>
                    </ul>
                    <button onClick={handleClick} >Go Home</button>
                </div>
            </article>
        </body>
    )

}


