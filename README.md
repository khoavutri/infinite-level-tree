# 🚀 [Infinite Level Tree](https://www.npmjs.com/package/infinite-level-tree)

📦 **Owned by:** [Vu Tri Khoa](https://github.com/khoavutri) ([GitLab](https://gitlab.com/khoavip07))

## 🔧 Node.js Version

![Node Version](https://img.shields.io/badge/node-v18.17.1-green)

---

## ✨ Features

- ⚡ **Dynamic and Scalable Tree Rendering**: Efficiently handles large, hierarchical datasets with support for dynamic node loading, ideal for applications like file explorers or organizational charts.
- 🛠️ **React-Friendly API**: Seamlessly integrates with React using the `TreeView` component and `useTreeNode` hook, offering intuitive setup and customizable node rendering.
- ✅ **Interactive Node Selection**: Supports checkable nodes with bulk check/uncheck functionality, enabling easy management of selected items across the tree.
- 🔄 **Flexible Node Expansion**: Provides programmatic control over node expansion and collapse, with customizable icons and styles for a tailored user experience.
- 🔒 **Secure and Reliable**: Ensures safe data handling with automatic ID generation for nodes and secure event management, adhering to modern React best practices.

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

The `infinite-level-tree` library leverages the `useTreeNode` hook and `TreeView` component to manage tree structures in React applications. Below are the key configuration options for the `useTreeNode` hook and `TreeView` component.

#### `useTreeNode` Hook Configuration

The `useTreeNode` hook processes tree data and provides state management for node selection and expansion. It accepts the following parameters:

- **`data`**: `(Object | Array | null)` - The tree data structure. Each node should include properties like `id`, `name`, `children` (optional), and `checked` (optional). If `id` is missing, a UUID is automatically assigned.
- **`mapper`**: `(Mapper)` - Customizes property names for the tree data. Defaults to:
  ```javascript
  {
    id: 'id',
    name: 'name',
    children: 'children',
    checked: 'checked'
  }
  ```
  Example: `{ id: 'key', name: 'label', children: 'subnodes' }` to map custom field names.
- **`config`**: `(Config)` - Optional configuration object. Supports:
  - `initalChecked`: `(Boolean | null)` - If `true`, all leaf nodes are checked initially; if `false`, none are checked; if `null`, uses the `checked` property from the data.

#### `TreeView` Component Props

The `TreeView` component renders the tree structure and supports customization for styling and behavior. It accepts the following props:

- **`treeNode`**: `(TreeNode)` - The tree node object returned by `useTreeNode`, containing processed data and methods.
- **`popoverContent`**: `(any)` - Optional content for a popover displayed on node interaction.
- **`folderIcon`**: `(React.ReactNode)` - Custom icon for folder nodes.
- **`expandIcon`**: `(React.ReactNode)` - Custom icon for expanded nodes.
- **`toggleIcon`**: `(React.ReactNode)` - Custom icon for toggling node expansion.
- **`folderNameStyle`**: `(React.CSSProperties)` - Custom styles for folder names.
- **`itemNameStyle`**: `(React.CSSProperties)` - Custom styles for item (leaf) names.
- **`checkboxStyle`**: `(React.CSSProperties)` - Custom styles for checkboxes.
- **`triggerPopoverStyle`**: `(React.CSSProperties)` - Styles for the popover trigger.
- **`popoverStyle`**: `(React.CSSProperties)` - Styles for the popover container.
- **`className`**: `(String)` - Additional CSS classes for the tree container, merged with default styles (`styles.infiniteLevelTree`).

### Key Methods

The `useTreeNode` hook returns a `TreeNode` object with methods to manage the tree's state and behavior. Below are the key methods available:

- **`getIdByFolder(data)`**: Returns an array of IDs for all leaf nodes (nodes without children) in the provided data.
  - Parameters: `data` (tree data to traverse).
  - Returns: `ID[]` (array of node IDs).
- **`checkAll()`**: Checks all leaf nodes by setting their IDs in the `current` state.
- **`unCheckAll()`**: Unchecks all nodes by clearing the `current` state.
- **`openAll()`**: Triggers expansion of all nodes by incrementing the `triggerOpen` state.
- **`closeAll()`**: Collapses all nodes by incrementing the `triggerOpen` state.
- **`generateCheckedTree(filterFields?)`**: Generates a new tree with updated `checked` properties based on the `current` state.
  - Parameters: `filterFields` (optional array of field names to exclude from the output).
  - Returns: Processed tree data with updated `checked` properties.
- **`onCheckedChange(callback)`**: Subscribes to changes in the checked state.
  - Parameters: `callback` (function receiving the updated `TreeNode`).
  - Returns: A cleanup function to unsubscribe from the event.
- **`setCurrent(ids)`**: Manually sets the array of checked node IDs.
  - Parameters: `ids` (array of node IDs to mark as checked).

The `TreeNode` object also exposes:

- **`originalData`**: The raw input data.
- **`data`**: The processed tree data with assigned IDs.
- **`mapper`**: The active mapper configuration.
- **`config`**: The active config object.
- **`current`**: Array of currently checked node IDs.
- **`triggerOpen`**: State controlling node expansion.

### Example: Dynamic Node Loading

The `useTreeNode` hook supports dynamic node loading by processing data asynchronously and updating the tree state. Below is an example demonstrating how to integrate `useTreeNode` with `TreeView` for a tree with dynamically loaded nodes.

```javascript
import React, { useEffect } from "react";
import { TreeView, useTreeNode } from "infinite-level-tree";

const App = () => {
  const [data, setData] = React.useState({
    id: "root",
    name: "Root",
    loadOnDemand: true,
    children: [],
  });

  const treeNode = useTreeNode({
    data,
    mapper: {
      id: "id",
      name: "name",
      children: "children",
      checked: "checked",
    },
    config: { initalChecked: false },
  });

  // Log checked nodes
  useEffect(() => {
    const unsubscribe = tree.onCheckedChange((x) => {
      console.log(x.generateCheckedTree());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <TreeView
      treeNode={treeNode}
      folderIcon={<span>📁</span>}
      expandIcon={<span>➡️</span>}
      toggleIcon={<span>🔄</span>}
      folderNameStyle={{ fontWeight: "bold" }}
      itemNameStyle={{ color: "blue" }}
      checkboxStyle={{ marginRight: "5px" }}
      className="custom-tree"
    />
  );
};

export default App;
```

This example:

- Uses `useEffect` to simulate fetching child nodes after a delay.
- Renders the tree with custom icons and styles using the `TreeView` component.
- Subscribes to checked state changes to log selected nodes.

For a complete API reference, see the [GitHub repository](https://github.com/khoavutri/infinite-level-tree).

---

## 📞 Support

💌 **Email:** Reach out to me at [khoavutri@gmail.com](mailto:khoavutri@gmail.com)  
🐛 **GitHub Issues:** Found a bug or have a suggestion? [Open an issue here](https://github.com/khoavutri/infinite-level-tree)  
💬 **Community Chat:** Join the discussion on [Facebook](https://www.facebook.com/company.dev.khoa)
