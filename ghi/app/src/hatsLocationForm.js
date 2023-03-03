import React, {useState, useEffect } from 'react';

function hatsLocationForm() {
  const [location, setLocation] = useState([])
  const [formData, setFormData] = useState({
    Style_name: '',
    color: '',
    location: '',
    fabric: ''
  })

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const locationUrl = `http://localhost:8090${formData.location}hats/`;

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
        style_name: '',
        color: '',
        location: '',
        fabric: ''
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

  //Allows for the form to display on when a user has not signed in.
  //If a user has signed in, the css class d-none is added to the unneeded piece of the interface

  return (
    <div className="my-5">
      <div className="row">
        <div className="col col-sm-auto">
          <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="logo.svg" />
        </div>

        <div className="col">
          <div className="card shadow">
            <div className="card-body">

              <form className={formClasses} onSubmit={handleSubmit} id="create-hat-form">
                <h1 className="card-title">It's Time to Pick a Location for your Hat!</h1>
                <p className="mb-3">
                  Please choose which location you would like this hat to be in.
                </p>

                <div className="mb-3">
                  <select onChange={handleChangeName} name="hat" id="hat" required>
                    <option value="">Choose a location</option>
                    {
                      locations.map(hat => {
                        return (
                          <option key={conference.href} value={conference.href}>{conference.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <p className="mb-3">
                  Now, tell us about yourself.
                </p>

                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeName} required placeholder="Your full name" type="text" id="name" name="name" className="form-control" />
                      <label htmlFor="name">Your full name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeName} required placeholder="Your email address" type="email" id="email" name="email" className="form-control" />
                      <label htmlFor="email">Your email address</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">I'm going!</button>
              </form>

              <div className={messageClasses} id="success-message">
                Congratulations! You're all signed up!
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default hatsLocationForm;