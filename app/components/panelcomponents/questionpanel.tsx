"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import questions from "../../questions/questions.json";

type Props = {
  questionId: number;
  selected: 'white' | 'black';
};

export default function QuestionPanel({ questionId, selected }: Props) {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(320); // Default width (w-80 = 320px)
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const questionIndex = questions.findIndex(q => q.id === questionId);
  const question = questions[questionIndex];

  // Handle mouse move for resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      // Set min and max width constraints
      if (newWidth >= 250 && newWidth <= 600) {
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      
      // Prevent text selection during resize
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    } else {
      // Restore normal cursor and selection
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      
      // Cleanup: restore normal cursor and selection
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, [isResizing]);

  if (!question) {
    return <div className="p-4 text-black">Question not found</div>;
  }

  return (
    <>
      {/* 🔹 MOBILE ICON (OPEN) */}
      <div className={`md:hidden p-2 ${selected === "black" ? "bg-white" : "bg-black"} border-b border-slate-700`}>
        <button
          onClick={() => setOpen(true)}
          title="Show Question"
          className="p-2 rounded bg-slate-700 hover:bg-slate-600"
        >
          <Bars3Icon className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* 🔹 DESKTOP PANEL (ALWAYS VISIBLE WITH RESIZER) */}
      <div
        ref={panelRef}
        className={`hidden md:block h-full ${
          selected === "black" ? "bg-black" : "bg-white"
        } overflow-y-auto p-4 md:p-6 relative`}
        style={{ width: `${width}px` }}
      >
        <QuestionContent
          question={question}
          index={questionIndex}
          total={questions.length}
          selected={selected}
        />
        
        {/* Resize Handle */}
        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500 transition-colors ${
            isResizing ? 'bg-blue-500' : 'bg-transparent'
          }`}
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent text selection on mousedown
            setIsResizing(true);
          }}
          title="Drag to resize"
        >
          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
            <div className={`w-1 h-12 rounded-full ${
              selected === "black" ? "bg-gray-600" : "bg-gray-300"
            } hover:bg-blue-500 transition-colors`} />
          </div>
        </div>
      </div>

      {/* Overlay to prevent interaction with content during resize */}
      {isResizing && (
        <div 
          className="fixed inset-0 z-50" 
          style={{ cursor: 'col-resize' }}
        />
      )}

      {/* 🔹 MOBILE OVERLAY PANEL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div
            className={`absolute left-0 top-0 h-full w-80 shadow-xl overflow-y-auto ${
              selected === "black" ? "bg-black" : "bg-white"
            }`}
          >
            {/* Header */}
            <div className="p-3 border-b flex justify-between items-center">
              <span className={`font-semibold ${selected === "black" ? "text-white" : "text-black"}`}>
                Question
              </span>

              <button
                onClick={() => setOpen(false)}
                title="Close"
                className="p-2 rounded hover:bg-gray-100"
              >
                <XMarkIcon
                  className={`w-5 h-5 ${selected === "black" ? "text-white" : "text-black"}`}
                />
              </button>
            </div>

            <QuestionContent
              question={question}
              index={questionIndex}
              total={questions.length}
              selected={selected}
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ================= CONTENT ================= */

function QuestionContent({
  question,
  index,
  total,
  selected
}: {
  question: any;
  index: number;
  total: number;
  selected: "white" | "black"
}) {
  return (
    <div className="space-y-5 p-4">
      <h2 className={`text-lg font-semibold ${selected === "black" ? "text-white" : "text-black"}`}>
        {question.title}
      </h2>

      <div
        className={`rounded-lg overflow-hidden h-36 lg:h-40 ${
          selected === "black" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <Image
          src={`/${question.id}.jpg`}
          alt={question.title}
          width={400}
          height={250}
          className="object-cover w-full h-full"
        />
      </div>

      <p className={`text-sm md:text-base ${selected === "black" ? "text-white" : "text-black"} leading-relaxed`}>
        {question.problemOverview}
      </p>
      <hr className={selected === "black" ? "border-gray-700" : "border-gray-200"} />

      <Section title="Requirements" items={question.requirements} selected={selected} />
      <hr className={selected === "black" ? "border-gray-700" : "border-gray-200"} />

      <Section title="Objectives" items={question.objectives} selected={selected} />
      <hr className={selected === "black" ? "border-gray-700" : "border-gray-200"} />

      <Section title="Attributes" items={question.attributes} selected={selected} />
      <hr className={selected === "black" ? "border-gray-700" : "border-gray-200"} />

      <div>
        <h3 className={`font-semibold mb-1 ${selected === "black" ? "text-white" : "text-black"}`}>
          Expected Output:
        </h3>
        <p className={`text-sm md:text-base ${selected === "black" ? "text-white" : "text-black"}`}>
          {question.expectedOutcome}
        </p>
      </div>
    </div>
  );
}

function Section({ title, items, selected }: { title: string; items: string[]; selected: "white" | "black" }) {
  return (
    <div>
      <h3 className={`font-semibold mb-1 ${selected === "black" ? "text-white" : "text-black"}`}>{title}:</h3>
      <ul className={`list-disc pl-5 text-sm space-y-1 ${selected === "black" ? "text-white" : "text-black"}`}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}