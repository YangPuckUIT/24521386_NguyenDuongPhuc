
import { Fragment, useId, useState } from "react";
import SkillBadge from "./SkillBadge";

export default function DeveloperCard({
  name = "Unknown Developer",
  role = "Software Developer",
  location = "Unknown",
  bio = "",
  avatar = {},
  metrics = {},
  skills = [],
}) {
  const headingId = useId();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const [avatarError, setAvatarError] = useState(false);

  const initials = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  const visibleSkills = skills
    .filter((skill) =>
      skill.name.toLowerCase().includes(search.toLowerCase())
    )
    .toSorted((a, b) => {
      if (sortBy === "level") {
        const levels = {
          Beginner: 1,
          Intermediate: 2,
          Advanced: 3,
          Expert: 4,
        };

        return (levels[b.level] ?? 0) - (levels[a.level] ?? 0);
      }

      return a.name.localeCompare(b.name);
    });

  return (
    <article aria-labelledby={headingId}>
      <header>
        {avatar.url && !avatarError ? (
          <img
            src={avatar.url}
            alt={`Avatar of ${name}`}
            width={avatar.width ?? 160}
            height={avatar.height ?? 160}
            onError={() => setAvatarError(true)}
          />
        ) : (
          <span role="img" aria-label={`Initials of ${name}`}>
            {initials}
          </span>
        )}

        <hgroup>
          <h2 id={headingId}>{name}</h2>
          <p>{role}</p>
        </hgroup>

        <p>{location}</p>
        <p>{bio}</p>
      </header>

      <section aria-label="Developer statistics">
        <dl>
          {Object.entries(metrics).map(([key, value]) => (
            <Fragment key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </Fragment>
          ))}
        </dl>
      </section>

      <section aria-label="Developer skills">
        <h3>Skills & Expertise</h3>

        <label htmlFor={`${headingId}-search`}>
          Search skills
        </label>

        <input
          id={`${headingId}-search`}
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search React, Python..."
        />

        <label htmlFor={`${headingId}-sort`}>
          Sort by
        </label>

        <select
          id={`${headingId}-sort`}
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="name">Name (A-Z)</option>
          <option value="level">Skill level (High-Low)</option>
        </select>

        <ul aria-label="Skills">
          {visibleSkills.map((skill) => (
            <SkillBadge
              key={skill.id}
              name={skill.name}
              level={skill.level}
            />
          ))}
        </ul>

        {visibleSkills.length === 0 && (
          <p>No matching skills found.</p>
        )}
      </section>
    </article>
  );
}
