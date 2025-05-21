# 🚀 Infinite Level Tree

📦 **Owned by:** [Vu Tri Khoa](https://github.com/khoavutri) ([GitLab](https://gitlab.com/khoavip07))

## 🔧 Node.js Version

![Node Version](https://img.shields.io/badge/node-v18.17.1-green)

---

## ✨ Features

- ⚡ **High Performance:** Built for speed and scalability, optimized for large datasets with infinite scrolling.
- 🛠️ **Ease of Use:** Developer-friendly API with straightforward setup and customization.
- 🔒 **Secure:** Follows the latest security best practices for safe DOM manipulation and data handling.

---

## 📜 Installation

```bash
# Clone the repository
git clone https://github.com/khoavutri/infinite-level-tree.git

# Install dependencies
npm install

# Start the application
npm start
```

---

## 📜 Demo

Explore the `infinite-level-tree` in action! The demo showcases a dynamic, hierarchical tree structure with features like node selection, drag-and-drop, and lazy loading of child nodes.

📺 **Live Demo**: [Coming soon!](#) _(Placeholder link, to be updated with a hosted demo)_  
🖼️ **Screenshot**:  
![Demo Screenshot](https://via.placeholder.com/600x400.png?text=Infinite+Level+Tree+Demo) _(Replace with actual screenshot)_

To run the demo locally:

1. Follow the [Installation](#installation) steps.
2. Run `npm run demo` (if available, check repository for specific demo scripts).
3. Open `http://localhost:3000` in your browser to interact with the tree.

---

## 📜 API

The `infinite-level-tree` library provides a powerful and flexible API for creating and managing hierarchical tree structures. Below is an overview of the key methods and configuration options.

### Installation

Install via npm:

```bash
npm install infinite-level-tree
```

### Basic Usage

Initialize a tree with a DOM element and data structure:

```javascript
import { useEffect } from "react";
import { TreeView, useTreeNode } from "infinite-level-tree";
import data from "./test.json";

const MyTooltip = ({ data }: { data?: any }) => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <h4>{data && data.name}</h4>
      <p>{data && data.describe}</p>
    </div>
  );
};

const App = () => {
  const tree = useTreeNode({ data, config: { left: 50 } });

  useEffect(() => {
    const unsubscribe = tree.onCheckedChange((x) => {
      console.log(x.generateCheckedTree());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <TreeView treeNode={tree} popoverContent={MyTooltip} />
      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
        <button onClick={() => tree.checkAll()}>Check All</button>

        <button onClick={() => tree.unCheckAll()}>Uncheck All</button>

        <button onClick={() => tree.openAll()}>Open All</button>

        <button onClick={() => tree.closeAll()}>Close All</button>

        <button
          style={{ backgroundColor: "#3b82f6", color: "#fff" }}
          onClick={() => {
            const newData = tree.generateCheckedTree();
            console.log(newData);
          }}
        >
          Generate Data
        </button>
      </div>
    </div>
  );
};

export default App;
```

### Configuration Options

- **`el`**: `(HTMLElement)` - DOM element to render the tree.
- **`data`**: `(Object|Array)` - Tree data with `id`, `name`, and optional `children` and `loadOnDemand` properties.
- **`autoOpen`**: `(Boolean)` - Expand all nodes on initialization (default: `false`).
- **`droppable`**: `(Object)` - Configure drag-and-drop behavior (e.g., `hoverClass`, `accept`, `drop`).
- **`shouldLoadNodes`**: `(Function)` - Determines if a node’s children should be loaded dynamically.
- **`loadNodes`**: `(Function)` - Handles asynchronous loading of child nodes.
- **`rowRenderer`**: `(Function)` - Customizes node rendering (returns HTML string).
- **`shouldSelectNode`**: `(Function)` - Controls node selection logic.

### Key Methods

- **`getNodeById(id)`**: Retrieves a node by ID.
- **`selectNode(node)`**: Selects a node programmatically.
- **`openNode(node)`**: Expands a node.
- **`closeNode(node)`**: Collapses a node.
- **`getSelectedNode()`**: Returns the currently selected node.
- **`on(event, callback)`**: Attaches event listeners (e.g., `click`, `openNode`, `contentDidUpdate`).

### Example: Dynamic Node Loading

```javascript
const tree = new InfiniteLevelTree({
  el: document.querySelector("#tree-container"),
  data: { id: "root", name: "Root", loadOnDemand: true },
  shouldLoadNodes: (node) => node.loadOnDemand,
  loadNodes: (parentNode, next) => {
    setTimeout(() => {
      next(null, [
        {
          id: `${parentNode.id}.1`,
          name: `${parentNode.name}.1`,
          loadOnDemand: true,
        },
        { id: `${parentNode.id}.2`, name: `${parentNode.name}.2` },
      ]);
    }, 1000);
  },
});
```

For a complete API reference, see the [GitHub repository](https://github.com/khoavutri/infinite-level-tree).

---

## 📞 Support

💌 **Email:** Reach out to me at [khoavutri@gmail.com](mailto:khoavutri@gmail.com)  
🐛 **GitHub Issues:** Found a bug or have a suggestion? [Open an issue here](https://github.com/khoavutri/infinite-level-tree)  
💬 **Community Chat:** Join the discussion on [Facebook](https://www.facebook.com/company.dev.khoa)
