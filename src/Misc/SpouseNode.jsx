import { Handle } from "@xyflow/react";

const SpouseNode = ({ data }) => {
    return <div className="node">
        <div>{data.label}</div>
        <Handle
            type="target"
            position="left"
            style={{ background: '#555' }}
        />
    </div>
};

export default SpouseNode;