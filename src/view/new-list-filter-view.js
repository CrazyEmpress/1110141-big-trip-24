import AbstractView from '../framework/view/abstract-view';

function createNewFilterItemTemplate(filter, currentFilterType) {
  const {type, count} = filter;

  return `<div class="trip-filters__filter">
            <input
              id="filter-${ type }"
              class="trip-filters__filter-input visually-hidden"
              type="radio"
              name="trip-filter"
              value="${ type }"
              ${ count === 0 ? 'disabled' : '' }
              ${ currentFilterType === type ? 'checked' : '' }>
            <label class="trip-filters__filter-label" for="filter-${ type }">${ type }</label>
          </div>`;
}

function createNewListFilterTemplate (filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems.map((filter) => createNewFilterItemTemplate(filter, currentFilterType)).join('');
  return `<div class="trip-main__trip-controls  trip-controls">
            <div class="trip-controls__filters">
              <h2 class="visually-hidden">Filter events</h2>
              <form class="trip-filters" action="#" method="get">
                ${filterItemsTemplate}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>
            </div>
          </div>`;
}

export default class NewListFilterView extends AbstractView {

  #filters = null;
  #handleFilterTypeChange = null;
  #currentFilter = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', (event) => this.#filterTypeChangeHandler(event));
  }

  get template() {
    return createNewListFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (event) => {
    event.preventDefault();
    this.#handleFilterTypeChange();
  };
}
