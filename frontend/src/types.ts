export type Block = {
  id: string;
  content: string;
  type: 'paragraph' | 'prompt' | 'response';
};

export interface BlockEditorProps {
  blocksArray: Block[];
  onBlocksChange: (blocks: Block[] | ((prev: Block[]) => Block[])) => void;
}
