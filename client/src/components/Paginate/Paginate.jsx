import style from './Paginate.module.css';

const Paginate = ({dogsPorPage, allDogs, paginate}) => {
    
    const pageNumbers = [];

    // cantidad de elementos totales / cantidad de elementos por pagina
    const div = Math.ceil(allDogs / dogsPorPage);
    for(let i = 1; i <= div; i++){
        pageNumbers.push(i);
    }

    return (
        // <nav className={style.container}>
        //     <ul className={style.ul}>
        //         {
        //             pageNumbers && pageNumbers.map(number => {
        //                 return (
        //                     <li key={number} className={style.li}>
        //                         <button type="button" onClick={() => paginate(number)}>{number}</button>
        //                     </li>
        //                 )
        //             })
        //         }
        //     </ul>
        // </nav>
        <nav className={style.container}>
            <ul>
                {
                    pageNumbers && pageNumbers.map(number => {
                        return (
                            <li key={number}>
                                <button onClick={() => {paginate(number)}}>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Paginate;