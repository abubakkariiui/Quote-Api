import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { CardContent, CardActions } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { IconButton } from "@material-ui/core";
import {
    FileCopy as FileCopyIcon,
    Refresh as RefreshIcon,
  } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 500,
    minHeight: 100,
  },
  content: {
    fontSize: "1rem",
  },
  author: {
    marginTop: 12,
    fontSize: ".8rem",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: "15px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
  },
  quoteCopiedMessage: {
    color: "green",
    fontSize: "13px",
    marginLeft: "10px",
  },
}));

const QuoteCard = () => {
  const classes = useStyles();

  const [quote, setQuote] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [quoteCopied, setQuoteCopied] = useState(false);

  const fetchRandomQuote = async () => {
    try {
      setLoadingQuote(true);
      setErrorMessage("");
      setQuoteCopied(false);
      const quotes = await axios.get("https://api.quotable.io/random");
      setQuote(quotes.data);
      setLoadingQuote(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoadingQuote(false);
    }
  };


  useEffect(() => {
    fetchRandomQuote();
  }, []);

  function copyQuote() {
    navigator.clipboard.writeText(quote.content + " - " + quote.author);
    setQuoteCopied(true);
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        {loadingQuote ? (
          <div>
            <Skeleton height={80} width={"38vw"} animation="wave" />
            <Skeleton height={30} width={"20vw"} animation="wave" />
          </div>
        ) : quote.content ? (
          <div>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.content}
            >
              {quote.content}
            </Typography>
            <Typography className={classes.author} color="textSecondary">
              - {quote.author}
            </Typography>
          </div>
        ) : (
          <p className={classes.errorMessage}>{errorMessage}</p>
        )}
      </CardContent>
      <CardActions disableSpacing className={classes.footer}>
        <div>
          {quoteCopied ? (
            <p className={classes.quoteCopiedMessage}>
              Quote copied to clipboard
            </p>
          ) : (
            <IconButton aria-label="copy-icon" onClick={copyQuote}>
              <FileCopyIcon />
            </IconButton>
          )}
        </div>
        <div>
          <IconButton aria-label="copy-icon" onClick={fetchRandomQuote}>
            <RefreshIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default QuoteCard;
