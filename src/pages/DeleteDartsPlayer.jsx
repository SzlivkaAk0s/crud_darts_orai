import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const DeleteDartsPlayer = () => {
    const params = useParams();
    const id = params.dartId;
    const navigate = useNavigate();
    const [dart, setDart] = useState(null); 
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        (async () => {
            try {
                const response = await axios.get(`https://darts.sulla.hu/darts/${id}`);
                setDart(response.data);
            }
            catch (error) {
                console.log("Hiba a lekérdezés során: ", error);
            }
            finally {
                setFetchPending(false);
            }
        })();
    }, [id]);

    const handleSubmit = event => {
        event.preventDefault();
        axios.delete(`https://darts.sulla.hu/darts/${id}`)
            .then(() => {
                navigate("/");
            })
            .catch(error => {
                console.log("Nem sikerült a küldés: ", error);
            });
    }

    return (
        <>
            <div className="p-5 m-auto text-center content bg-ivory">
                {isFetchPending || !dart ?
                    <div className="spinner-border text-warning"></div> :

                    <div>
                        <h2>Dartsos törlése</h2>
                        <p>Biztosan törölni szeretnéd a következő játékost: <strong>{dart.name}</strong>?</p>
                        <form onSubmit={handleSubmit}>
                            <Link to="/" className="btn btn-warning">
                                <i className="bi bi-arrow-return-left"></i> Vissza
                            </Link>&nbsp;&nbsp;
                            <button type="submit" className="btn btn-danger">
                                <i className="bi bi-trash"></i> Törlés
                            </button>
                        </form>
                    </div>
                }
            </div>
        </>
    );
}