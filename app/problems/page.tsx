"use client";

import Image from "next/image";
import { useState } from "react";
import questions from "../data/questions.json";
import { X } from "lucide-react";

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
  const currentQuestions = filteredQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="min-h-screen bg-white text-black px-4 md:px-6 pt-8 pb-16">
      <div className="max-w-7xl mx-auto">

        {/* FILTER BUTTONS */}
        <div className="flex justify-center gap-2 md:gap-4 flex-wrap mb-8 md:mb-10">
          {["all", "basic", "medium", "hard"].map((level) => (
            <button
              key={level}
              onClick={() => {
                setFilter(level);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all border
                ${filter === level
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-black hover:text-white"
                }`}
            >
              {level.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {currentQuestions.map((item: any) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="cursor-pointer rounded-xl p-3 md:p-4 
              border border-gray-200 bg-white 
              hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="rounded-lg overflow-hidden h-36 md:h-40 bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="mt-3 md:mt-4 text-base md:text-lg font-bold">
                {item.title}
              </h3>

              <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">
                {item.description}
              </p>

              <span className={`inline-block mt-3 px-3 py-1 text-[10px] md:text-xs font-semibold rounded-full
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
          <div className="flex justify-center mt-10 gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border rounded-lg text-xs md:text-sm disabled:opacity-50"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 border rounded-lg text-xs md:text-sm font-semibold
                  ${
                    currentPage === i + 1
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border rounded-lg text-xs md:text-sm disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 z-50">
          <div className="bg-white rounded-2xl p-5 md:p-6 w-full max-w-md shadow-xl">
            <button
              onClick={() => setSelected(null)}
              className="ml-auto block text-gray-600 hover:text-black"
            >
              <X size={26} />
            </button>

            <Image
              src={selected.image}
              alt={selected.title}
              width={500}
              height={250}
              className="rounded-lg w-full mb-4"
            />

            <h2 className="text-xl md:text-2xl font-bold">{selected.title}</h2>
            <p className="text-gray-700 text-sm md:text-base my-3">{selected.description}</p>

            <button
              className="w-full bg-black text-white py-3 rounded-lg text-sm font-semibold"
            >
              Start Solving →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
