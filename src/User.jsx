import { useState, useEffect } from "react";

const PER_PAGE = 6;

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function initials(name) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch users");
        return r.json();
      })
      .then((data) => { setUsers(data); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  useEffect(() => { setPage(1); }, [debouncedSearch, sort]);

  const filtered = users
    .filter((u) => u.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "za") return b.name.localeCompare(a.name);
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  if (loading) return <p style={{ padding: 24 }}>Loading...</p>;
  if (error) return <p style={{ padding: 24, color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 24, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 20 }}>User Dashboard</h1>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 180, padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6, fontSize: 14 }}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6, fontSize: 14 }}
        >
          <option value="">Default</option>
          <option value="az">Name A → Z</option>
          <option value="za">Name Z → A</option>
        </select>
        <span style={{ fontSize: 13, color: "#666" }}>
          {filtered.length} user{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {paginated.length === 0 ? (
          <p style={{ color: "#888" }}>No users found.</p>
        ) : (
          paginated.map((user) => (
            <div
              key={user.id}
              style={{ border: "1px solid #e0e0e0", borderRadius: 10, padding: 16 }}
            >

              <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{user.name}</p>
              <p style={{ fontSize: 13, color: "#555", marginBottom: 4 }}>{user.email}</p>
              <p style={{ fontSize: 13, color: "#555" }}>{user.address.city}</p>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #ccc", cursor: "pointer" }}
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                padding: "6px 12px", borderRadius: 6, cursor: "pointer",
                border: "1px solid #ccc",
                fontWeight: p === page ? 600 : 400,
                textDecoration: p === page ? "underline" : "none",
              }}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #ccc", cursor: "pointer" }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}