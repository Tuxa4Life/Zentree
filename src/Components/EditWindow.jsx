import { useEffect, useState } from "react";
import { useApiContext } from "../Hooks/useContext";
import RoleAndMember from "./RoleAndMember";

const EditWindow = ({ nodeId, close }) => {
    const { getMember } = useApiContext()
    const [hideWindow, setHideWindow] = useState(false)

    const [role, setRole] = useState('child')
    const [member, setMember] = useState({})

    useEffect(() => {
        if (hideWindow) setHideWindow(false)
        setMember(getMember(nodeId))
    }, [nodeId])

    return <div className="edit-container">
        { !hideWindow && <RoleAndMember member={member} setHideWindow={setHideWindow} role={role} setRole={setRole} close={close} /> }
        { hideWindow && <h2 style={{marginTop: '20px'}} className="ui header">Click on target node to select a member.</h2> }
    </div>
}

export default EditWindow;