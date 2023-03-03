import { useEffect, useState } from 'react';

function HatsList() {
  const [hats, setHats] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8090/api/hats/');

    if (response.ok) {
      const data = await response.json();
      setHats(data.hats)
    }
  }

  useEffect(()=>{
    getData()
  }, [])

  const handleDelete = async (e) => {
    const url = `http://localhost:8090/api/hats/${e.target.id}`

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
        alert("Hat was not deleted");
    }
};
  return (

    <div className='container'>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Fabric</th>
                    <th>Style_name</th>
                    <th>Color</th>
                    <th>Picture_url</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {hats.map(hat => {
                    return (
                        <tr key={hat.href}>
                            <td>{hat.fabric}</td>
                            <td>{hat.style_name}</td>
                            <td>{hat.color}</td>
                            <td>{hat.picture_url}</td>
                            <td> <button onClick = {handleDelete} id={hat.id} className= "btn btn-danger"> Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
)


}

export default HatsList;
