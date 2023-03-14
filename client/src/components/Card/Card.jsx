import style from './Card.module.css';

const Card = ({ image, name, temperaments, weight }) => {

    const temp = temperaments.join(', ')
    
    return (

        // <div className={style.container}>
        //     <div className={style.card}>
        //         <img src={image} alt={name} style={{width:"300px", height:"300px"}}/>
                
        //         <div>
        //             <h2>{name}</h2>
        //         </div>
        //         <div>
        //             {
        //                 temperaments.map(temp => {
        //                     return (
        //                         <h3>{temp}</h3>
        //                     )
        //                 })
        //             }
        //         </div>
        //     </div>
        // </div>
        
            // <div className={style.card}>
            //     <img src={image} alt={name} style={{width:"300px", height:"300px"}}/>
            //     <h4>{name}</h4>
            //     <h4><strong>Temperamentos: </strong>{temp}</h4>
            //     <h4><strong>Weight: </strong>{weight[0]} - {weight[1]}</h4>
            // </div>
        <div className={style.container}>
            <div className={style.img}>
                <img src={image} alt={name} />
            </div>
            <h2>{name}</h2>
            <h2><strong>Weight: </strong>{weight[0]} - {weight[1]}</h2>
            <div className={style.temp}>
                {
                    temperaments.map(temp => {
                        return (
                            <h3 key={temp + Math.random}>{temp}</h3>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Card;