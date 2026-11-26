import { useEffect, useRef } from "react";
import photos from "../data/photos";
import "../styles/gallery.css";

function PhotoGalleryLayout({ selectedPhotoId, onSelectPhoto, onClose }) {
  const dialogRef = useRef(null);

  const selectedPhoto = photos.find((photo) => photo.id === selectedPhotoId);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (selectedPhotoId && selectedPhoto) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [selectedPhotoId, selectedPhoto]);

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
            className="photo-card"
            key={photo.id}
            type="button"
            onClick={() => onSelectPhoto(photo.id)}
          >
            <img src={photo.image} alt={photo.description} loading="lazy" />

            <span className="photo-info">
              <span className="photo-category">{photo.category}</span>
              <span className="photo-title">{photo.title}</span>
            </span>
          </button>
        ))}
      </section>

      <dialog
        ref={dialogRef}
        className="photo-dialog"
        aria-labelledby="dialog-title"
        onClose={onClose}
      >
        {selectedPhoto && (
          <div className="dialog-content">
            <button
              className="dialog-close"
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close photo dialog"
            >
              Close
            </button>

            <img
              className="dialog-image"
              src={selectedPhoto.image}
              alt={selectedPhoto.description}
            />

            <div className="dialog-caption">
              <p className="photo-category">{selectedPhoto.category}</p>
              <h2 id="dialog-title">{selectedPhoto.title}</h2>
              <p>{selectedPhoto.description}</p>
            </div>
          </div>
        )}
      </dialog>
    </main>
  );
}

export default PhotoGalleryLayout;
