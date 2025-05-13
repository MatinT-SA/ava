import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./components/AppLayout";
import ArchivePage from "./features/archive/ArchivePage";

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archive" element={<ArchivePage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
