import React, {useState, Fragment, useEffect} from 'react'

const API = process.env.REACT_APP_API;



export const Register = () => {

    const [name, setName] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [fuel, setFuel] = useState('')
    const [origin, setOrigin] = useState('')
    const [setup, setSetup] = useState('')
    const [price, setPrice] = useState('')

    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const[cars, setCars] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault(); // impide la actualizacion del navegador

        if (!editing) {
            const response = await fetch(`${API}/cars`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // define el tipo de contenido json
                },
                body: JSON.stringify ({ //convierte en string para el envio de datos
                    name,
                    model,
                    year,
                    fuel,
                    origin,
                    setup,
                    price
                })
            })
            const data = await response.json();
            console.log(data)
        } else {
            const response = await fetch(`${API}/cars/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' // define el tipo de contenido json
                },
                body: JSON.stringify({ //convierte en string para el envio de datos
                    name,
                    model,
                    year,
                    fuel,
                    origin,
                    setup,
                    price
                })
            })
            const data = await response.json();
            console.log(data)
            setEditing(false);
            setId('');
        }

        await getCars();
        
        setName('');
        setModel('');
        setYear('');
        setFuel('');
        setOrigin('');
        setSetup('');
        setPrice('')
    }

    const getCars = async () => {
        const response = await fetch(`${API}/cars`)
        const data = await response.json();
        setCars(data)
    }

    useEffect(() => {
        getCars();
    }, [])

    const editCar = async (id) => {
        const response = await fetch(`${API}/cars/${id}`)
        const data = await response.json();

        setEditing(true);
        setId(id)
        
        setName(data.name)
        setModel(data.model)
        setYear(data.year)
        setFuel(data.fuel)
        setOrigin(data.origin)
        setSetup(data.setup)
        setPrice(data.price)
    }

    const deleteCars = async (id) => {
        const carResponse = window.confirm('Tem certeza que deseja excluí-lo?')
        if (carResponse) {
            const response = await fetch(`${API}/cars/${id}`,{
                method: 'DELETE'
            });
            const data = await response.json();
            console.log(data)
            await getCars();
        }
    }

    return (
        <Fragment>   
            
        <div className="row">
            <div className="col-md-3">
                <form onSubmit={handleSubmit} className="card card-body position-fixed">
                    <div className="form-group">
                    <h1>Registrar Carros</h1> 
                        <input 
                        type="text" 
                        onChange={e => setName(e.target.value)} 
                        value={name}
                        className="form-control"
                        placeholder="Nome"
                        autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e => setModel(e.target.value)} 
                        value={model}
                        className="form-control"
                        placeholder="Modelo"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e => setYear(e.target.value)} 
                        value={year}
                        className="form-control"
                        placeholder="Ano"                       
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e => setFuel(e.target.value)} 
                        value={fuel}
                        className="form-control"
                        placeholder="Combustível"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e => setOrigin(e.target.value)} 
                        value={origin}
                        className="form-control"
                        placeholder="Procedência"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e => setSetup(e.target.value)} 
                        value={setup}
                        className="form-control"
                        placeholder="Configuração"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e => setPrice(e.target.value)} 
                        value={price}
                        className="form-control"
                        placeholder="Preço"
                        />
                    </div>
                    <button className="btn btn-primary btn-block" // boton con variable para editar o salvar
                    >  
                        {editing ? 'Edit' : 'Salve'} 
                    </button>                    
                </form>
            </div>
            <div className="col-md-8">
                <table className="table table-hover table-bordered">
                <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Fuel</th>
                            <th>Origin</th>
                            <th>Setup</th>
                            <th>Price R$</th>
                            <th>Operation</th>
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
                            <td>
                            <button className="btn btn-secondary btn-sm" //boton para editar
                            onClick={(e) => editCar(cars._id)}
                            >
                                Edit
                            </button>
                            <button className="btn btn-danger btn-sm" // boton para borrar
                            onClick={(e) => deleteCars(cars._id)}
                            >
                                Del.
                            </button>   
                            </td>                
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </Fragment>
        
        
    )
}
    