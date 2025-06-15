import { useState } from "react";
import { useNavigate } from "react-router-dom";
import geoToEng from "../Misc/lang";

const Home = () => {
    const [surname, setSurname] = useState([])
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()

        const path = geoToEng(surname)
        if (path) navigate(`/families/${path.replaceAll(' ', '').toLowerCase()}`)
    }

    return <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <form onSubmit={submit}>

            <div className="ui action input">
                <input type="text" placeholder="Enter surname..." value={surname} onChange={e => setSurname(e.target.value)} />
                <button className="ui button" type="submit">Search</button>
            </div>
        </form>
    </div>
}

export default Home;