import { BlockEditor } from './DocumentEditor/BlockEditor';
import { useState } from 'react';
import './App.css';
import type { Block } from './types.ts';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

let arrayOfObjectBlocks: Block[] = [
  {
    id: '1',
    content: 'Example 1',
    type: 'paragraph',
  },
  {
    id: '2',
    content: 'Example 2',
    type: 'paragraph',
  },
];

const App = () => {
  const [blocksArray, setBlocksArray] = useState<Block[]>(arrayOfObjectBlocks);

  return (
    <>
      <div className="min-h-screen bg-white-50 flex items-center justify-center flex-col">
        <div className="flex items-center justify-between w-5/6 mb-4">
          <Typography>Title</Typography>
          <Button variant="contained">Publish</Button>
        </div>
        <div className="w-5/6 min-h-150 mx-auto bg-gray-100">
          <BlockEditor blocksArray={blocksArray} onBlocksChange={setBlocksArray} />
        </div>
      </div>
    </>
  );
};

export default App;
