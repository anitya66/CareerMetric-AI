import AppRouter from "./app/router/AppRouter";
import QueryProvider from "./app/providers/QueryProvider";
import { AuthProvider } from "./app/providers/AuthProvider";

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;