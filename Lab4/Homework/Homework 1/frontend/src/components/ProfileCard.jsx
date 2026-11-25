import { useRef, useState } from "react";

function ProfileCard({ profile, onSwipe, disabled = false }) {
  const startPosition = useRef(null);
  const [drag, setDrag] = useState({ x: 0, y: 0 });

  if (!profile) return null;

  const handlePointerDown = (event) => {
    if (disabled || event.button !== 0) return;

    startPosition.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!startPosition.current || disabled) return;

    setDrag({
      x: event.clientX - startPosition.current.x,
      y: event.clientY - startPosition.current.y,
    });
  };

  const handlePointerUp = () => {
    if (!startPosition.current) return;

    const { x, y } = drag;
    const threshold = 100;

    if (x <= -threshold) {
      onSwipe("reject");
    } else if (x >= threshold) {
      onSwipe("like");
    } else if (y <= -threshold) {
      onSwipe("superlike");
    }

    startPosition.current = null;
    setDrag({ x: 0, y: 0 });
  };

  const handlePointerCancel = () => {
    startPosition.current = null;
    setDrag({ x: 0, y: 0 });
  };

  const rotation = drag.x * 0.04;

  let swipeLabel = "";
  if (drag.x > 40) swipeLabel = "LIKE";
  if (drag.x < -40) swipeLabel = "REJECT";
  if (drag.y < -40 && Math.abs(drag.y) > Math.abs(drag.x)) {
    swipeLabel = "SUPER LIKE";
  }

  return (
    <article
      className="profile-card"
      style={{
        transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rotation}deg)`,
        transition: startPosition.current ? "none" : "transform 180ms ease",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      {swipeLabel && (
        <span
          className={`swipe-indicator ${swipeLabel.toLowerCase().replace(" ", "-")}`}
        >
          {swipeLabel}
        </span>
      )}

      <div className="profile-image">
        <img
          src={profile.imageUrl}
          alt={profile.name}
          draggable="false"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <span className="profile-age">{profile.age}</span>
      </div>

      <div className="profile-info">
        <div className="profile-heading">
          <div>
            <h2>
              {profile.name}, {profile.age}
            </h2>
            <p className="location">Ho Chi Minh City</p>
          </div>
        </div>

        <p className="bio">{profile.bio}</p>

        <div className="interests">
          {profile.interests?.map((interest) => (
            <span key={interest}>{interest}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ProfileCard;
