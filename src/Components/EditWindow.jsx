import { useEffect, useState } from "react";
import { useApiContext } from "../Hooks/useContext";
import RoleAndMember from "./RoleAndMember";
import MemberField from "./MemberField";
import LastCheck from "./LastCheck";

// TODO: Check for already existing spouse and parent

const EditWindow = ({ nodeId, close }) => {
    const { getMember, insertColumns, updateItemsLocally } = useApiContext()
    const [newMember, setNewMember] = useState({})

    const [window, setWindow] = useState(false)
    const [fields, setFields] = useState(false)
    const [check, setCheck] = useState(false)
    const [isRoot, setIsRoot] = useState(false)

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
        
        const instance = {
            first_name: newMember.first_name,
            last_name: newMember.last_name,
            gender: newMember.gender,
            dob: newMember.dob,
            dod: newMember.dod
        }
        
        if (isRoot) {
            insertColumns('members', [instance])
            return
        }

        insertColumns('members', [instance]).then((data) => {
            if (role === 'child') {
                insertColumns('children', [{
                    child_id: data[0].id,
                    parent_id: member.id
                }])
            }
            if (role === 'parent') {
                insertColumns('children', [{
                    parent_id: data[0].id,
                    child_id: member.id
                }])
            }
            if (role === 'spouse') {
                insertColumns('spouses', [{
                    wife_id: data[0].id,
                    husband_id: member.id
                }])
            }

            updateItemsLocally(data[0], member, role)
        })
    }

    return <div className="edit-container">
        {!window && !isRoot && <RoleAndMember member={member} setWindow={setWindow} role={role} setRole={setRole} setIsRoot={setIsRoot} next={toggleWindowFields} close={close} />}
        {(window && !fields && !check) && <h2 style={{ marginTop: '20px' }} className="ui header">Click on target node to select a member. <span onClick={close} style={{textDecoration: 'underline', pointerEvents: 'all', cursor: 'pointer'}}>cancel</span></h2>}
        {(fields || isRoot) && <MemberField surname={member?.last_name} setNewMember={setNewMember} back={() => { toggleWindowFields(); setIsRoot(false) }} next={toggleFieldCheck} />}
        {check && <LastCheck member={member} newMember={newMember} role={role} upload={upload} close={close} />}
    </div>
}

export default EditWindow;