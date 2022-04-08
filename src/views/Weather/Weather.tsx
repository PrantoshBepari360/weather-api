import { Card, Container, Box, CardContent } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Wether = () => {
  const { city } = useParams();
  const API_KEY = `7e56b6ad05fbcf98df44d6d905fd8d74`;

  interface Provider {
    weather: {};
    current: {
      temperature: number;
      weather_icons: string;
      wind_speed: number;
      precip: number;
    };
  }

  const [wether, setWeather] = React.useState<Provider>();

  useEffect(() => {
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, [API_KEY, city]);

  return (
    <>
      <Box sx={{ flexGrow: 1, marginX: "auto" }}>
        <h2
          style={{ marginBottom: "30px", textAlign: "center", color: "white" }}
        >
          Country Wether
        </h2>
        <Container>
          <Card
            sx={{ width: "80%", marginX: "auto", backgroundColor: "#e7e7e8" }}
          >
            <CardContent
              style={{ textAlign: "center", padding: "0px", marginTop: "30px" }}
            >
              <img
                style={{ borderRadius: "5px", width: "250px", height: "150px" }}
                src={wether?.current?.weather_icons}
                alt="Weather icon"
              />
            </CardContent>
            <CardContent
              sx={{ textAlign: "center", fontSize: "h6.fontSize", m: 1 }}
            >
              {city}
            </CardContent>
            <CardContent
              sx={{ textAlign: "center", fontSize: "h6.fontSize", m: 1 }}
            >
              Temperature: {wether?.current?.temperature} <span>‎°C</span>
            </CardContent>
            <CardContent
              sx={{ textAlign: "center", fontSize: "h6.fontSize", m: 1 }}
            >
              Wind: {wether?.current?.wind_speed} <span>km/h</span>
            </CardContent>
            <CardContent
              sx={{ textAlign: "center", fontSize: "h6.fontSize", m: 1 }}
            >
              Precip: {wether?.current?.precip}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Wether;
