import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {reducer, initialState} from './reducers/index';
import HomePage from './components/home/HomePage';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import CinemaStudioRegisterPage from './components/register/cinemaStudio/CinemaStudioRegisterPage';
import TheatherRegisterPage from './components/register/theather/TheatherRegisterPage';
import CinemaCreatorRegisterPage from './components/register/cinemaCreator/CinemaCreatorRegisterForm';
import Auditoriums from './components/home/theather/auditoriums/Auditoriums';
import Events from './components/home/theather/events/Events';
import Subscriptions from './components/home/theather/Subscriptions';
import NewEvent from './components/home/theather/events/NewEvent';
import EventDetails from './components/home/theather/events/EventDetails';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

const store = createStore(reducer, initialState, compose(
	applyMiddleware(routerMiddleware(browserHistory), thunkMiddleware),
	typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
));

const history = syncHistoryWithStore(browserHistory, store);

render(
	(
		<Provider store={store}>
			{ /* Tell the Router to use our enhanced history */}
			<Router history={history}>
				<Route path="/" component={LandingPage} />
				<Route path="home" component={HomePage} />
				<Route path="register" component={RegisterPage} />
				<Route path="register/cinemastudio" component={CinemaStudioRegisterPage} />
				<Route path="register/theather" component={TheatherRegisterPage} />
				<Route path="register/cinemacreator" component={CinemaCreatorRegisterPage} />
				<Route path="login" component={LoginPage} />
				<Route path="theather/auditoriums" component={Auditoriums} />
				<Route path="theather/events" component={Events} />
				<Route path="theather/subscriptions" component={Subscriptions} />
				<Route path="theather/newEvent" component={NewEvent} />
				<Route path="theather/eventDetails/:id" component={EventDetails}/>
			</Router>
		</Provider>
	),
	document.getElementById('app')
);