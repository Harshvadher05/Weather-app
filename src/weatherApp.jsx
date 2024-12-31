import { useEffect, useState } from "react";
import InfoBox from "./infoBox";
import SearchBox from "./searchBox";
import "./weatherApp.css";

export default function WeatherApp() {
  let [bgImg, setBgImg] = useState("url(./src/assets/initial.png)");

  let blank = {
    city: "",
    weather: "",
    feelsLike: 0,
    humidity: 0,
    temp: 0,
    tempMax: 0,
    tempMin: 0,
  };
  let [weatherInfo, setWeatherInfo] = useState(blank);

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };
  let blankInfo = () => {
    setWeatherInfo(blank);
  };

  useEffect(() => {
    if (weatherInfo.city == "") setBgImg("url(./src/assets/initial.png)");
    else {
      weatherInfo.humidity > 80
        ? setBgImg("url(./src/assets/Rain.png)")
        : weatherInfo.temp > 15
        ? setBgImg("url(./src/assets/Hot.png)")
        : setBgImg("url(./src/assets/Cold.png)");
    }
  });

  return (
    <>
      <div className="bgImg" style={{ backgroundImage: bgImg }}></div>
      <div className="mainContainer">
        <div className="leftSide">
          <SearchBox updateInfo={updateInfo} blankInfo={blankInfo} />
        </div>
        <div
          className="rightSide"
          style={{ display: weatherInfo.city == "" ? "none" : "block" 
            
          }}
        >
          <InfoBox info={weatherInfo} />
        </div>
      </div>
    </>
  );
}
