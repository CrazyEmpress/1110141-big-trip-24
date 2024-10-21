// Импорт вьюшек
import NewListSortView from '../view/new-list-sort-view';
// Это до поры до времени import NewAddPointView from '../view/new-add-new-point-view';
import NewListView from '../view/new-list-view';
import NewNoPointsView from '../view/no-points-view';

// Импорт вспомогательных функций
import { render, remove } from '../framework/render';
import { EventPresenter } from './event-presenter';
import { SortType, UserAction, UpdateType } from '../const';
import { sortByPrice, sortByTime, sortByDay } from '../utils/event';
import {filter} from '../utils/filter.js';

export default class TripsPresenter {
  #tripList = null;

  #eventPresenters = new Map();

  #sortComponent = null;
  #eventsModel = null;
  #body = null;
  #filterModel = null;
  #noPointsView = null;
  #filterType = null;

  #currentSortType = SortType.DEFAULT;

  #listElement = new NewListView();

  constructor({eventsModel, filterModel}) {
    this.#body = document.body;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;
    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredEvents.sort(sortByPrice);
      case SortType.TIME:
        return filteredEvents.sort(sortByTime);
    }

    return filteredEvents.sort(sortByDay);
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
  #renderTrips () {
    // Получаем DOM элемент списка точек маршрута
    this.#tripList = this.#listElement.element;

    // render(new NewAddPointView(), this.tripList);

    // Проверяем, есть ли точки маршрута для отображения
    // TODO: Пока так, потом надо будет переделать фразы под каждый фильтр
    if (this.events.length === 0) {
      // Если точек маршрута нет — выводим сообщение
      this.#renderNoPointsView();
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

  #renderNoPointsView () {
    this.#noPointsView = new NewNoPointsView({
      filterType: this.#filterType,
    });
    render(this.#noPointsView, this.#body.querySelector('.trip-events'));
  }

  /**
   * Создаёт экземпляр презентера точки маршрута и отрисовывает её через метод init()
   * @param {event} event - Точка маршрута
   */
  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter({
      onDataChange: this.#handleViewAction,
      tripList: this.#tripList,
      onModeChange: this.#handleModeChange,
    });
    this.#eventPresenters.set(event.id, eventPresenter);
    eventPresenter.init(event);
  };

  #renderEventsList = () => {
    this.events.forEach((event) => this.#renderEvent(event));
  };

  /**
   * Создаёт экземпляр сортировки
   */
  #renderSort = () => {
    this.#sortComponent = new NewListSortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });
  };

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
        this.#clearTrips({ resetSortType: true });
        this.#renderTrips();
        break;
    }
  };

  #clearTrips = ({ resetSortType = false } = {}) => {

    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointsView);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };
}
