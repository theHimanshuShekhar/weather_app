import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [locationName, setLocationName] = useState("");
  const [weatherData, setWeatherData] = useState();

  async function getWeather(event: any) {
    if (locationName.length < 1) return;
    if (event.key && event.key !== "Enter") return;
    setWeatherData(await invoke("get_weather", { locationName }));
  }

  return (
    <div className="flex flex-col bg-gray-800 h-screen text-white rounded-xl">
      <div
        data-tauri-drag-region
        className="titlebar flex justify-between pointer items-center p-2"
      >
        <div
          className="text-xl font-bold pointer grow text-center"
          data-tauri-drag-region
        >
          Bhayanak Weather
        </div>
        <div className="flex items-center fixed right-0 px-2">
          <div className="titlebar-button p-2" id="titlebar-minimize">
            <img
              src="https://api.iconify.design/mdi:window-minimize.svg?color=white"
              alt="minimize"
              className="fill-white"
            />
          </div>
          <div className="titlebar-button p-2" id="titlebar-maximize">
            <img
              src="https://api.iconify.design/mdi:window-maximize.svg?color=white"
              alt="maximize"
            />
          </div>
          <div className="titlebar-button p-2" id="titlebar-close">
            <img
              src="https://api.iconify.design/mdi:close.svg?color=white"
              alt="close"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4 px-4 gap-2">
        <SearchBar setLocationName={setLocationName} getWeather={getWeather} />
        <WeatherDataComponent />
        <div>{weatherData}</div>
      </div>
    </div>
  );
}

function WeatherDataComponent() {
  return <div className="border-2">WeatherData</div>;
}
function SearchBar(props: { setLocationName: any; getWeather: any }) {
  return (
    <input
      type="text"
      placeholder="Start entering city name, zipcode ip, metar, etc."
      className="text-gray-800 w-full text-md p-2 rounded-full text-center border"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        props.setLocationName(event.target.value);
      }}
      onKeyDown={props.getWeather}
    />
  );
}
export default App;
