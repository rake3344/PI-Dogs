import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "./FormPage.module.css";

export const FormPage = () => {
    
    // Validaciones

    const regex = new RegExp("^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$");
    
    const validate = (input) => {
        let errors = {};
        if(!input.name || !regex.test(input.name)) errors.name = "Name is requeried and must be only letters";
        if(!input.min_height) errors.height = "Min height is required";
        if(!input.max_height) errors.height = "Max height is required";
        if(input.min_height > input.max_height) errors.height = "Min height must be less than max height";
        if(!input.min_weight) errors.weight = "Min weight is required";
        if(!input.max_weight) errors.weight = "Max weight is required";
        if(input.min_weight > input.max_weight) errors.weight = "Min weight must be less than max weight";
        if(!input.life_span) errors.life_span = "Life span is required";
        return errors;
    }

    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);

    const [ input, setInput ] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        temperaments: [],
        image: ""
    })

    const [ errors, setErrors ] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperaments: ""
    });


    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postDog(input));
        alert("Dog created successfully!");
        setInput({
            name: "",
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            life_span: "",
            temperaments: [],
            image: ""
        })

    }

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelectChange = (e) => {
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
    }

    const handleDelete = (el) => {
        setInput({
            ...input,
            temperaments: input.temperaments.filter((e) => e !== el)
        })
    }

    
    


    return (
        <div className={style.main}>
            <div className={style.container}>
                <h1 className={style.h1}>Create your dog</h1>
                <Link to="/home">
                    <button className={style.btnHome}>Go Home</button>
                </Link>

                <form action="" id= "form" onSubmit={handleSubmit} className={style.form}>
                    {/* Name */}
                    <div className={style.group}>
                        <input id = "name" type="text" name="name" value={input.name} onChange={handleInputChange} autoComplete = 'off'  className={style.form_input}/>
                        <span className={style.highlight}></span>
                        <span className={style.bar}></span>
                        <label for="name" className={style.form_label}>name</label>
                        <div className={style.errors}>{errors.name}</div> 
                    </div>
                    

                    {/* Height */}
                    <div className={style.group}>
                        <input id = "min_height" type="text" name="min_height" value={input.min_height} onChange = {handleInputChange} autoComplete = 'off' className={style.form_input}/>
                        <span className={style.highlight}></span>
                        <span className={style.bar}></span>
                        <label for = "min_height" className={style.form_label}>min-height</label>
                    </div>

                    <div className={style.group}>
                        <input id = "max_height" type="text" name="max_height" value={input.max_height} onChange = {handleInputChange} autoComplete = 'off' className={style.form_input}/>
                        <span className={style.highlight}></span>
                        <span className={style.bar}></span>
                        <label for="max_height" className={style.form_label}>max-height</label>
                        <div className={style.errors}><p>{errors.height}</p></div>
                    </div>

                    {/* Weight */}
                    <div className={style.group}>
                        <input id = "min_weight" type="text" name="min_weight" value={input.min_weight} onChange = {handleInputChange} autoComplete = 'off' className={style.form_input}/>
                        <span className={style.highlight}></span>
                        <span className={style.bar}></span>
                        <label for = "min_weight" className={style.form_label}>min-weight</label>
                    </div>
                    <div className={style.group}>
                        <input id = "max_weight" type="text" name="max_weight" value={input.max_weight} onChange = {handleInputChange} autoComplete = 'off' className={style.form_input}/>
                        <span className={style.highlight}></span>
                        <span className={style.bar}></span>
                        <label for = "max_weight" className={style.form_label}>max-weight</label>
                        <div className={style.errors}><p>{errors.weight}</p></div>
                    </div>

                    {/* Life Span */}
                    <div className={style.group}>
                        <input id= "life_span" type="text" name="life_span" value={input.life_span} onChange = {handleInputChange} autoComplete = 'off' className={style.form_input}/>
                        <span className={style.highlight}></span>
                        <span className={style.bar}></span>
                        <label for = "life_span" className={style.form_label}>life-span</label>
                        <div className={style.errors}><p>{errors.life_span}</p></div>
                    </div>

                    {/* Image */}
                    <div className={style.group}>
                        <input id = "image" type="text" name="image" value={input.image} onChange = {handleInputChange} autoComplete = 'off' className={style.form_input}/>
                        <span className={style.highlight}></span>
                        <span className={style.bar}></span>
                        <label for = "image" className={style.form_label}>image url</label>
                    </div>

                    {/* Temperament */}

                    <div>
                        <h3>Select Temperaments</h3>
                    </div>

                    <div>
                        <select onChange={handleSelectChange} className={style.selectTemp}>
                            <option disabled selected>Temperaments</option>
                            {
                                temperaments.map((t) => {
                                    return <option key={t.name + Math.random} value={t.name}>{t.name}</option>
                                })
                            }
                        </select>
                    </div>

                    {/* Submit */}
                    <div className={style.createDiv}>
                        <button type="submit" disabled={errors.length} form = 'form' className={style.createBtn}>Create</button>
                    </div>
                </form>
                
                <div className={style.temp}>
                    <h3>Selected Temperaments</h3>
                    <div className={style.temp2}>
                        {
                            input.temperaments.map((t) => {
                                return <div key={t} onClick={() => handleDelete(t)} className={style.tmp}>
                                    <p>{t}</p>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}