
import { useId, useState } from 'react';
import { SMART_PEOPLE } from '../data/smartPeople';

export function ScientistDirectory({
  initialData = SMART_PEOPLE,
}) {
  const searchId = useId();
  const iqId = useId();
  const sortId = useId();

  const [people, setPeople] = useState(initialData);
  const [query, setQuery] = useState('');
  const [minIq, setMinIq] = useState(160);
  const [sortBy, setSortBy] = useState('iq-desc');

  // Derived state: no useEffect required
  const visiblePeople = people
    .filter((person) => {
      const matchesName = person.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());

      const matchesIq =
        minIq === null || person.iq >= minIq;

      return matchesName && matchesIq;
    })
    .toSorted((a, b) => {
      if (sortBy === 'iq-desc') return b.iq - a.iq;
      if (sortBy === 'iq-asc') return a.iq - b.iq;
      if (sortBy === 'age-desc') return b.age - a.age;
      return a.age - b.age;
    });

  // Delete without mutating the original array
  function handleDelete(id) {
    setPeople((prev) =>
      prev.filter((person) => person.id !== id)
    );
  }

  // Restore original dataset and filters
  function handleReset() {
    setPeople([...initialData]);
    setQuery('');
    setMinIq(160);
    setSortBy('iq-desc');
  }

  return (
    <section aria-label="Pioneer Directory">
      <h1>Scientist & Pioneer Directory</h1>
      <p>Explore famous scientists and pioneers.</p>

      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="field">
          <label htmlFor={searchId}>Search by name</label>
          <input
            id={searchId}
            type="search"
            value={query}
            placeholder="Enter scientist name..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor={iqId}>Minimum IQ</label>
          <input
            id={iqId}
            type="number"
            value={minIq ?? ''}
            onChange={(e) => {
              const value = e.target.valueAsNumber;
              setMinIq(Number.isNaN(value) ? null : value);
            }}
          />
        </div>

        <div className="field">
          <label htmlFor={sortId}>Sort by</label>
          <select
            id={sortId}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="iq-desc">IQ: High to Low</option>
            <option value="iq-asc">IQ: Low to High</option>
            <option value="age-desc">Age: Old to Young</option>
            <option value="age-asc">Age: Young to Old</option>
          </select>
        </div>
      </form>

      <div className="toolbar">
        <output role="status" aria-live="polite">
          Found {visiblePeople.length} pioneers
        </output>

        <button
          type="button"
          className="reset-btn"
          onClick={handleReset}
        >
          Reset Directory
        </button>
      </div>

      {visiblePeople.length === 0 ? (
        <p>No pioneers found.</p>
      ) : (
        <ul>
          {visiblePeople.map((person) => (
            <li key={person.id}>
              <h2>{person.name}</h2>
              <p>Age: {person.age}</p>
              <p>IQ: {person.iq}</p>

              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDelete(person.id)}
                aria-label={`Delete ${person.name}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
