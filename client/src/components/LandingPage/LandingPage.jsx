import { useNavigate } from "react-router-dom"
import style from "./LandingPage.module.css"

export const LandingPage = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/home")
    }

    return (
        <div className={style.container}>
            <div className={style.sec_container}>
                <h1 className={style.h1}>Dogs Cards</h1>
                <div className={style.parrafo}>
                    <p>On this page you will find information about many dogs such as their temperaments, weight, height and life expectancy, and you can also add new dogs.</p>
                </div>
                <div className={style.div}>
                    <button className={style.button} onClick={handleClick}><span className={style.span}>Home</span></button>
                </div>
            </div>
        </div>
            
    )
}