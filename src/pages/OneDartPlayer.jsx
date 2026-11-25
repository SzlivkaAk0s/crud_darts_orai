import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';

export const OneDartPlayer = () => {
    const params = useParams();
    const id = params.dartId;
    const [dart, setDart] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    const [hiba, setHiba] = useState(null);

    useEffect(() => {
        setFetchPending(true);
        axios
            .get(`https://darts.sulla.hu/darts/${id}`)
            .then((response) => setDart(response.data))
            .catch((error) => {
                setHiba(error);
                console.error("Hiba: ", hiba)
            })
            .finally(() => setFetchPending(false))
    }, [id]);

    return(
        <div className="p-5 m-auto text-center content">
            {isFetchPending || !dart.id ?
                <div className="spinner-border"></div> :
                <div>
                    <h2>Dartsos adatai</h2>
                    <div className="card p-3">
                        <p className="text-dark">Dartsos neve: {dart.name}</p>
                        <p className="text-dark">Születési éve: {dart.birth_date}</p>
                        <p className="text-dark">Nyert világbajnokságai: {dart.world_ch_won}</p>
                        <div className="card-body">
                            <Link to={dart.profile_url} target="_blank">
                                Profile link
                            </Link><br />
                            <Link to={"/darts/" + dart.id}>
                                <img src={dart.image_url} alt={dart.name} className="img-fluid" style={{maxHeight: 200}}/>
                            </Link><br />
                            <Link to={"/"}><i className="bi bi-arrow-return-left fs-2"></i></Link>&nbsp;&nbsp;
                            <Link to={"/mod-darts/" + dart.id}><i className="bi bi-pencil fs-2"></i></Link>&nbsp;&nbsp;
                            <Link to={"/del-darts/" + dart.id}><i className="bi bi-trash3 fs-2"></i></Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}