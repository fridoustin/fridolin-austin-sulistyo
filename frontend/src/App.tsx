import { useEffect } from "react";
import { getTasks, getStats } from "./api/taskapi";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getTasks();
        console.log("Tasks:", tasks);

        const stats = await getStats();
        console.log("Stats:", stats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <h1>Task Tracker</h1>;
}

export default App;