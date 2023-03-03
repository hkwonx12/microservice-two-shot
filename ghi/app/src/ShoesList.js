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

    useEffect(()=>{
        getData()
    }, [])


    return (
        <div className='container'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Model Name</th>
                        <th>Manufacturer</th>
                        <th>Color</th>
                        <th>Picture URL</th>
                    </tr>
                </thead>
                <tbody>
                    {shoes.map(shoe => {
                        return (
                            <tr key={shoe.href}>
                                <td>{shoe.model_name}</td>
                                <td>{shoe.manufacturer}</td>
                                <td>{shoe.color}</td>
                                <td>{shoe.picture_URL}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}


export default ShoesList;
