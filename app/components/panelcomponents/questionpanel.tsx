"use client";

import { useState } from "react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import questions from "../../questions/questions.json";

type Props = {
  questionId: number;
  selected:'white'|'black';
};

export default function QuestionPanel({ questionId,selected }: Props) {
  const [open, setOpen] = useState(false);

  const questionIndex = questions.findIndex(q => q.id === questionId);
  const question = questions[questionIndex];

  if (!question) {
    return <div className="p-4 text-black">Question not found</div>;
  }

  return (
    <>
      {/* 🔹 MOBILE ICON (OPEN) */}
      <div className={`md:hidden p-2 ${selected==="black"?"bg-white":"bg-black"} border-b border-slate-700`}>
        <button
          onClick={() => setOpen(true)}
          title="Show Question"
          className="p-2 rounded bg-slate-700 hover:bg-slate-600"
        >
          <Bars3Icon className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* 🔹 DESKTOP PANEL (ALWAYS VISIBLE) */}
      <div
  className={`hidden md:block h-full ${
    selected === "black" ? "bg-black" : "bg-white"
  } overflow-y-auto w-72 lg:w-80 p-4 md:p-6`}
>
  <QuestionContent
    question={question}
    index={questionIndex}
    total={questions.length}
    selected={selected}
  />
</div>

      {/* 🔹 MOBILE OVERLAY PANEL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            
            {/* Header */}
            <div className="p-3 border-b flex justify-between items-center">
              <span className="font-semibold text-black">Question</span>
              <button
                onClick={() => setOpen(false)}
                title="Close"
                className="p-2 rounded hover:bg-gray-100"
              >
                <XMarkIcon className="w-5 h-5 text-black" />
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
  selected:"white"| "black"
}) {
  return (
    <div className="space-y-5 p-4">

      <h2 className={`text-lg font-semibold ${selected=="black"?"text-white":"text-black"}`}>
        Question {index + 1} / {total}
      </h2>

      <div className="rounded-lg overflow-hidden bg-gray-100 h-36 lg:h-40">
        <Image
          src={`/${question.id}.jpg`}
          alt={question.title}
          width={400}
          height={250}
          className="object-cover w-full h-full"
        />
      </div>

      <p className={`text-sm md:text-base ${selected=="black"?"text-white":"text-black"}  leading-relaxed`}>
        {question.problemOverview}
      </p>

      <hr />

      <Section title="Requirements" items={question.requirements} selected={selected}/>
      <hr />
      <Section title="Objectives" items={question.objectives} selected={selected}/>
      <hr />
      <Section title="Attributes" items={question.attributes} selected={selected}/>
      <hr />

      <div>
        <h3 className={`font-semibold mb-1 ${selected=="black"?"text-white":"text-black"}`}>
          Expected Output:
        </h3>
        <p className={`text-sm md:text-base ${selected=="black"?"text-white":"text-black"}`}>
          {question.expectedOutcome}
        </p>
      </div>

    </div>
  );
}

function Section({ title, items,selected }: { title: string; items: string[] ,selected:"white"|"black"}) {
  return (
    <div>
      <h3 className={`font-semibold mb-1 ${selected=="black"?"text-white":"text-black"}`}>{title}:</h3>
      <ul className={`list-disc pl-5 text-sm space-y-1 ${selected=="black"?"text-white":"text-black"}`}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
