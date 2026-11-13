
import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router";
import PeopleLayout from "./components/PeopleLayout";
import DirectoryHome from "./pages/DirectoryHome";
import Skeleton from "./components/Skeleton";
import "./App.css";

const PersonDetail = lazy(
  () => import("./components/PersonDetail")
);

export default function App() {
  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">
          An archive of extraordinary minds / Vol. 01
        </p>

        <h1>
          <Link to="/" className="site-title">
            People<br />Directory.
          </Link>
        </h1>

        <p>
          A curated index of individuals who shaped the way
          we think, build, and understand the world.
        </p>
      </header>

      <Routes>
        <Route path="/" element={<PeopleLayout />}>
          <Route index element={<DirectoryHome />} />

          <Route
            path="people/:id"
            element={
              <Suspense fallback={<Skeleton />}>
                <PersonDetail />
              </Suspense>
            }
          />

          <Route
            path="*"
            element={
              <article className="not-found" role="alert">
                <p className="eyebrow">Archive / Error 404</p>
                <h2>Page not found.</h2>
                <Link to="/">Return to directory</Link>
              </article>
            }
          />
        </Route>
      </Routes>
    </main>
  );
}
