import { BrowserRouter, useSearchParams } from "react-router-dom";
import PhotoGalleryLayout from "./components/PhotoGalleryLayout";

function GalleryApp() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedPhotoId = searchParams.get("photoId");

  const handleSelectPhoto = (photoId) => {
    setSearchParams({ photoId });
  };

  return (
    <PhotoGalleryLayout
      selectedPhotoId={selectedPhotoId}
      onSelectPhoto={handleSelectPhoto}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <GalleryApp />
    </BrowserRouter>
  );
}

export default App;
