import React from "react";
import "../../App.css";
import { Box, Button, Card, CardContent, Container, Grid } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const inputStyle = {
  width: "60%",
  fontSize: "21px",
  backgroundColor: "white",
  padding: "15px",
  margin: "0px",
  border: "0px",
  outline: "0px",
};

const buttonStyle = {
  borderTop: "0px",
  borderRight: "0px",
  borderBottom: "0px",
  backgroundColor: "white",
  fontSize: "20px",
  cursor: "pointer",
  padding: "15px",
  margin: "0px",
  outline: "0px",
};

const Home = () => {
  interface Provider {
    data: [];
    capital: string;
    population: string;
    latlng: string;
    flags: {
      png: string;
    };
    name: {
      common: string;
    };
  }

  const [data, setData] = React.useState<Provider[]>([]);
  const [country, setCountry] = React.useState("");
  const [error, setErr] = React.useState("");

  const searchCountryName = () => {
    const url = `https://restcountries.com/v3.1/name/${country}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setData(data);
          setCountry("");
          setErr(data.status);
        }
      });
  };

  const enter = (e: any, country: string) => {
    if (e.key === "Enter") {
      if (country) {
        searchCountryName();
      }
    }
  };

  return (
    <div className="App">
      <Container sx={{ height: "320px" }}>
        <Box
          sx={{
            paddingTop: "25px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <WbSunnyIcon sx={{ color: "#e91e63" }} />{" "}
          <span
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: "500",
              marginLeft: "10px",
            }}
          >
            WeatherStack
          </span>
          <MenuIcon
            sx={{
              marginLeft: "auto",
              color: "black",
              backgroundColor: "white",
              borderRadius: "3px",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingY: "3%",
          }}
        >
          <input
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            placeholder="Enter Your Country Name"
            onKeyDown={(e) => enter(e, country)}
            style={inputStyle}
          />
          <button
            disabled={!country}
            onClick={searchCountryName}
            style={buttonStyle}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              search <SearchIcon sx={{ marginLeft: "4px" }} />
            </Box>
          </button>
        </Box>
        <h1 style={{ margin: "0px", color: "white" }}>Country Search</h1>
      </Container>

      <Box sx={{ flexGrow: 1, paddingY: "50px" }}>
        <Container>
          {error && (
            <div
              style={{
                backgroundColor: "#e91e63",
                padding: "10px",
                color: "white",
                fontSize: "21px",
              }}
            >
              Please Enter your valid country name.
            </div>
          )}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {data?.length > 0 &&
              data?.map((dt, index) => {
                return (
                  <Box sx={{ marginX: "auto" }} key={index}>
                    <Card sx={{ maxWidth: 345, margin: "3%" }}>
                      <CardContent style={{ padding: "0px" }}>
                        <img
                          style={{ width: "350px", height: "200px" }}
                          src={dt.flags.png}
                          alt="Flag"
                        />
                      </CardContent>
                      <CardContent>Capital: {dt.capital}</CardContent>
                      <CardContent>Population: {dt.population}</CardContent>
                      <CardContent>Latling: {dt.latlng[0]}</CardContent>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/wether/${dt.name.common}`}
                      >
                        <Button
                          style={{
                            textAlign: "center",
                            marginBottom: "20px",
                          }}
                          variant="contained"
                          size="large"
                        >
                          Capital Weather
                        </Button>
                      </Link>
                    </Card>
                  </Box>
                );
              })}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
