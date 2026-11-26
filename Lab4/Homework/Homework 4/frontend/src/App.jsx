import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
} from "react-router-dom";

import SwipeDeck from "./components/SwipeDeck";
import FairPlayAppealPortal, {
  DossierView,
} from "./pages/FairPlayAppealPortal";

import "./App.css";

function DossierRoute() {
  const { user } = useParams();

  const normalizedUser = user.toLowerCase();

  if (normalizedUser === "himass") {
    return <DossierView user="Himass" />;
  }

  if (normalizedUser === "tanvuu") {
    return <DossierView user="TanVuu" />;
  }

  return (
    <main className="deck">
      <h1>Dossier not found</h1>
      <Link to="/appeals">Return to Appeal Portal</Link>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SwipeDeck />} />
        <Route path="/appeals" element={<FairPlayAppealPortal />} />
        <Route path="/dossier/:user" element={<DossierRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
