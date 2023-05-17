"use client";
import { useState } from "react";
export default () => {
  const [page, setPage] = useState(1);

  return (
    <section className="flex gap-6 mt-8 border-2 border-white w-full justify-center max-w-sm py-2 rounded-md shadow-md">
      <button
        className="disabled:text-gray-400 hover:text-gray-400"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>

      {[1, 2, 3, 4, 5].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          disabled={i + 1 === page}
          className="disabled:text-gray-400 hover:text-gray-400"
        >
          {i + 1}
        </button>
      ))}

      <button
        className="disabled:text-gray-400 hover:text-gray-400"
        onClick={() => setPage(page + 1)}
        disabled={page === 5}
      >
        Next
      </button>
    </section>
  );
};
