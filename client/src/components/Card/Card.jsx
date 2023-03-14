import style from './Card.module.css';

const Card = ({ image, name, temperaments, weight }) => {

    return (
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