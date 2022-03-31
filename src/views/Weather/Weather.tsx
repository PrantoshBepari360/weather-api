import { Card, Container, Grid, Box, CardContent } from "@mui/material";
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
    const url = `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, [API_KEY, city]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <h2 style={{ marginBottom: "30px", textAlign: "center" }}>Wether</h2>
        <Container>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Box sx={{ marginX: "auto" }}>
              <Card sx={{ maxWidth: 345, margin: "3%" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  Temperature: {wether?.current?.temperature}
                </CardContent>
                <CardContent style={{ padding: "0px" }}>
                  <img
                    style={{
                      width: "350px",
                      height: "200px",
                    }}
                    src={wether?.current?.weather_icons}
                    alt="Weather icon"
                  />
                </CardContent>
                <CardContent sx={{ textAlign: "center" }}>
                  Wind speed: {wether?.current?.wind_speed}
                </CardContent>
                <CardContent sx={{ textAlign: "center" }}>
                  Precip: {wether?.current?.precip}
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Wether;
