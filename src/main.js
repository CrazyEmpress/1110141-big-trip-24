import TripsPresenter from './presenter/trip-presenter';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model.js';

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const tripsPresenter = new TripsPresenter({eventsModel});


tripsPresenter.init();
