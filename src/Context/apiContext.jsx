import { createContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const apiUrl = process.env.REACT_APP_SUPABASE_URL;
const apiKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(apiUrl, apiKey)

const ApiContext = createContext()
const ApiProvider = ({ children }) => {
    const [members, setMembers] = useState([])
    const [childRelations, setChildRelations] = useState([])
    const [spouseRelations, setSpouseRelations] = useState([])

    const [query, setQuery] = useState('')
    useEffect(() => {
        getFamily(query)
    }, [query])

    const getFamily = async (surname) => {
        const { data: member_data } = await supabase.rpc('get_family', { lastname_input: surname });
        const { data: spouse_data } = await supabase.rpc('get_spouses', { lastname_input: surname });
        const { data: children_data } = await supabase.rpc('get_children', { lastname_input: surname });
        
        setMembers([...member_data || []])
        setChildRelations([...children_data || []])
        setSpouseRelations([...spouse_data || []])
    }

    const buildTree = () => {
        const map = {};
        const hasParent = new Set();

        members.forEach(m => {
            if (!isWife(m.id)) {
                map[m.id] = {
                    id: m.id,
                    first_name: m.first_name,
                    last_name: m.last_name,
                    children: [],
                    spouse: getMember(getSpouseId(m.id))
                };
            }
        });

        childRelations.forEach(rel => {
            const parent = map[rel.parent_id];
            const child = map[rel.child_id];
            if (parent && child) {
                parent.children.push(child);
                hasParent.add(child.id);
            }
        });

        return Object.values(map).filter(node => !hasParent.has(node.id));
    };

    const buildNodes = () => {
        const nodes = []

        const tree = buildTree()
        let xCounter = 0
        const spacing = 200

        const assignX = (node) => {
            node.children.forEach(assignX)

            if (node.children.length === 0) {
                node.x = xCounter * spacing
                xCounter += getSpouseId(node.id) ? 2 : 1
            } else {
                const first = node.children[0].x
                const last = node.children[node.children.length - 1].x
                node.x = (first + last) / 2
            }
        }
        tree.forEach(assignX)

        const aux = (treeObj, level) => {
            const baseY = level * 100

            nodes.push({
                id: treeObj.id,
                position: { x: treeObj.x, y: baseY },
                data: { label: treeObj.first_name },
                type: getType(treeObj.id)
            })

            const spouseId = getSpouseId(treeObj.id)
            if (spouseId) {
                const spouse = getMember(spouseId)
                nodes.push({
                    id: spouse.id,
                    position: { x: treeObj.x + spacing, y: baseY },
                    data: { label: spouse.first_name },
                    type: 'spouse'
                })
            }

            treeObj.children.forEach(child => aux(child, level + 1))
        }

        tree.forEach(root => aux(root, 0))

        return nodes
    }

    const buildEdges = () => {
        const edges = []
        const tree = buildTree()

        const aux = (treeObj, parent) => {
            edges.push({
                id: `${parent.id}-${treeObj.id}`,
                source: parent.id,
                target: treeObj.id,
                sourceHandle: 'bottom-source',
                type: 'step'
            })

            const spouseId = getSpouseId(treeObj.id)
            if (spouseId) {
                const spouse = getMember(spouseId)
                edges.push({
                    id: `${treeObj.id}-${spouse.id}`,
                    source: treeObj.id,
                    target: spouse.id,
                    label: '❤️',
                    sourceHandle: 'right-source'
                })
            }

            treeObj.children.forEach(child => aux(child, treeObj))
        }
        tree.forEach(root => {
            const spouseId = getSpouseId(root.id)
            if (spouseId) {
                const spouse = getMember(spouseId)
                edges.push({
                    id: `${root.id}-${spouse.id}`,
                    source: root.id,
                    target: spouse.id,
                    label: '❤️',
                    sourceHandle: 'right-source'
                })
            }

            root.children.forEach(child => aux(child, root))
        })

        return edges
    }


    const getType = (id) => {
        const hasChildren = getChildren(id).length > 0;
        const hasSpouse = getSpouseId(id) !== undefined;

        if (!hasChildren && !hasSpouse) return 'child';
        return 'parent';
    }


    const getMember = (id) => {
        return members.find((e) => e.id === id) || {};
    };

    const getChildren = (id) => {
        return childRelations.filter((e) => e.parent_id === id);
    };

    const getSpouseId = (id) => {
        const tmp = spouseRelations.find((e) => e.husband_id === id)
        return tmp?.wife_id || undefined;
    };

    const isWife = (id) => {
        for (let i = 0; i < spouseRelations.length; i++) {
            if (spouseRelations[i].wife_id === id) return true
        }

        return false
    }

    const data = { members, spouseRelations, childRelations, getMember, buildNodes, buildEdges, setQuery }
    return <ApiContext.Provider value={data}>
        {children}
    </ApiContext.Provider>
}

export { ApiProvider }
export default ApiContext;