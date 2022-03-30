import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
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

  const inputRef = React.useRef<HTMLInputElement>(null);

  const searchCountryName = () => {
    if (inputRef.current) {
      const inputVal = inputRef.current.value;

      if (inputVal === "") {
        inputRef.current.value = "";
      } else {
        const url = `https://restcountries.com/v3.1/name/${inputVal}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => setData(data));
      }

      inputRef.current.value = "";
    }
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
          <TextField
            inputRef={inputRef}
            id="outlined-basic"
            label="Enter Your Country Name"
            variant="standard"
            style={{ marginRight: "20px" }}
          />
          <Button variant="contained" size="medium" onClick={searchCountryName}>
            search
          </Button>
        </Box>
        <h2 style={{ marginBottom: "30px", color: "#eac40f" }}>
          Country Search
        </h2>
      </Box>

      <Box sx={{ flexGrow: 1, paddingY: "30px" }}>
        <Container>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {data?.length &&
              data?.map((dt, index) => {
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
