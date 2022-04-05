import { Box, Button, Card, CardContent, Container, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

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

  return (
    <div className="App">
      <Box style={{ padding: "30px", backgroundColor: "#06add4" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            placeholder="Enter Your Country Name"
            // id="outlined-basic"
            // label="Enter Your Country Name"
            // variant="outlined"
            style={{
              width: "30%",
              fontSize: "20px",
              padding: "10px",
              border: "0px",
              outline: "0px",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
            }}
          />
          <button
            disabled={!country}
            onClick={searchCountryName}
            // variant="contained"
            // size="medium"
            style={{
              backgroundColor: "#ff7602",
              fontSize: "20px",
              cursor: "pointer",
              padding: "10px",
              border: "0px",
              outline: "0px",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          >
            search
          </button>
        </Box>
        <h1 style={{ marginBottom: "30px", color: "white" }}>Country Search</h1>
      </Box>

      <Box sx={{ flexGrow: 1, paddingY: "50px" }}>
        <Container>
          {error && (
            <div
              style={{
                backgroundColor: "Red",
                padding: "10px",
                color: "white",
                fontSize: "20px",
              }}
            >
              Please Enter your valid country name. page not found {error}
            </div>
          )}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {data?.length &&
              data?.map((dt) => {
                return (
                  <Box sx={{ marginX: "auto" }} key={dt.capital}>
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
