// Импорт вьюшек
import NewListFilterView from '../view/new-list-filter-view';
import NewListSortView from '../view/new-list-sort-view';
// Это до поры до времени import NewAddPointView from '../view/new-add-new-point-view';
import NewListView from '../view/new-list-view';
import NewNoPointView from '../view/no-points-view';

// Импорт вспомогательных функций
import { render, remove } from '../framework/render';
import { generateFilter } from '../mock/filter';
import { EventPresenter } from './event-presenter';
import { SortType, UserAction, UpdateType } from '../const';
import { sortByPrice, sortByTime, sortByDay } from '../utils/event';

export default class TripsPresenter {
  #tripList = null;

  #eventPresenters = new Map();

  #sortComponent = null;
  #eventsModel = null;
  #body = null;

  #currentSortType = SortType.DEFAULT;

  #listElement = new NewListView();
  #noPointView = new NewNoPointView();

  #filters = null;
  #listFilter = null;

  constructor({eventsModel}) {
    this.#body = document.body;

    this.#eventsModel = eventsModel;
    this.#eventsModel.addObserver(this.#handleModelEvent);

    this.#filters = generateFilter(this.events);
    this.#listFilter = new NewListFilterView({ filters: this.#filters });
  }

  get events() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#eventsModel.events].sort(sortByPrice);
      case SortType.TIME:
        return [...this.#eventsModel.events].sort(sortByTime);
    }

    return [...this.#eventsModel.events].sort(sortByDay);
  }

  /**
   * Метод инициализации страницы.
   */
  init() {
    // Вызываем метод отрисовывающий необходимые элементы
    this.#renderTrips();
  }

  /**
   * Метод отрисовки элементов на странице
   */

  /**
   * TODO: Переделать так, чтобы отрисовывать не в this.#body.querySelector('.trip-controls__filters') а в, например, this.tripMain.element
   * (с другой стороны декомпозируя это всё дальше в один момент упрусь в то, что все эти экземпляры классов нужно куда-то вставлять через querySelector)
   */
  #renderTrips () {

    // Отрисовываем фильтры
    render(this.#listFilter, this.#body.querySelector('.trip-controls__filters'));

    // Получаем DOM элемент списка точек маршрута
    this.#tripList = this.#listElement.element;

    // render(new NewAddPointView(), this.tripList);

    // Проверяем, есть ли точки маршрута для отображения
    // TODO: Пока так, потом надо будет переделать фразы под каждый фильтр
    if (this.events.length === 0) {
      // Если точек маршрута нет — выводим сообщение
      render(this.#noPointView, this.#body.querySelector('.trip-events'));
    } else {
      this.#renderSort();
      // Отрисовываем сортировку
      render(this.#sortComponent, this.#body.querySelector('.trip-events'));
      // Отрисовываем этот список
      render(this.#listElement, this.#body.querySelector('.trip-events'));
      // Отрисовываем точки маршрута в цикле
      this.#renderEventsList();
    }
  }

  /**
   * Создаёт экземпляр презентера точки маршрута и отрисовывает её через метод init()
   * @param {event} event - Точка маршрута
   */
  #renderEvent (event) {
    const eventPresenter = new EventPresenter({
      onDataChange: this.#handleViewAction,
      tripList: this.#tripList,
      onModeChange: this.#handleModeChange,
    });
    this.#eventPresenters.set(event.id, eventPresenter);
    eventPresenter.init(event);
  }

  #renderEventsList() {
    this.events.forEach((event) => this.#renderEvent(event));
  }

  /**
   * Создаёт экземпляр сортировки
   */
  #renderSort () {
    this.#sortComponent = new NewListSortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });
  }

  /**
   * Сортирует точки маршрута по переданному типу сортировки
   * @param {string} sortType - тип по которому будем сортировать
   */
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType && sortType !== undefined) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrips();
    this.#renderEventsList();
  };

  /**
   * Сбрасывает режим отображения (обычный или редактирование) точек маршрута
   */
  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrips();
        this.#renderTrips();
        break;
      case UpdateType.MAJOR:
        this.#clearTrips({resetSortType: true, resetFilter: true});
        this.#renderTrips();
        break;
    }
  };

  #clearTrips({resetSortType = false, resetFilter = false} = {}) {

    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointView);

    // Сюда нужно будет добавить фильтрацию по-умолчанию (resetFilter)

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }
}
