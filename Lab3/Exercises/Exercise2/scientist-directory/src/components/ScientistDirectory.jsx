
import { useState } from 'react';
import { SMART_PEOPLE } from '../data/smartPeople';

export function ScientistDirectory() {
  const [people] = useState(SMART_PEOPLE);

  return (
    <section aria-label="Pioneer Directory">
      <h1>Scientist & Pioneer Directory</h1>
      <p>Explore famous scientists and pioneers.</p>

      <ul>
        {people.map((person) => (
          <li key={person.id}>
            <h2>{person.name}</h2>
            <p>Age: {person.age}</p>
            <p>IQ: {person.iq}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
