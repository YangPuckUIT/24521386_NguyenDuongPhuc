export default function SkillBadge({ name = "Unknown", level = "Beginner" }) {
  return (
    <li>
      <span>{name}</span>
      <span>{level}</span>
    </li>
  );
}
