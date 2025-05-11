// src/features/archive/ArchivePage.jsx
import ArchiveTable from "./components/ArchiveTable";

export default function ArchivePage() {
  return (
    <div className="px-12 py-6">
      <h1 className="mb-4 text-xl font-bold text-teal-600">آرشیو من</h1>
      <ArchiveTable />
    </div>
  );
}
