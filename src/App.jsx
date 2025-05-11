import HomePage from "./pages/HomePage";
import AppLayout from "./components/AppLayout";
import ArchivePage from "./features/archive/ArchivePage";

function App() {
  return (
    <AppLayout>
      {/* <HomePage /> */}
      <ArchivePage />
    </AppLayout>
  );
}

export default App;
