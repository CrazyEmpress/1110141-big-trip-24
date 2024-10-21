import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const.js';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click «NEW EVENT» in menu to create your first task',
  [FilterType.FUTURE]: 'There are no events planned',
  [FilterType.PAST]: 'There are no past events',
  [FilterType.PRESENT]: 'There are no events for today',
};

function createNoPointsTemplate(filterType) {
  const noTaskTextValue = NoTasksTextType[filterType];
  return `<p class="trip-events__msg">
            ${noTaskTextValue}
          </p>`;
}

export default class NewNoPointsView extends AbstractView {
  #filterType = null;

  constructor ({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointsTemplate(this.#filterType);
  }
}
