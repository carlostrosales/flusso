import { useState, useRef, useEffect } from "react";

type Block = {
  id: string;
  content: string;
  type: "paragraph" | "prompt" | "response";
};

interface BlockEditorProps {
  blocksArray: Block[];
  onBlocksChange: (blocks: Block[] | ((prev: Block[]) => Block[])) => void;
}

export const BlockEditor = ({
  blocksArray,
  onBlocksChange,
}: BlockEditorProps) => {
  const refs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [focusId, setFocusId] = useState<string | null>(null);
  const [showCommandModal, setShowCommandModal] = useState(false);
  const [modalBlockId, setModalBlockId] = useState<string | null>(null);
  const [showAskModal, setShowAskModal] = useState(false);

  useEffect(() => {
    if (focusId != undefined) {
      refs.current[focusId]?.focus();
    }
  }, [focusId, blocksArray]);

  const handleKeyDown =
    (index: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key == "Enter") {
        const newBlock: Block = {
          id: crypto.randomUUID(),
          content: "",
          type: "paragraph",
        };
        const newArrayWithNewBlock: Block[] = [...blocksArray, newBlock];
        onBlocksChange(newArrayWithNewBlock);
        setFocusId(newBlock.id);
      } else if (e.key == "Delete" || e.key == "Backspace") {
        console.log("Backspace/Delete pressed on block:", index);

        const idx = blocksArray.findIndex((b) => b.id === index);
        const currentBlock = blocksArray[idx];

        console.log("==================");
        if (currentBlock.content.endsWith("/") && modalBlockId == index) {
          setShowCommandModal(false);
          setModalBlockId(null);
          console.log("This line was hit.");
        }
        if (blocksArray[idx].content == "" && idx != 0) {
          const newArray = blocksArray.filter((_, i) => i != idx);
          onBlocksChange(newArray);
          setFocusId(blocksArray[idx - 1].id);
        }
      } else if (e.key == "/") {
        setShowCommandModal(true);
        setModalBlockId(index);
      }
    };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: string
  ) => {
    onBlocksChange((prev) =>
      prev.map((block) =>
        index == block.id ? { ...block, content: e.target.value } : block
      )
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", maxWidth: "50%" }}>
      {blocksArray.map((block) => (
        <input
          placeholder="Start typing..."
          key={block.id}
          value={block.content}
          onChange={(e) => handleOnChange(e, block.id)}
          onKeyDown={handleKeyDown(block.id)}
          onFocus={() => setFocusId(block.id)}
          ref={(el) => {
            refs.current[block.id] = el;
          }}
          style={{ border: "none", outline: "none" }}
        ></input>
      ))}
      {showCommandModal && (
        <div
          style={{
            display: "center",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            width: "15rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: "1rem",
              borderRadius: "0.5rem",
              minWidth: "10rem",
              boxShadow:
                "0 10px 25px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              transform: "translateX(4rem) translateY(0px)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <h6 style={{ marginTop: "0", textAlign: "left" }}>Suggested</h6>
            <button
              style={{
                border: "none",
                backgroundColor: "#f5f5f5",
                textAlign: "left",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e0e0e0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
              onClick={() => {
                setShowCommandModal(false);
                setShowAskModal(true);
              }}
            >
              Ask
            </button>
            <button
              style={{
                border: "none",
                backgroundColor: "#f5f5f5",
                textAlign: "left",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e0e0e0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
              onClick={() => setShowCommandModal(false)}
            >
              Summarize
            </button>
            <button
              style={{
                border: "none",
                backgroundColor: "#f5f5f5",
                textAlign: "left",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e0e0e0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
              onClick={() => setShowCommandModal(false)}
            >
              Rewrite
            </button>
            <button
              style={{
                border: "none",
                backgroundColor: "#f5f5f5",
                textAlign: "left",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e0e0e0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
              onClick={() => setShowCommandModal(false)}
            >
              Search
            </button>
            <button
              style={{
                border: "none",
                backgroundColor: "#f5f5f5",
                textAlign: "left",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e0e0e0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
              onClick={() => setShowCommandModal(false)}
            >
              Insert
            </button>
          </div>
        </div>
      )}

      {showAskModal && (
        <form className="flex flex-col gap-2">
          <input placeholder="Ask..." />
          <button className="w-full" type="submit">
            Ask
          </button>
        </form>
      )}
    </div>
  );
};
