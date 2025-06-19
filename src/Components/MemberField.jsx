import { useState } from "react"

    const MemberField = ({ surname, setNewMember, back, next }) => {
    const [name, setName] = useState('')
    const [birth, setBirth] = useState(null)
    const [death, setDeath] = useState(null)
    const [gender, setGender] = useState('other')

    const submit = (e) => {
        e.preventDefault()
        if (birth && death && death < birth) { alert('Please check dates.'); return }
        setNewMember({
            first_name: name.at(0).toUpperCase() + name.slice(1),
            last_name: surname,
            dob: birth,
            dod: death,
            gender
        })

        next()
    }

    return <div className="ui card fields">
        <form onSubmit={submit} className="ui form">
            <h4 className="ui dividing header">Register a member</h4>
            <div className="field">
                <label>Name</label>
                <div className="two fields">
                    <div className="field">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" required placeholder="First Name" />
                    </div>
                    <div className="field">
                        <input type="text" disabled value={surname} />
                    </div>
                </div>
            </div>

            <div className="field">
                <label>Date of birth</label>
                <div className="ui input">
                    <input onChange={e => setBirth(e.target.value)} type="date" />
                </div>
            </div>

            <div className="field">
                <label>Date of decease</label>
                <div className="ui input">
                    <input onChange={e => setDeath(e.target.value)} type="date" />
                </div>
            </div>

            <div className="field">
                <label>Gender</label>
                <select onChange={e => setGender(e.target.value)}>
                    <option value="other">Other</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div className="ui">
                <button onClick={back} type="button" className="ui button right floated">Back</button>
                <button type="submit" className="ui button primary right floated">Submit</button>
            </div>
        </form>
    </div>
}

export default MemberField;