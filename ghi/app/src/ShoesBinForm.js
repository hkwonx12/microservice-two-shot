import { useState, useEffect } from "react";

function ShoesBinForm() {
  const [bins, setBins] = useState([]);
  const [formData, setFormData] = useState({
    manufacturer: '',
    model_name: '',
    color: '',
    picture_URL: '',
    bin: '',
  })


  const fetchData = async () => {
    const url = "http://localhost:8100/api/bins/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setBins(data.bins);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();



    const shoesUrl = "http://localhost:8080/api/shoes/";
    const fetchOptions = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(shoesUrl, fetchOptions);
    if (response.ok) {
        setFormData({
            manufacturer: '',
            model_name: '',
            color: '',
            picture_URL: '',
            bin: '',
        })
    }
  };

  const handleChange = (event) => {
    setFormData({
        ...formData,
        [event.target.name]: event.target.value
    })
  }





  return (
    <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new shoe</h1>
              <form onSubmit={handleSubmit} id="create-shoe-form">
                <div className="form-floating mb-3">
                  <input value={formData.manufacturer} onChange={handleChange} placeholder="manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                  <label htmlFor="fabric">Manufacturer</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={formData.model_name} onChange={handleChange} placeholder="model_name" required type="text" name="model_name" id="model_name" className="form-control" />
                  <label htmlFor="model_name">Model Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={formData.color} onChange={handleChange} placeholder="color" required type="text" name="color" id="color" className="form-control" />
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={formData.picture_URL} onChange={handleChange} placeholder="picture_URL" required type="url" name="picture_URL" id="picture_URL" className="form-control" />
                  <label htmlFor="picture_URL">Picture</label>
                </div>
                <div className="mb-3">
                  <select value={formData.bin} onChange={handleChange} required name="bin" id="bin" className="form-select">
                    <option value="">Choose a bin</option>
                    {bins.map(bin => {
                      return (
                        <option key={bin.href} value={bin.href}>
                          {bin.closet_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>







  )










}



export default ShoesBinForm;














// import React, {useState, useEffect} from 'react';

// function ShoesBinForm() {
//     const [bins, setBins] = useState([])
//     const [formData, setFormData] = useState({
//         manufacturer:'',
//         model_name:'',
//         color:'',
//         picture_URL:'',
//         bin: '',
//     })

//     const fetchData = async () => {
//         const url = 'http://localhost:8100/api/bins/';
//         const response = await fetch(url);

//         if (response.ok) {
//             const data = await response.json();
//             setBins(data.bins);
//         }
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleSubmit = async (event) => {
//         event.preventDefault();


//         const shoesUrl = 'http://localhost:8080/api/shoes/';
//         const fetchOptions = {
//             method: "post",
//             body: JSON.stringify(formData),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         };

//         const response = await fetch(shoesUrl, fetchOptions);
//         if (response.ok) {
//             setFormData({
//                 manufacturer:'',
//                 model_name:'',
//                 color:'',
//                 picture_URL:'',
//                 bin: '',
//             })
//         }
//     };

//     const handleFormChange = (event) => {
//         setFormData({
//             ...formData,
//             [event.target.name]: event.target.value
//         });
//     }


//     return (
//     <div className="row">
//         <div className="offset-3 col-6">
//             <div className="shadow p-4 mt-4">
//                     <form onSubmit={handleSubmit} id="create-shoe-form">
//                         <h1 className="card-title">Wardrobify</h1>
//                         <p className="mb-3">
//                             Please create a new shoe.
//                         </p>
//                         <div className="form-floating mb-3">
//                             <input value={formData.manufacturer} onChange={handleFormChange} required placeholder='manufacturer' type="text" id="manufacturer" name="manufacturer" className="form-control" />
//                             <label htmlFor="manufacturer">Manufacturer</label>
//                         </div>
//                         <div className="form-floating mb-3">
//                             <input value={formData.model_name} onChange={handleFormChange} required placeholder='model_name' type="text" id="model_name" name="model_name" className="form-control" />
//                             <label htmlFor="model_name">Model Name</label>
//                         </div>
//                         <div className="form-floating mb-3">
//                             <input value={formData.color} onChange={handleFormChange} required placeholder='color' type="text" id="color" name="color" className="form-control" />
//                             <label htmlFor="color">Color</label>
//                         </div>
//                         <div className="form-floating mb-3">
//                             <input value={formData.picture_URL} onChange={handleFormChange} required placeholder='picture_URL' type="url" id="picture_URL" name="picture_URL" className="form-control" />
//                             <label htmlFor="picture_URL">Picture URL</label>
//                         </div>
//                         <div>
//                             <select value={formData.bin} onChange={handleFormChange} name="bin" id="bin" required>
//                                 <option value="">Choose a bin</option>
//                                 {
//                                     bins.map(bin =>{
//                                         return (
//                                             <option key={bin.href} value={bin.href}>{bin.closet_name}</option>
//                                         );
//                                     })}
//                             </select>
//                         </div>
//                         <button className="btn btn-primary">Create</button>
//                     </form>
//                 </div>
//             </div>
//         </div>

//     )
// }


// export default ShoesBinForm;
