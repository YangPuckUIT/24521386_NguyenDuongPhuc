import DeveloperCard from "./components/DeveloperCard";
import { developer } from "./data/profile";

function App() {
  return (
    <main>
      <DeveloperCard {...developer} />
    </main>
  );
}

export default App;
