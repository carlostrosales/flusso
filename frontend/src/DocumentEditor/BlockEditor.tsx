import { useState, useRef, useEffect } from 'react';

import type { Block, BlockEditorProps } from '../types.ts';

export const BlockEditor = ({ blocksArray, onBlocksChange }: BlockEditorProps) => {
  const refs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [focusId, setFocusId] = useState<string | null>(null);
  const [showCommandModal, setShowCommandModal] = useState(false);
  const [modalBlockId, setModalBlockId] = useState<string | null>(null);
  const [showAskModal, setShowAskModal] = useState(false);
  const [question, setQuestion] = useState<string>('');

  useEffect(() => {
    if (focusId != undefined) {
      refs.current[focusId]?.focus();
    }
  }, [focusId, blocksArray]);

  const handleKeyDown = (index: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      const newBlock: Block = {
        id: crypto.randomUUID(),
        content: '',
        type: 'paragraph',
      };
      const newArrayWithNewBlock: Block[] = [...blocksArray, newBlock];
      onBlocksChange(newArrayWithNewBlock);
      setFocusId(newBlock.id);
    } else if (e.key == 'Delete' || e.key == 'Backspace') {
      console.log('Backspace/Delete pressed on block:', index);

      const idx = blocksArray.findIndex((b) => b.id === index);
      const currentBlock = blocksArray[idx];

      console.log('==================');
      if (currentBlock.content.endsWith('/') && modalBlockId == index) {
        setShowCommandModal(false);
        setModalBlockId(null);
        console.log('This line was hit.');
      }
      if (blocksArray[idx].content == '' && idx != 0) {
        const newArray = blocksArray.filter((_, i) => i != idx);
        onBlocksChange(newArray);
        setFocusId(blocksArray[idx - 1].id);
      }
    } else if (e.key == '/') {
      setShowCommandModal(true);
      setModalBlockId(index);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: string) => {
    onBlocksChange((prev) => prev.map((block) => (index == block.id ? { ...block, content: e.target.value } : block)));
  };

  const handleQuestion = async () => {
    try {
      const res = await fetch('https://127.0.0.1:8004/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit question.');
      }

      const data = await res.json();
      console.log('Question submitted, response received:', data);

      setShowAskModal(false);
      setShowCommandModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {blocksArray.map((block) => (
        <input
          placeholder="Start typing here, press '/' for command pallete..."
          key={block.id}
          value={block.content}
          onChange={(e) => handleOnChange(e, block.id)}
          onKeyDown={handleKeyDown(block.id)}
          onFocus={() => setFocusId(block.id)}
          ref={(el) => {
            refs.current[block.id] = el;
          }}
          style={{ border: 'none', outline: 'none' }}
        ></input>
      ))}
      {showCommandModal && (
        <div className="bg-gray-50 p-4 rounded-lg w-1/8 ml-50">
          <div className="flex flex-col space-y-2 w-100%">
            <h6>Suggested</h6>
            <button
              className="w-full text-left p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors border-none cursor-pointer"
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
              onClick={() => {
                setShowCommandModal(false);
                setShowAskModal(true);
              }}
            >
              Ask
            </button>
            <button
              className="w-full text-left p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors border-none cursor-pointer"
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
              onClick={() => setShowCommandModal(false)}
            >
              Summarize
            </button>
            <button
              className="w-full text-left p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors border-none cursor-pointer"
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
              onClick={() => setShowCommandModal(false)}
            >
              Rewrite
            </button>
            <button
              className="w-full text-left p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors border-none cursor-pointer"
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
              onClick={() => setShowCommandModal(false)}
            >
              Search
            </button>
            <button
              className="w-full text-left p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors border-none cursor-pointer"
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
              onClick={() => setShowCommandModal(false)}
            >
              Insert
            </button>
          </div>
        </div>
      )}

      {showAskModal && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuestion();
          }}
          className="flex flex-col gap-2 w-1/2 h-50 p-4 bg-white rounded-lg shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Ask a question</h2>
          <input
            type="text"
            placeholder="Type your question here..."
            className="border p-2 rounded-md"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            type="button"
            onClick={() => {
              setShowAskModal(false);
              setShowCommandModal(false);
            }}
          >
            Ask
          </button>
        </form>
      )}
    </div>
  );
};
