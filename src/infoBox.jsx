import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./infoBox.css";
import Rain_img from "./assets/Rain.png";
import Hot_img from "./assets/Hot.png";
import Cold_img from "./assets/Cold.png";
import initial_img from "./assets/initial.png";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";

export default function InfoBox({ info }) {
  let [img, setImg] = useState(initial_img);

  useEffect(() => {
    if (info.city == "") setImg(initial_img);
    else {
      info.humidity > 80
        ? setImg(Rain_img)
        : info.temp > 15
        ? setImg(Hot_img)
        : setImg(Cold_img);
    }
  });

  let handleIcon = () => {
    return info.city == "" ? (
      "---"
    ) : info.humidity > 80 ? (
      <ThunderstormIcon fontSize="large" />
    ) : info.temp > 15 ? (
      <WbSunnyIcon fontSize="large" />
    ) : (
      <AcUnitIcon fontSize="large" />
    );
  };

  return (
    <div className="infoBox">
      <Card
        sx={{ maxWidth: 345, backgroundColor: "rgba(135, 206, 250, 0.579)" }}
      >
        <CardContent>
          <h2 className="cityName">
            {info.city}&nbsp;
            {handleIcon()}
          </h2>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: 600, fontSize: 15 }}
          >
            <p>Temperature = {info.temp}&deg;C</p>
            <p>Humidity = {info.humidity}</p>
            <p>Min Temp = {info.tempMin}&deg;C</p>
            <p>Max Temp = {info.tempMax}&deg;C</p>
            <p>
              Weather can be describe as <i>{info.weather}</i> and feels like{" "}
              {info.feelsLike}&deg;C
            </p>
            {/* <h1>hello world</h1> */}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
