import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="mt-20 p-6 text-gray-900 dark:text-white">
        <h1 className="text-3xl">Welcome to E-Learning</h1>
      </div>
    </div>
  );
}

export default App;


