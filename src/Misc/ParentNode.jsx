import { Handle } from "@xyflow/react";

const ParentNode = ({ data }) => {
    return <div className="node">
        <div>{data.label}</div>
        <Handle
            type="target"
            position="top"
            style={{ background: '#555' }}
        />
        <Handle
            type="source"
            position="bottom"
            id="bottom-source"
            style={{ background: '#555' }}
        />
        <Handle
            type="source"
            position="right"
            id="right-source"
            style={{ background: '#555' }}
        />
    </div>
};

export default ParentNode;