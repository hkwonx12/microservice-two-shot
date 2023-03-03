import { useEffect, useState } from 'react';

function HatsList() {
  const [hats, setHats] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8090/api/hats/');

    if (response.ok) {
      const data = await response.json();
      sethats(data.attendees)
    }
  }

  useEffect(()=>{
    getData()
  }, [])

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Style Name</th>
          <th>id</th>
          <th>Hats</th>
        </tr>
      </thead>
      <tbody>
        {hats.map(hat => {
          return (
            <tr key={hat.href}>
              <td>{ hat.fabric }</td>
              <td>{ hat.color }</td>
              <td>{ hat.picture }</td>
              <td>{ hat.location }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default HatsList;
