import useAppealSlaTimer from "../hooks/useAppealSlaTimer";

export default function SlaCountdown({ deadline }) {
  const { formattedTime, isExpired } = useAppealSlaTimer(deadline);

  return (
    <section className="sla-countdown" aria-live="off">
      <p className="eyebrow">APPEAL REVIEW DEADLINE</p>

      <strong className={isExpired ? "sla-expired" : "sla-time"}>
        {formattedTime}
      </strong>

      <p role="status">
        {isExpired
          ? "The appeal review deadline has passed."
          : "Time remaining to review this appeal"}
      </p>
    </section>
  );
}
