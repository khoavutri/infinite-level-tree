import { ReactNode } from "react";

export type ID = string | number;

export type Mapper = {
  id: string;
  name: string;
  children: string;
  checked: string;
};

export type Config = {
  initalChecked?: boolean;
  initalOpen?: boolean;
  left?: number;
  disableOnlyFolder?: boolean;
  disableOnlyItem?: boolean;
  levelIcon?: Record<number, ReactNode>;
};

export type TreeNode = {
  data: any | Array<any> | null;
  originalData: any | Array<any> | null;
  current: Array<ID>;
  setCurrent: any;
  getIdByFolder: (data: any | Array<any> | null) => Array<ID>;
  config: Config;
  mapper: Mapper;
  checkAll: () => void;
  unCheckAll: () => void;
  openAll: () => void;
  closeAll: () => void;
  triggerOpen: number;
  generateCheckedTree: (filterFields?: Array<string>) => any;
  onCheckedChange: (callback: (currentTree: TreeNode) => void) => () => void;
};
