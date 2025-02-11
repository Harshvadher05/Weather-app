import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import "./searchBox.css";
import { useState } from "react";
import { colors } from "@mui/material";

export default function SearchBox({ updateInfo, blankInfo }) {
  let API_URL = "https://api.openweathermap.org/data/2.5/weather";
  let API_KEY = String(import.meta.env.API_KEY);
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  let msg = document.querySelector(".container .msg");

  let popupMsg = () => {
    msg.innerHTML = "Getting weather info...";
    msg.style.fontSize = "20px";
    msg.style.color = "green";
  };

  let getWeatherInfo = async () => {
    try {
      popupMsg();
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonRes = await response.json();
      //   console.log(jsonRes);

      let result = {
        city: jsonRes.name,
        temp: jsonRes.main.temp,
        tempMin: jsonRes.main.temp_min,
        tempMax: jsonRes.main.temp_max,
        humidity: jsonRes.main.humidity,
        feelsLike: jsonRes.main.feels_like,
        weather: jsonRes.weather[0].description,
      };
      //   console.log(result);
      return result;
    } catch (err) {
      blankInfo();
      throw err;
    }
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(city);
      setCity("");
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setError(false);
      msg.innerHTML = "";
    } catch (err) {
      setError(true);
      msg.innerHTML = "";
    }
  };

  return (
    <div className="container">
      <h1 className="title">Weather Widget !</h1>
      <form onSubmit={handleSubmit}>
        <div className="searchArea">
          <TextField
            id="city"
            label="Search city"
            variant="filled"
            color="success"
            required
            value={city}
            onChange={handleChange}
          />
        </div>
        <br />
        <br />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
          size="large"
        >
          Send
        </Button>
        <br />
        <br />
        <div className="msg">
          {error && (
            <h3 style={{ color: "red" }}>Opps... No such data found !!</h3>
          )}
        </div>
      </form>
    </div>
  );
}
