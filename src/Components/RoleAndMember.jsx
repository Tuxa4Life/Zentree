const RoleAndMember = ({ member, role, setRole, setWindow, next, setIsRoot, close }) => {
    return <div className="edit-window ui card">
        <h2 className="ui dividing header">Your are now adding a new relative to the tree!</h2>

        <i style={{ margin: '0 0 15px 10px', color: 'gray' }}>* Select a relation and who it's related to</i>
        <div className="edit-panel">
            <p>Add</p>

            <select onChange={e => setRole(e.target.value)} className="ui dropdown">
                <option value="child">Child</option>
                <option value="parent">Parent</option>
                <option value="spouse">Spouse</option>
            </select>

            <p>of</p>

            <button onClick={() => setWindow(true)} className="ui button secondary inverted">{member.id ? `${member?.first_name} ${member?.last_name}` : 'Choose member'}</button>
        </div>

        <div className="buttons">
            <button onClick={next} className={`ui button primary ${role && member.id ? '' : 'disabled'}`}>Next</button>
            <button onClick={close} className="ui button">Close</button>
        </div>

        <div className="new-branch-btn">
            <div className="ui horizontal divider">Or</div>
            <button onClick={() => setIsRoot(true)} className="ui labeled icon button grey">
                Start a new branch
                <i className="add icon"></i>
            </button>
        </div>
    </div>
}

export default RoleAndMember;