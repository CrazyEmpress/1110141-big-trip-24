import TripsPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter.js';

import EventsModel from './model/events-model';
import FilterModel from './model/filter-model.js';

const tripMain = document.querySelector('.trip-main');

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: tripMain,
  filterModel,
  eventsModel
});

const tripsPresenter = new TripsPresenter({eventsModel, filterModel});

filterPresenter.init();
tripsPresenter.init();
