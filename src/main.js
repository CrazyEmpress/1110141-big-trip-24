import TripsPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter.js';

import EventsModel from './model/events-model';
import FilterModel from './model/filter-model.js';

import NewEventButtonView from './view/new-event-button-view.js';

import { render } from './framework/render.js';

const tripMain = document.querySelector('.trip-main');

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: tripMain,
  filterModel,
  eventsModel
});

const tripsPresenter = new TripsPresenter({
  eventsModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  tripsPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

filterPresenter.init();

render(newEventButtonComponent, tripMain);

tripsPresenter.init();
