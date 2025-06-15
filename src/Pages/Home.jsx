import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [surname, setSurname] = useState([])
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()
        if (surname) navigate(`/families/${surname.replaceAll(' ', '').toLowerCase()}`)
    }

    return <div>
        <form onSubmit={submit}>
            <input type="text" placeholder="Enter surname..." value={surname} onChange={e => setSurname(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    </div>
}

export default Home;