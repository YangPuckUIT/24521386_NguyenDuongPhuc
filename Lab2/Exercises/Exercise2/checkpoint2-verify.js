
import {
  useState,
  resetCursor,
  setRenderFunction
} from "./reactive-engine.js";

let renderCount = 0;

function TestApp() {
  resetCursor();

  const [tasks, setTasks] = useState(["Review PR", "Verify AST"]);
  const [filter, setFilter] = useState("ALL");

  console.log("Tasks:", tasks);
  console.log("Filter:", filter);

  return { tasks, filter, setTasks, setFilter };
}

setRenderFunction(() => {
  renderCount++;
  console.log("Re-render:", renderCount);
  app = TestApp();
});

let app = TestApp();

console.log("Initial state:", app.tasks, app.filter);

app.setTasks(previous => [...previous, "New Task"]);

console.log("Updated state:", app.tasks);
