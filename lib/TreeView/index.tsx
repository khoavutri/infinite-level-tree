import React from 'react';
import RecursiveCytology from './RecursiveCytology'
import styles from './styles.module.css'
import { TreeNode } from './type.model';

type TreeViewProps = React.LabelHTMLAttributes<HTMLDivElement> & {
  treeNode: TreeNode;
  popoverContent?: any;
  folderIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
  toggleIcon?: React.ReactNode;
  folderNameStyle?: React.CSSProperties;
  itemNameStyle?: React.CSSProperties;
  checkboxStyle?: React.CSSProperties;
  triggerPopoverStyle?: React.CSSProperties;
  popoverStyle?: React.CSSProperties;
};


export function TreeView({
  treeNode,
  className,
  popoverContent,
  folderIcon,
  expandIcon,
  toggleIcon,
  folderNameStyle,
  itemNameStyle,
  checkboxStyle,
  triggerPopoverStyle,
  popoverStyle,
  ...restProps
}: TreeViewProps) {

  return <div
    className={`${className} ${styles.infiniteLevelTree}`}
    {...restProps}>
    <RecursiveCytology
      treeNode={treeNode}
      data={treeNode.data}
      num={0}
      popoverContent={popoverContent}
      folderIcon={folderIcon}
      toggleIcon={toggleIcon}
      expandIcon={expandIcon}
      folderNameStyle={folderNameStyle}
      itemNameStyle={itemNameStyle}
      checkboxStyle={checkboxStyle}
      triggerPopoverStyle={triggerPopoverStyle}
      popoverStyle={popoverStyle}
    />

  </div>
}