export default function Pagination({ total, page, onChange }: {
  total: number; page: number; onChange: (p: number) => void;
}) {
  const totalPages = Math.ceil(total / 10);
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={`px-3 py-1 text-blue-900 border border-blue-900${page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
