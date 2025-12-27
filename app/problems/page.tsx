"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import questions from "../data/questions.json";
import { X } from "lucide-react";
import Link from "next/link";

export default function ProblemsPage() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const filteredQuestions =
    filter === "all"
      ? questions
      : questions.filter((item: any) => item.level === filter);

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const openModal = (item: any) => setSelected(item);
  const closeModal = () => setSelected(null);

  return (
    <section className="min-h-screen bg-white text-black px-6 py-20">
      <div className="max-w-7xl mx-auto">

        {/* FILTER BUTTONS */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {["all", "basic", "medium", "hard"].map((level) => (
            <button
              key={level}
              onClick={() => {
                setFilter(level);
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all border
              ${
                filter === level
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-black hover:text-white"
              }`}
            >
              {level.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CARD GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentQuestions.map((item: any) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="cursor-pointer rounded-2xl p-4 
              border border-gray-200 bg-white/30 backdrop-blur-lg
              hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]
              hover:-translate-y-1 transition-all"
            >
              <div className="rounded-xl overflow-hidden bg-gray-200 h-40">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full transition-transform hover:scale-110"
                />
              </div>

              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {item.description}
              </p>

              <span className={`inline-block mt-3 px-3 py-1 text-xs font-bold rounded-full
                ${
                  item.level === "basic"
                    ? "bg-green-200 text-green-800"
                    : item.level === "medium"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {item.level.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg border font-bold
                ${currentPage === i + 1 ? "bg-black text-white" : ""}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-lg text-black shadow-lg">

            {/* Close Button */}
            <button onClick={closeModal} className="ml-auto block">
              <X size={26} />
            </button>

            <Image
              src={selected.image}
              alt={selected.title}
              width={600}
              height={300}
              className="rounded-xl mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
            <p className="text-gray-700 mb-4">{selected.description}</p>

            <button
              className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-semibold"
              onClick={() => alert("Open problem editor page")}
            >
              <Link href={`/panel`}>
              Start Solving →
              </Link>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
