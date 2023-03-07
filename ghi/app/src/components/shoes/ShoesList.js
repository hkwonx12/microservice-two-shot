import { useEffect, useState } from 'react';

function ShoesList () {
    const [shoes, setShoes] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/shoes/');

        if(response.ok) {
            const data = await response.json();
            setShoes(data.shoes)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const handleDelete = async (e) => {
        const url = `http://localhost:8080/api/shoes/${e.target.id}`

        const fetchConfigs = {
            method: "Delete",
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(url, fetchConfigs)

        if (response.ok) {
            getData();
        } else {
            alert("Shoe was not deleted");
        }
    };


    return (
        <div className='container'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Model Name</th>
                        <th>Manufacturer</th>
                        <th>Color</th>
                        <th>Picture URL</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {shoes.map(shoe => {
                        return (
                            <tr key={shoe.id}>
                                <td>{shoe.model_name}</td>
                                <td>{shoe.manufacturer}</td>
                                <td>{shoe.color}</td>
                                {
                                    (shoe.picture_URL === null)?<td><img src="generic_show.png"/></td>: <td><img src={shoe.picture_URL}/></td>
                                }
                                
                                <td><button onClick={handleDelete} id={shoe.id} className="btn btn-danger">Delete</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}


export default ShoesList;
