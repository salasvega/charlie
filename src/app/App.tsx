import { Routes, Route } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { HomePage } from "../pages/HomePage";
import { PlaceholderPage, NotFoundPage } from "../pages/PlaceholderPage";
import { navigation } from "../data/navigation";
import { SessionPage } from "../pages/SessionPage";
import { SubjectsPage } from "../pages/SubjectsPage";
export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/ma-seance" element={<SessionPage />} />
        <Route path="/mes-matieres" element={<SubjectsPage />} />
        {navigation.slice(3).map((section) => (
          <Route
            key={section.path}
            path={section.path}
            element={<PlaceholderPage section={section} />}
          />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
