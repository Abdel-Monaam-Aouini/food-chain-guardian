
import NavBar from "@/components/NavBar";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
