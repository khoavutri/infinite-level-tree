import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Popover } from './Popover';
import { TreeNode } from './type.model';

type Props = {
  data: any | any[] | null;
  num: number;
  treeNode: TreeNode;
  popoverContent?: any;
  folderIcon: React.ReactNode | undefined;
  toggleIcon: React.ReactNode | undefined;
  expandIcon: React.ReactNode | undefined;
  folderNameStyle: React.CSSProperties | undefined;
  itemNameStyle: React.CSSProperties | undefined;
  checkboxStyle: React.CSSProperties | undefined;
  triggerPopoverStyle: React.CSSProperties | undefined;
  popoverStyle: React.CSSProperties | undefined;
};

const RecursiveCytology = ({
  data,
  num,
  popoverContent,
  treeNode,
  folderIcon,
  toggleIcon,
  expandIcon,
  folderNameStyle,
  itemNameStyle,
  checkboxStyle,
  triggerPopoverStyle,
  popoverStyle
}: Props) => {
  const margin = treeNode.config.left || 10;
  const [open, setOpen] = useState(treeNode.config.initalOpen || false);

  useEffect(() => {
    if (treeNode.triggerOpen) {
      setOpen(treeNode.triggerOpen % 2 === 0);
    }
  }, [treeNode.triggerOpen]);

  if (!data) return <></>;

  if (Array.isArray(data)) {
    return (
      <>
        {data.map((item: any, index: number) => (
          <RecursiveCytology
            key={item.id || index}
            data={item}
            treeNode={treeNode}
            num={num}
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
        ))}
      </>
    );
  }

  if (data[treeNode.mapper.children] && data[treeNode.mapper.children].length > 0) {
    return (
      <>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: num * margin,
            width: 'max-content',
            maxWidth: '100%',
          }}
        >
          <span
            style={{
              marginRight: 8,
              cursor: "pointer"
            }}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open
              ? (expandIcon || (
                <span style={{
                  fontSize: 12,
                  color: '#1e293b',
                  userSelect: "none"
                }}>▼</span>
              ))
              : (toggleIcon || (
                <span style={{
                  transform: 'rotate(-90deg)',
                  fontSize: 12,
                  color: '#1e293b',
                  userSelect: "none"
                }}>▼</span>
              ))
            }
          </span>
          <span
            style={{
              fontSize: 12,
              cursor: "pointer"
            }}
            onClick={() => {
              const allId = treeNode.getIdByFolder(data)
              const dataList = allId.filter(it => !treeNode.current.includes(it))
              if (!dataList.length) { treeNode.setCurrent((prev: any) => prev.filter((it: any) => !allId.includes(it))) }
              else { treeNode.setCurrent([...treeNode.current, ...dataList]) }
            }}
          >
            {treeNode.config.levelIcon?.[num] ?? folderIcon ??
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                style={{
                  color: '#4b5563',
                }}
              >
                <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z" />
              </svg>}
          </span>
          <h5
            style={{
              margin: 0,
              paddingLeft: '4px',
              whiteSpace: 'nowrap',
              cursor: "pointer",
              userSelect: "none",
              ...(folderNameStyle || {})
            }}
            onClick={() => {
              if (treeNode.config.disableOnlyFolder) {
                const allId = treeNode.getIdByFolder(data)
                const dataList = allId.filter(it => !treeNode.current.includes(it))
                if (!dataList.length) { treeNode.setCurrent((prev: any) => prev.filter((it: any) => !allId.includes(it))) }
                else { treeNode.setCurrent([...treeNode.current, ...dataList]) }
              } else {
                const dataList = treeNode.getIdByFolder(data)
                treeNode.setCurrent([...dataList])
              }
            }}
          >
            {data[treeNode.mapper.name]}
          </h5>
        </div>
        {open && (
          <RecursiveCytology
            data={data[treeNode.mapper.children]}
            num={num + 1}
            treeNode={treeNode}
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
        )}
      </>
    );
  }

  return (
    <div
      style={{ marginBottom: 2, marginLeft: num * margin }}
      className={styles.itemCheckBox}
    >
      <Popover
        placement='right'
        content={popoverContent ? popoverContent({ data: data }) : null}
        popoverStyle={popoverContent}
        triggerStyle={triggerPopoverStyle}>
        <div
          style={{
            display: 'flex',
            cursor: "pointer"
          }}
        >
          <input
            type="checkbox"
            checked={treeNode.current.includes(data[treeNode.mapper.id])}
            onChange={() => {
              if (treeNode.current.includes(data[treeNode.mapper.id])) {
                treeNode.setCurrent((prev: any) => prev.filter((its: any) => {
                  return its !== data[treeNode.mapper.id]
                }))
              } else {
                treeNode.setCurrent((prev: any) => [...prev, data[treeNode.mapper.id]])
              }
            }}
            style={{ marginRight: 6, ...(checkboxStyle || {}) }}
          />
          <span
            style={{
              minWidth: 100,
              ...(itemNameStyle || {})
            }}
            onClick={() => {
              if (treeNode.config.disableOnlyItem) {
                if (treeNode.current.includes(data[treeNode.mapper.id])) {
                  treeNode.setCurrent((prev: any) => prev.filter((its: any) => {
                    return its !== data[treeNode.mapper.id]
                  }))
                } else {
                  treeNode.setCurrent((prev: any) => [...prev, data[treeNode.mapper.id]])
                }
              } else {
                treeNode.setCurrent([data[treeNode.mapper.id]])
              }
            }}
          >
            {data[treeNode.mapper.name]}
          </span>
        </div>
      </Popover>
    </div>
  );
};

export default RecursiveCytology;
