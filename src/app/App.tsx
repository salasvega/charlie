import { Routes, Route } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/PlaceholderPage";
import { ProgressPage } from "../pages/ProgressPage";
import { ChallengesPage } from "../pages/ChallengesPage";
import { AvatarPage } from "../pages/AvatarPage";
import { SessionPage } from "../pages/SessionPage";
import { SubjectsPage } from "../pages/SubjectsPage";
export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/ma-seance" element={<SessionPage />} />
        <Route path="/mes-matieres" element={<SubjectsPage />} />
        <Route path="/mes-progres" element={<ProgressPage />} />
        <Route path="/mes-defis" element={<ChallengesPage />} />
        <Route path="/studio-avatar" element={<AvatarPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
