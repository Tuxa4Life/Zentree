import { useEffect, useState } from "react";
import { useApiContext } from '../Hooks/useContext'
import { Background, Controls, ReactFlow } from "@xyflow/react";
import ParentNode from "../Misc/ParentNode";
import SpouseNode from "../Misc/SpouseNode";
import ChildNode from "../Misc/ChildNode";
import '@xyflow/react/dist/style.css';
import '../Styles/graph.css'
import { useParams } from "react-router-dom";
import MemberCard from "../Components/MemberCard";
import EditWindow from "../Components/EditWindow";

// TODO: adding family member
// TODO: when button is clicked, hide button and show text to add sibling spouse or parent of target branch member
// TODO: there will be options to cancel process or start new root 
// TODO: after choosing banch target, it will show preview like John Doe's -> parent and when you click next
// TODO: new window will pop up where u fill the creds

const Graph = () => {
    const { members, spouseRelations, childRelations, buildNodes, buildEdges, setQuery } = useApiContext()
    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])
    const [cardId, setCardId] = useState('')

    const { surname } = useParams()
    const [isEditing, setIsEditing] = useState(false)

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
            fitView
            onNodeClick={(_, { id }) => setCardId(id)}
        >
            <Controls />
            <Background variant="dots" gap={25} size={1} />
        </ReactFlow>

        { cardId && <MemberCard id={cardId} close={() => setCardId('')} /> }
        { isEditing && <EditWindow close={() => setIsEditing(false)} /> }

        <button onClick={() => setIsEditing(true)} style={{ display: `${isEditing ? 'none' : 'block'}`, position: 'absolute', bottom: '8px', right: '5px' }} className="ui icon secondary inverted button">Add family member</button>
    </div>
}

export default Graph;