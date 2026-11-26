import { useState } from "react";
import PhotoGalleryLayout from "./components/PhotoGalleryLayout";

function App() {
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);

  return (
    <PhotoGalleryLayout
      selectedPhotoId={selectedPhotoId}
      onSelectPhoto={setSelectedPhotoId}
    />
  );
}

export default App;
