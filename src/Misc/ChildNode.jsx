import { Handle } from "@xyflow/react";

const ChildNode = ({ data }) => {
    return <div style={{ position: 'relative', textAlign: 'center', padding: '10px', border: '1px solid black', borderRadius: '5px', backgroundColor: 'white', width: '150px' }}>
        <div>{data.label}</div>
        <Handle
            type="target"
            position="top"
            style={{ background: '#555' }}
        />
    </div>
};

export default ChildNode;