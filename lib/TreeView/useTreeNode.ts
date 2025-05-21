import { useEffect, useMemo, useRef, useState } from 'react';
import { Config, ID, Mapper, TreeNode } from './type.model';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_MAPPER: Mapper = {
    id: 'id',
    name: 'name',
    children: 'children',
    checked: 'checked',
};

export const useTreeNode = ({ data, mapper, config }: { data: any | Array<any> | null, mapper?: Mapper, config?: Config }): TreeNode => {
    const [current, setCurrent] = useState<Array<ID>>([]);
    const [triggerOpen, setTriggerOpen] = useState<number>(0);
    const [processedData, setProcessedData] = useState<any>(null);

    const instanceIdRef = useRef<string>(uuidv4());
    const eventTargetRef = useRef(new EventTarget());

    const handlerMapper = useMemo(() => ({ ...DEFAULT_MAPPER, ...mapper }), [mapper]);
    const handlerConfig = useMemo(() => ({ ...config }), [config]);

    const getIdByFolder = (dataHandling: any | any[] | null): ID[] => {
        const result: ID[] = [];
        const traverse = (node: any) => {
            if (!node) return;

            if (Array.isArray(node)) {
                node.forEach(traverse);
                return;
            }
            const hasNoChildren =
                !Array.isArray(node[handlerMapper.children]) || node[handlerMapper.children].length === 0;

            if (node[handlerMapper.id] !== undefined && hasNoChildren) {
                result.push(node[handlerMapper.id]);
            }

            if (Array.isArray(node[handlerMapper.children])) {
                node[handlerMapper.children].forEach(traverse);
            }
        };

        traverse(dataHandling);
        return result;
    };

    const getIdByChecked = (dataHandling: any | any[] | null): ID[] => {
        const result: ID[] = [];
        const traverse = (node: any) => {
            if (!node) return;

            if (Array.isArray(node)) {
                node.forEach(traverse);
                return;
            }

            const hasNoChildren =
                !Array.isArray(node[handlerMapper.children]) || node[handlerMapper.children].length === 0;

            if (node[handlerMapper.id] !== undefined && hasNoChildren && node[handlerMapper.checked]) {
                result.push(node[handlerMapper.id]);
            }

            if (Array.isArray(node[handlerMapper.children])) {
                node[handlerMapper.children].forEach(traverse);
            }
        };
        traverse(dataHandling);
        return result;
    };

    const checkAll = () => setCurrent(getIdByFolder(processedData));

    const unCheckAll = () => setCurrent([]);

    const openAll = () => setTriggerOpen((prev) => (prev % 2 === 0 ? prev + 2 : prev + 1));

    const closeAll = () => setTriggerOpen((prev) => (prev % 2 === 1 ? prev + 2 : prev + 1));

    const generateCheckedTree = (filterFields?: Array<string>): any => {
        const mapNode = (node: any): any => {
            if (!node) return node;
            if (Array.isArray(node)) {
                return node.map(mapNode);
            }

            const newNode = {
                ...node
            };

            const hasNoChildren = !Array.isArray(node[handlerMapper.children]) || node[handlerMapper.children].length === 0;

            if (hasNoChildren) {
                newNode[handlerMapper.checked] = current.includes(node[handlerMapper.id])
            }

            if (Array.isArray(node[handlerMapper.children])) {
                newNode[handlerMapper.children] = node[handlerMapper.children].map(mapNode);
            }

            if (!filterFields) return newNode;

            const filterSet = new Set(filterFields);

            const filteredNode: any = {};
            Object.keys(newNode).forEach(field => {
                if (!filterSet.has(field)) {
                    filteredNode[field] = newNode[field];
                }
            });

            return filteredNode;
        };

        return mapNode(processedData);
    };

    const assignIdIfMissing = (node: any): any => {
        if (!node) return node;
        if (Array.isArray(node)) {
            return node.map(assignIdIfMissing);
        }

        if (node[handlerMapper.id] === undefined || node[handlerMapper.id] === null) {
            node[handlerMapper.id] = uuidv4();
        }

        if (Array.isArray(node[handlerMapper.children])) {
            node[handlerMapper.children] = node[handlerMapper.children].map(assignIdIfMissing);
        }
        return node;
    };

    const onCheckedChange = (callback: (currentTree: TreeNode) => void) => {
        const eventName = `checkedChange-${instanceIdRef.current}`;
        const handler = (event: Event) => {
            const customEvent = event as CustomEvent;
            callback(customEvent.detail);
        };
        eventTargetRef.current.addEventListener(eventName, handler);

        return () => {
            eventTargetRef.current.removeEventListener(eventName, handler);
        };
    };


    useEffect(() => {
        if (data) {
            const newData = assignIdIfMissing(JSON.parse(JSON.stringify(data)));
            setProcessedData(newData);
        } else {
            setProcessedData(null);
        }
    }, [data, handlerMapper]);

    useEffect(() => {
        if (!processedData) return
        if (handlerConfig.initalChecked !== undefined && handlerConfig.initalChecked !== null) {
            setCurrent(handlerConfig.initalChecked ? getIdByFolder(processedData) : []);
        } else {
            setCurrent(getIdByChecked(processedData));
        }
    }, [processedData, handlerConfig.initalChecked, handlerMapper]);

    const treeNode: TreeNode = {
        originalData: data,
        data: processedData,
        mapper: handlerMapper,
        config: handlerConfig,
        current,
        triggerOpen,
        setCurrent,
        getIdByFolder,
        checkAll,
        unCheckAll,
        openAll,
        closeAll,
        generateCheckedTree,
        onCheckedChange
    };

    useEffect(() => {
        const eventName = `checkedChange-${instanceIdRef.current}`;
        const event = new CustomEvent(eventName, { detail: treeNode });
        eventTargetRef.current.dispatchEvent(event);
    }, [current]);

    return treeNode;
}
