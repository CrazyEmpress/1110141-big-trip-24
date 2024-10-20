import TripsPresenter from './presenter/trip-presenter';
import EventsModel from './model/events-model';

const eventsModel = new EventsModel();
const tripsPresenter = new TripsPresenter({eventsModel});


tripsPresenter.init();
