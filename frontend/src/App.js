// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import {SpotsAll} from './components/SpotsAll';
import{SpotId} from './components/SpotId';
import {SpotCurUser} from './components/SpotCurUser';
import {SpotBrowser} from './components/SpotBrowser';
import {AddSpotImg} from './components/AddSpotImg';
import {BookingCurUser} from './components/BookingCurUser';
import {BookingId} from './components/BookingId';
import { BookingAdd } from "./components/BookingAdd";
import {SpotEdit} from './components/SpotEdit'

// import {RemoveSpot} from './components/RemoveSpot';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/" >
            <SpotsAll />
          </Route>
          <Route exact path="/user/spots" >
            <SpotCurUser />
          </Route>

          <Route exact path="/user/bookings" >
            <BookingCurUser />
          </Route>

          <Route exact path="/bookings/:spotId" >
            <BookingId />
          </Route>

          <Route exact path="/spots/new" >
            <SpotBrowser />
          </Route>

          <Route exact path="/spots/:spotId/bookings/new" >
            <BookingAdd />
          </Route>

          <Route exact path="/spots/:spotId/edit" >
            <SpotEdit />
          </Route>

          <Route exact path="/spots/:spotId/images" >
            <AddSpotImg />
          </Route>


          <Route exact path="/spots/:spotId" >
            <SpotId />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;