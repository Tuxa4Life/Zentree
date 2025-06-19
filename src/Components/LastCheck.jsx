const LastCheck = ({ newMember, member, role, upload, close }) => {
    return <div className="ui cards check">
        <div className="card">
            <div className="content">
                <div className="header">
                    Are you sure?
                </div>
                <div className="description">
                    <strong>{newMember.first_name} {newMember.last_name} </strong>
                    will be added as a
                    <span style={{ textDecoration: 'underline' }}> {role} </span>
                    for
                    <strong> {member.first_name} {member.last_name}</strong>.
                </div>
                <div className="description">
                    <br />
                    Birthday: {newMember.dob} <br />
                    { newMember.dod && `Deceased: ${newMember.dod}` }
                </div>
            </div>
            <div className="extra content">
                <div className="ui two buttons">
                    <div onClick={() => {upload(); close()}} className="ui basic green button">Submit</div>
                    <div onClick={close} className="ui basic red button">Cancel</div>
                </div>
            </div>
        </div>
    </div>
}

export default LastCheck;