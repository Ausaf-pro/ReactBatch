import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Grid,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  List,
  ListItem,
  Fade,
  Avatar,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ListUser() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("idle");
  const timerRef = useRef();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    setEmail("");
    setPassword("");
    clearTimeout(timerRef.current);

    if (query !== "idle") {
      setQuery("idle");
      return;
    }

    setQuery("progress");
    timerRef.current = window.setTimeout(() => {
      setQuery("success");
      // window.location.reload();

      console.log("success");
      fetch("https://reqres.in/api/users?delay=3")
        .then((res) => res.json())
        .then((resJSON) => {
          setUsers(resJSON.data);
        });
    }, 2000);
  };

  // useEffect(() => {
  //   fetch("https://reqres.in/api/users?delay=3")
  //     .then((res) => res.json())
  //     .then((resJSON) => {
  //       setUsers(resJSON.data);
  //     });
  // });

  // const handleMount = () => {
  //   window.location.reload();
  // };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Login From Component
          </Typography>

          <Button onClick={handleClick} variant="contained" color="secondary">
            {query !== "idle" ? "Reset" : "Mount"}
          </Button>
        </Toolbar>
      </AppBar>
      <Grid style={{ display: "flex" }}>
        <Card
          style={{
            maxWidth: 400,
            width: "400px",
            margin: "5% auto",
            padding: "10px ",
          }}
          variant="outlined"
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Hello
            </Typography>
            <Typography variant="h5" component="h2">
              Login
            </Typography>

            <Grid style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                style={{ margin: "20px" }}
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmail}
              />
              <TextField
                style={{ margin: "20px" }}
                label="Job Description"
                variant="outlined"
                value={password}
                onChange={handlePassword}
              />
              <Button
                style={{ margin: "10px auto", width: "40%" }}
                variant="contained"
                color="secondary"
                disabled={email && password ? false : true}
                onClick={handleClick}
              >
                Sign in
              </Button>
            </Grid>
          </CardContent>
          <CardActions style={{ marginLeft: "40%" }}>
            <div className={classes.placeholder}>
              {query === "success" ? (
                <Typography>Success!</Typography>
              ) : (
                <Fade
                  in={query === "progress"}
                  style={{
                    transitionDelay: query === "progress" ? "800ms" : "0ms",
                  }}
                >
                  <CircularProgress color="secondary" />
                </Fade>
              )}
            </div>
          </CardActions>
        </Card>
        <Card
          style={{
            maxWidth: 400,
            width: "400px",
            margin: "5% auto",
            padding: "10px ",
          }}
          variant="outlined"
        >
          <List className={classes.root}>
            {users.map((user) => {
              return (
                <ListItem key={user.id}>
                  <Avatar key={user.avatar} src={user.avatar}></Avatar>
                  <ListItemText
                    style={{ margin: "15px" }}
                    primary={user.first_name}
                    secondary={user.email}
                  />
                </ListItem>
              );
            })}
          </List>
        </Card>
      </Grid>
    </>
  );
}

export default ListUser;
