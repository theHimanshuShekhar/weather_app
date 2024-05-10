import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [locationName, setLocationName] = useState("");
  const [weatherData, setWeatherData] = useState();

  async function greet() {
    setWeatherData(await invoke("get_weather", { locationName }));
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-9xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-2xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
