const EditWindow = ({ close }) => {
    return <div className="edit-container">
        <div className="edit-window ui card">
            <h1 className="ui dividing header">Your are now adding new relative to the tree!</h1>

            <i style={{margin: '0 0 15px 10px', color: 'gray'}}>* Select a relation and who it's related to</i>
            <div className="edit-panel">
                <p>Add</p>

                <select className="ui dropdown">
                    <option value="child">Child</option>
                    <option value="parent">Parent</option>
                    <option value="spouse">Spouse</option>
                </select>

                <p>of</p>

                <button className="ui button secondary inverted">Choose member</button>
            </div>

            <div className="buttons">
                <button className="ui button primary disabled">Next</button>
                <button onClick={close} className="ui button">Close</button>
            </div>
        </div>
    </div>
}

export default EditWindow;