import { useEffect, useState } from "react";
import { useApiContext } from '../Hooks/useContext'

const MemberCard = ({ id, addMember, close }) => {
    const { getMember } = useApiContext()

    const [data, setData] = useState()
    useEffect(() => {
        setData(getMember(id))
    }, [])

    return <div className="ui card member-card" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <div className="image">
                <img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" />
            </div>
            <div className="content">
                <a className="header">{data?.first_name} {data?.last_name}</a>
                <div className="meta">
                    <span className="date">Entry ID: {data?.id.split('-')[0]}</span>
                </div>
                <div className="description">
                    Gender: {data?.gender} <br />
                    Date of Birth: {data?.dob || 'Unknown'} <br />
                    { data?.dod && `Date of Death: ${data?.dod}` }
                </div>
            </div>
            <div className="extra content" style={{justifyContent: 'right', display: 'flex'}}>
                <button onClick={addMember} className="ui button primary">Add relative</button>
                <button onClick={close} className="ui button">Close</button>
            </div>
        </div>
}

export default MemberCard;