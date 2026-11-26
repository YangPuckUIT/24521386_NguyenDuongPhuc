import photos from "../data/photos";
import "../styles/gallery.css";

function PhotoGalleryLayout({ selectedPhotoId, onSelectPhoto }) {
  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <div>
          <p className="eyebrow">VISUAL COLLECTION</p>
          <h1>Photo Gallery</h1>
          <p className="gallery-description">
            A collection of moments, places and stories.
          </p>
        </div>

        <span className="photo-count">{photos.length} photographs</span>
      </header>

      <section className="photo-grid" aria-label="Photo gallery">
        {photos.map((photo) => (
          <button
            className={`photo-card ${
              selectedPhotoId === photo.id ? "selected" : ""
            }`}
            key={photo.id}
            type="button"
            onClick={() => onSelectPhoto(photo.id)}
            aria-pressed={selectedPhotoId === photo.id}
          >
            <img src={photo.image} alt={photo.description} loading="lazy" />

            <span className="photo-info">
              <span className="photo-category">{photo.category}</span>
              <span className="photo-title">{photo.title}</span>
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}

export default PhotoGalleryLayout;
