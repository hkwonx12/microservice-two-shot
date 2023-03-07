import React, {useState, useEffect } from 'react';

function HatsLocationForm() {
  const [locations, setLocations] = useState([])
  const [formData, setFormData] = useState({
    fabric: '',
    style_name: '',
    color: '',
    picture_url: '',
    location: ''
  })

  const getData = async () => {
    const url = 'http://localhost:8100/api/locations/';
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        setLocations(data.locations);
    }
  }

  useEffect(() => {
      getData();
  },  []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const locationUrl = `http://localhost:8090/api/hats/`;

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(locationUrl, fetchConfig);

    if (response.ok) {
      setFormData({
        fabric: '',
        style_name: '',
        color: '',
        picture_url: '',
        location: ''
      });
    }
  }

  const handleChangeName = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value
    });

  }


  return (
    <div className="my-5">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit} id="create-hatlocation-form">
                <h1 className="card-title">Wardrobify</h1>
                <p className="mb-3">
                  Please create a new hat.
                </p>
                <div className="form-floating mb-3">
                    <input value={formData.fabric} onChange={handleChangeName} required placeholder='fabric' type="text" id="fabric" name="fabric" className="form-control" />
                    <label htmlFor="fabric">Fabric</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.style_name} onChange={handleChangeName} required placeholder='style_name' type="text" id="style_name" name="style_name" className="form-control" />
                    <label htmlFor="style_name">Style_name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.color} onChange={handleChangeName} required placeholder='color' type="text" id="color" name="color" className="form-control" />
                    <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.picture_url} onChange={handleChangeName} required placeholder='picture_url' type="URL" id="picture_url" name="picture_url" className="form-control" />
                    <label htmlFor="fabric">Picture_url</label>
                </div>

                <div>
                    <select value={formData.location} onChange={handleChangeName} name='location' id="location" required>
                        <option value="">Choose a location</option>
                        {
                            locations.map(location => {
                                return (
                                  <option key={location.href} value={location.href}>{location.closet_name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className="btn btn-lg btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HatsLocationForm;