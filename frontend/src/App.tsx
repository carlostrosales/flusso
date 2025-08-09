import { BlockEditor } from "./DocumentEditor/BlockEditor";
import { useState } from "react";
import "./App.css";

type Block = {
  id: string;
  content: string;
  type: "paragraph" | "prompt" | "response";
};

let arrayOfObjectBlocks: Block[] = [
  {
    id: "1",
    content: "Example 1",
    type: "paragraph",
  },
  {
    id: "2",
    content: "Example 2",
    type: "paragraph",
  },
];

function App() {
  const [blocksArray, setBlocksArray] = useState<Block[]>(arrayOfObjectBlocks);

  return (
    <>
      <BlockEditor blocksArray={blocksArray} onBlocksChange={setBlocksArray} />
    </>
  );
}

export default App;
