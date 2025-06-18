import { Handle } from "@xyflow/react";

const ChildNode = ({ data }) => {
    return <div className="node">
        <div>{data.label}</div>
        <Handle
            type="target"
            position="top"
            style={{ background: '#555' }}
        />
    </div>
};

export default ChildNode;