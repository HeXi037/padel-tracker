export default function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 active:scale-95 transition"
    >
      {children}
    </button>
  );
}
