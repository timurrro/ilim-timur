import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import PocketBase from "pocketbase";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import BookCard from "./BookCard";
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState();
  const [error, setError] = useState();
  const [products, setProducts] = useState([]);

  const pb = new PocketBase("https://tazalyk.fly.dev/");

  const getProducts = async () => {
    try {
      const resultList = await pb.collection("eshop_products").getList(1,50 ,{
        $autoCancel: false,
      });

      setProducts(resultList);
      setLoading(false)

    } catch (e) {
      console.log(e);
      setError(e);
      handleClick();
    }
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Container sx={{paddingTop: 10}}>
      {console.log(products)}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      />

      <Grid container spacing={2}>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          products?.items?.map((eshop) => (
            <Grid key={eshop.id} item xs={6} sm={4} md={4} lg={3}>
              <BookCard 
                
                id={eshop.id}
                title={eshop.title}
                photo={`https://tazalyk.fly.dev/api/files/eshop_products/${eshop.id}/${eshop?.photo}`}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default HomePage;
