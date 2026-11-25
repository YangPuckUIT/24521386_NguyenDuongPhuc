import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { people } from "./data/people";
import PeopleLayout from "./components/PeopleLayout";
import PersonDetail from "./pages/PersonDetail";
import SimpleForm from "./components/SimpleForm";
import AppealForm from "./pages/AppealForm";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/people" element={<PeopleLayout people={people} />}>
          <Route index element={<Navigate to="/people/himass" replace />} />

          <Route path=":id" element={<PersonDetail people={people} />} />
        </Route>

        <Route
          path="/appeal"
          element={
            <SimpleForm>
              <AppealForm />
            </SimpleForm>
          }
        />

        <Route path="*" element={<Navigate to="/people" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
