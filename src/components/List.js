import React, {useState, Fragment, useEffect} from 'react'

const API = process.env.REACT_APP_API;


export const List = () => {
    
    const[cars, setCars] = useState([])

    const getCars = async () => {
        const response = await fetch(`${API}/cars`)
        const data = await response.json();
        setCars(data)
    }

    useEffect(() => {
        getCars();
    }, [])

    return (
        <Fragment>               
        <div className="row">
            <div className="col-md-2">                
            </div>
            <div className="col-md-8">
                <table className="table table-hover table-bordered ">
                    <thead className="thead-light">
                        <tr>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Ano</th>
                            <th>Combustível</th>
                            <th>Procedência</th>
                            <th>Setup</th>
                            <th>Preço R$</th>
                        </tr>
                    </thead>
                    <tbody>
                    {cars.map(cars => (
                        <tr key={cars._id}>
                            <td>{cars.name}</td>
                            <td>{cars.model}</td>
                            <td>{cars.year}</td>
                            <td>{cars.fuel}</td>
                            <td>{cars.origin}</td>
                            <td>{cars.setup}</td>
                            <td>{cars.price}</td>                            
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </Fragment>        
    )
}

