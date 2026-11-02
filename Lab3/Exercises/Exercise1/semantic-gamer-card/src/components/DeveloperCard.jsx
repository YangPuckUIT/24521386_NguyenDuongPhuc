
import { Fragment, useId, useState } from "react";
import SkillBadge from "./SkillBadge";
import styles from "./DeveloperCard.module.css";

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
    <article className={styles.card} aria-labelledby={headingId}>
      <header className={styles.header}>
        {avatar.url && !avatarError ? (
          <img
            className={styles.avatar}
            src={avatar.url}
            alt={`Avatar of ${name}`}
            width={avatar.width ?? 160}
            height={avatar.height ?? 160}
            onError={() => setAvatarError(true)}
          />
        ) : (
          <span
  className={styles.avatarFallback}
  role="img"
  aria-label={`Initials of ${name}`}
>
            {initials}
          </span>
        )}

        <hgroup className={styles.identity}>
          <h2 id={headingId}>{name}</h2>
          <p>{role}</p>
        </hgroup>

        <p>{location}</p>
        <p>{bio}</p>
      </header>

      <section aria-label="Developer statistics">
  <dl className={styles.metrics}>
          {Object.entries(metrics).map(([key, value]) => (
            <Fragment key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </Fragment>
          ))}
        </dl>
      </section>

      <section
  className={styles.skillsSection}
  aria-label="Developer skills"
>
        <h3>Skills & Expertise</h3>

        <label htmlFor={`${headingId}-search`}>
          Search skills
        </label>

        <input
          className={styles.control}
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
  className={styles.control}
  id={`${headingId}-sort`}
  value={sortBy}
  onChange={(event) => setSortBy(event.target.value)}
>
  <option value="name">Name (A-Z)</option>
  <option value="level">Skill level (High-Low)</option>
</select>

        <ul className={styles.skillList} aria-label="Skills">
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
