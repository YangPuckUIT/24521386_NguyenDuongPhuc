import { BrowserRouter, useSearchParams } from "react-router-dom";
import PhotoGalleryLayout from "./components/PhotoGalleryLayout";

function GalleryApp() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedPhotoId = searchParams.get("photoId");

  const handleSelectPhoto = (photoId) => {
    setSearchParams({ photoId });
  };

  const handleClose = () => {
    setSearchParams({});
  };

  return (
    <PhotoGalleryLayout
      selectedPhotoId={selectedPhotoId}
      onSelectPhoto={handleSelectPhoto}
      onClose={handleClose}
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
