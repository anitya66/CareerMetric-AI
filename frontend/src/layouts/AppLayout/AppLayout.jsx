import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;