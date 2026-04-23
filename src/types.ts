
export interface NodeData {
  id: string;
  value: number;
  color: string;
  isNew?: boolean;
  isHighlight?: boolean;
  isProcessing?: boolean;
  isRecentlyAdded?: boolean;
}

export type StepAction = 
  | 'CREATE_NODE'
  | 'TRAVERSE'
  | 'SEARCH'
  | 'UPDATE_NEXT'
  | 'UPDATE_HEAD'
  | 'COMPLETE';

export interface Step {
  description: string;
  lineIndex: number;
  nodes: NodeData[];
  activeNodeId?: string;
  highlightedIndices?: number[];
  action?: StepAction;
}
