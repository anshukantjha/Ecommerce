import React, { useState } from "react";
import CheckoutSteps from "../../components/checkoutSteps";
import { Helmet } from "react-helmet";
import {
  Home,
  LocationCity,
  PinDrop,
  Phone,
  Public,
  TransferWithinAStation,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Country, State } from "country-state-city";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import { saveShippingInfo } from "../../redux/actions/cartAction";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: "500px",
  margin: "auto",
  marginTop: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phone, setPhone] = useState(shippingInfo.phone || "");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert.error("Phone Number should be 10 digits long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phone })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <Helmet>
        <title>Shipping Details</title>
      </Helmet>
      <CheckoutSteps activeStep={0} />
      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          Shipping Details
        </Typography>
        <form onSubmit={shippingSubmit} className="flex flex-col gap-2">
          <Grid container spacing={2}>
            <Grid item  xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{
                  startAdornment: <Home />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                InputProps={{
                  startAdornment: <LocationCity />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Pin Code"
                variant="outlined"
                fullWidth
                required
                type="number"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                InputProps={{
                  startAdornment: <PinDrop />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                required
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                  startAdornment: <Phone />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Country"
                variant="outlined"
                fullWidth
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                InputProps={{
                  startAdornment: <Public />,
                }}
              >
                <MenuItem value="">
                  <em>Select Country</em>
                </MenuItem>
                {Country.getAllCountries().map((item) => (
                  <MenuItem key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {country && (
              <Grid item xs={12}>
                <TextField
                  select
                  label="State"
                  variant="outlined"
                  fullWidth
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  InputProps={{
                    startAdornment: <TransferWithinAStation />,
                  }}
                >
                  <MenuItem value="">
                    <em>Select State</em>
                  </MenuItem>
                  {State.getStatesOfCountry(country).map((item) => (
                    <MenuItem key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!state}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </>
  );
};

export default ShippingPage;
