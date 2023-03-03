import React, {useState, useEffect} from 'react';

function ShoesBinForm() {
    const [bins, setBins] = useState([])
    const [formData, setFormData] = useState({
        manufacturer:'',
        model_name:'',
        color:'',
        picture_URL:'',
        bin: '',
    })

    const getData = async () => {
        const url = 'http://localhost:8100/api/bins/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setBins(data.bins);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (event) => {
        event.PreventDefault();

        const shoesUrl = `http://localhost:8080${formData.bin}shoes/`;

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(shoesUrl, fetchConfig);

        if (response.ok) {
            setFormData({
                manufacturer:'',
                model_name:'',
                color:'',
                picture_URL:'',
                bin: '',
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
                            <form onSubmit={handleSubmit} id="create-shoebin-form">
                                <h1 className="card-title">Wardrobify</h1>
                                <p className="mb-3">
                                    Please create a new shoe.
                                </p>
                                <div className="form-floating mb-3">
                                    <input onChange={handleChangeName} required placeholder='manufacturer' type="text" id="manufacturer" name="manufacturer" className="form-control" />
                                    <label htmlFor="manufacturer">Manufacturer</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={handleChangeName} required placeholder='model_name' type="text" id="model_name" name="model_name" className="form-control" />
                                    <label htmlFor="model_name">Model Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={handleChangeName} required placeholder='color' type="text" id="color" name="color" className="form-control" />
                                    <label htmlFor="color">Color</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={handleChangeName} required placeholder='picture_URL' type="UPLOAD_URL" id="picture_URL" name="picture_URL" className="form-control" />
                                    <label htmlFor="picture_URL">Picture URL</label>
                                </div>
                                <div>
                                    <select onChange={handleChangeName} name="bin" id="bin" required>
                                        <option value="">Choose a bin</option>
                                        {
                                            bins.map(bin =>{
                                                return (
                                                    <option key={bin.href} value={bin.href}>{bin.id}</option>
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


export default ShoesBinForm;
