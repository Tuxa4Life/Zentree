import { useEffect, useState } from "react";
import { useApiContext } from '../Hooks/useContext'
import { Background, Controls, ReactFlow } from "@xyflow/react";
import ParentNode from "../Misc/ParentNode";
import SpouseNode from "../Misc/SpouseNode";
import ChildNode from "../Misc/ChildNode";
import '@xyflow/react/dist/style.css';
import '../Styles/app.css'
import { useParams } from "react-router-dom";

const Graph = () => { // TODO: Loading screen
    const { members, spouseRelations, childRelations, buildNodes, buildEdges, setQuery } = useApiContext()
    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])

    const { surname } = useParams()

    useEffect(() => {
        const query = `${surname.at(0).toUpperCase()}${surname.slice(1)}`
        setQuery(query)
    }, [surname])

    useEffect(() => {
        setNodes([...buildNodes()])
        setEdges([...buildEdges()])
    }, [members, spouseRelations, childRelations])
    
    return <div style={{ width: '99vw', height: '98vh', border: '2px black solid', borderRadius: '6px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodesConnectable={false}
            nodesDraggable={false}
            minZoom={0.1}
            nodeTypes={{ parent: ParentNode, spouse: SpouseNode, child: ChildNode }}
            maxZoom={5}
            onNodeClick={(_, { id }) => console.log(id)}
        >
            <Controls />
            <Background variant="dots" gap={25} size={1} />
        </ReactFlow>
    </div>
}

export default Graph;