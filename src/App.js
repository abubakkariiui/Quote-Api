import { Grid, makeStyles } from '@material-ui/core';
import './App.css';
import QuoteCard from './components/QuoteCard';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    background: "#f1f1f1",
  },
  heading: {
    fontFamily: "times, Times New Roman, times-roman, georgia, serif",
    fontSize: "25px",
    lineHeight: "40px",
    letterSpacing: "-1px",
    color: "#444",
    fontWeight: "100",
  },
}));

function App() {

  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <h2 className={classes.heading}>Random Quote Generator</h2>

      <Grid item md={8} sm={8} xs={10}>
        <QuoteCard />
      </Grid>
    </Grid>
  );
}

export default App;
