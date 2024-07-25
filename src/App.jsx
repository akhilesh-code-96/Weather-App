import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    getWeather();
  }, []);

  async function getWeather() {
    const api_key = "6986b689b1f2159a12a1b38664fe0d4a";
    const city = input;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      );
      const data = response.data;
      setWeather(data);
      setInput("");
    } catch (error) {
      console.error("Failed to fetch the data with error: ", error);
    }
  }

  function handleSearch(e) {
    if (e.key === "Enter" || e.type === "click") {
      getWeather();
    }
  }

  return (
    <>
      <div className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url(https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]">
        <div className="w-3/5 h-4/5 flex flex-col md:flex-row rounded-md shadow-lg">
          {/* Display weather condition and city name */}
          <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-blue-700 opacity-70 flex flex-col justify-center items-center p-2 rounded-md md:rounded-r-none">
            {weather.name && (
              <h3 className="absolute top-5 text-2xl font-bold font-sans text-blue-50 z-10">
                {weather.name}, {weather.sys && weather.sys.country}
              </h3>
            )}
            <div className="flex justify-center items-center h-32 w-32">
              {weather.weather && (
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather-icon"
                  className="h-full w-full object-contain"
                />
              )}
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center absolute bottom-0 left-0 mb-2 p-1">
              <div>
                <h3 className="text-2xl font-bold font-sans text-blue-50 z-10">
                  {weather.coord && weather.coord.lon}
                </h3>
                <h3 className="text-2xl font-bold font-sans text-blue-50 z-10">
                  {weather.coord && weather.coord.lat}
                </h3>
              </div>
              <h3 className="text-2xl font-bold font-sans text-blue-50 z-10 md:mr-2">
                {weather.weather && weather.weather[0].main}
              </h3>
            </div>
          </div>
          {/* Display information and search */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full border-blue-500 flex flex-col items-center bg-blue-400 bg-opacity-90 rounded-md rounded-s-none">
            <div className="relative w-full max-w-xs">
              <input
                className="mt-5 p-2 pl-4 pr-10 bg-blue-300 outline outline-1 outline-white outline-offset-0 rounded-sm text-gray-700 w-full"
                type="text"
                name="city"
                id="city"
                value={input}
                onKeyDown={handleSearch}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your city here..."
              />
              <img
                onClick={handleSearch}
                src="/search_24dp_75FBFD_FILL0_wght400_GRAD0_opsz24.svg"
                alt="search"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 mt-3 cursor-pointer"
              />
            </div>
            <div className="w-3/4 flex justify-between mt-20 border-b-2 p-2">
              <div className="">Temp</div>
              {weather.main && (
                <div className="">{weather.main.temp}&deg;C</div>
              )}
            </div>
            <div className="w-3/4 flex justify-between mt-20 border-b-2 p-2">
              <div className="">Visibility</div>
              {weather.visibility && <div>{weather.visibility} meters</div>}
            </div>
            <div className="w-3/4 flex justify-between mt-20 border-b-2 p-2">
              <div className="">Wind Speed</div>
              {weather.wind ? (
                <div className="">
                  {weather.wind && weather.wind.speed} meter/sec
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
