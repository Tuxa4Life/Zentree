import { useEffect, useState } from "react";
import { useApiContext } from "../Hooks/useContext";
import RoleAndMember from "./RoleAndMember";
import MemberField from "./MemberField";
import LastCheck from "./LastCheck";

const EditWindow = ({ nodeId, close }) => {
    const { getMember } = useApiContext()
    const [newMember, setNewMember] = useState({})
    
    const [window, setWindow] = useState(false)
    const [fields, setFields] = useState(false)
    const [check, setCheck] = useState(false)

    const toggleWindowFields = () => {
        setWindow(!window)
        setFields(!fields)
    }
    const toggleFieldCheck = () => {
        setFields(!fields)
        setCheck(!check)
    }

    const [role, setRole] = useState('child')
    const [member, setMember] = useState({})

    useEffect(() => {
        if (window) setWindow(false)
        setMember(getMember(nodeId))
    }, [nodeId])

    const upload = () => {
        console.log(newMember)
    }

    return <div className="edit-container">
        { !window && <RoleAndMember member={member} setWindow={setWindow} role={role} setRole={setRole} next={toggleWindowFields} close={close} /> }
        { (window && !fields && !check) && <h2 style={{marginTop: '20px'}} className="ui header">Click on target node to select a member.</h2> }
        { fields && <MemberField surname={member?.last_name} setNewMember={setNewMember} back={toggleWindowFields} next={toggleFieldCheck} /> }
        { check && <LastCheck member={member} newMember={newMember} role={role} upload={upload} close={close} /> }
    </div>
}

export default EditWindow;