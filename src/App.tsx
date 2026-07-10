import { useEffect } from 'react';
import { TreeView, useTreeNode } from '../lib/main'
import data from "./test.json"

const MyTooltip = ({ data }: { data?: any }) => {
  return <div style={{ margin: 0, padding: 0 }}>
    <h4>{data && data.name}</h4>
    <p>{data && data.describe}</p>
  </div>
};

const App = () => {
  const tree = useTreeNode({
    data,
    config: {
      left: 50,
      levelIcon: {
        0: <span>🏥</span>,
        1: <span>📂</span>,
        2: <span>🧬</span>,
      },
    },
  })

  useEffect(() => {
    const unsubscribe = tree.onCheckedChange((x) => {
      console.log(x.generateCheckedTree());
    });

    return () => {
      unsubscribe();
    };
  }, [])

  return (
    <div style={{ height: '100%', }}>
      <TreeView treeNode={tree} popoverContent={MyTooltip} />
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <button
          onClick={() => tree.checkAll()}
        >
          Check All
        </button>

        <button
          onClick={() => tree.unCheckAll()}
        >
          Uncheck All
        </button>

        <button
          onClick={() => tree.openAll()}
        >
          Open All
        </button>

        <button
          onClick={() => tree.closeAll()}
        >
          Close All
        </button>

        <button
          style={{ backgroundColor: '#3b82f6', color: '#fff' }}
          onClick={() => {
            const newData = tree.generateCheckedTree();
            console.log(newData);
          }}
        >
          Generate Data
        </button>
      </div>
    </div>
  )
}

export default App
