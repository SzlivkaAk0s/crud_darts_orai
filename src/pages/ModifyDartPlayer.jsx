import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export const ModifyDartPlayer = () => {
    const params = useParams();
    const id = params.dartId;
    const navigate = useNavigate();
    const [dart, setDart] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });

    useEffect(() => {
        const fetchDartPlayerData = async() => {
            try{
                const response = await axios.get(`https://darts.sulla.hu/darts/${id}`);
                setDart(response.data);
            }
            catch(error){
                console.log("Hiba: ", error);
            }
        };
        fetchDartPlayerData();
    }, [id]);

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://darts.sulla.hu/darts/${id}`, dart)
        .then(() => {
            navigate("/");
        })
        .catch(error => {
            console.log("Hiba: ", error);
        })
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setDart(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return(
        <div className="p-5 content bg-ivory text-center">
            <h2>Dartsozó módosítása</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Dartsos neve: </label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" value={dart.name} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Születési éve: </label>
                    <div className="col-sm-9">
                        <input type="date" name="birth_date" className="form-control" value={dart.birth_date} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Nyert világbajnokságai: </label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="form-control" value={dart.world_ch_won.toString()} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Profil URL-je: </label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="form-control" value={dart.profile_url} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL-je: </label>
                    <div className="col-sm-9">
                        <input type="text" name="image_url" className="form-control" value={dart.image_url} onChange={handleInputChange} />
                    </div>
                </div>
                <Link to="/" className="btn btn-warning"><i className="bi bi-arrow-return-left"></i>Vissza</Link>&nbsp;&nbsp;
                <button type="submit" className="btn btn-success"><i className="bi bi-send"></i>Küldés</button>
            </form>
        </div>
    )
}