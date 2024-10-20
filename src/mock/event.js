import { EVENT_POINTS_TYPES } from '../const';
import { getRandomArrayElement, getRandomInteger } from '../utils/common';
import { nanoid } from 'nanoid';

const DESTINATION_POINTS = [
  {
    id: nanoid(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name:'London',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'Chamonix parliament building'
      },
    ]
  },
  {
    id: nanoid(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name:'Tokyo',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'Chamonix parliament building'
      },
    ]
  },
  {
    id: nanoid(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name:'Berlin',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'Chamonix parliament building'
      },
    ]
  },
  {
    id: nanoid(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name:'Sydney',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'Chamonix parliament building'
      },
    ]
  },
  {
    id: nanoid(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name:'Buenos Aires',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'Chamonix parliament building'
      },
    ]
  },
  {
    id: nanoid(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name:'Cairo',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'Chamonix parliament building'
      },
    ]
  }
];

const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {
        id: nanoid(),
        title: 'taxi offer',
        price: getRandomInteger()
      },
      {
        id: nanoid(),
        title: 'another taxi offer',
        price: getRandomInteger()
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: nanoid(),
        title: 'bus trip',
        price: getRandomInteger()
      },
      {
        id: nanoid(),
        title: 'express bus',
        price: getRandomInteger()
      },
      {
        id: nanoid(),
        title: 'night bus',
        price: getRandomInteger()
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: nanoid(),
        title: 'train ticket',
        price: getRandomInteger()
      },
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: nanoid(),
        title: 'dream cruise',
        price: getRandomInteger()
      },
      {
        id: nanoid(),
        title: 'ferry to treasure island',
        price: getRandomInteger()
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: nanoid(),
        title: 'ford focus rental',
        price: getRandomInteger()
      },
      {
        id: nanoid(),
        title: 'delimobil carsharing',
        price: getRandomInteger()
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: nanoid(),
        title: 'flight paris',
        price: getRandomInteger()
      },
      {
        id: nanoid(),
        title: 'flight new york',
        price: getRandomInteger()
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: nanoid(),
        title: 'hilton hotel',
        price: getRandomInteger()
      },
      {
        id: nanoid(),
        title: 'friends hostel',
        price: getRandomInteger()
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: nanoid(),
        title: 'kremlin tour',
        price: getRandomInteger()
      },
      {
        id: nanoid(),
        title: 'hermitage museum visit',
        price: getRandomInteger()
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: nanoid(),
        title: 'pushkin restaurant',
        price: getRandomInteger()
      },
      {
        id: nanoid(),
        title: 'shokoladnitsa cafe',
        price: getRandomInteger()
      }
    ]
  }
];

const mockEvents = [
  {
    id: nanoid(),
    type: getRandomArrayElement(EVENT_POINTS_TYPES),
    destination: getRandomArrayElement(DESTINATION_POINTS).id,
    'date_from': new Date('2024-12-17 09:00'),
    'date_to': new Date('2025-08-17 18:00'),
    'base_price': getRandomInteger(),
    'is_favorite': false,
    offers: [ getRandomArrayElement(getRandomArrayElement(OFFERS).offers).id ],
  },
  {
    id: nanoid(),
    type: getRandomArrayElement(EVENT_POINTS_TYPES),
    destination: getRandomArrayElement(DESTINATION_POINTS).id,
    'date_from': new Date('2024-10-02 09:45'),
    'date_to': new Date('2024-10-02 21:30'),
    'base_price': getRandomInteger(),
    'is_favorite': false,
    offers: [ getRandomArrayElement(getRandomArrayElement(OFFERS).offers).id ],
  },
  {
    id: nanoid(),
    type: getRandomArrayElement(EVENT_POINTS_TYPES),
    destination: getRandomArrayElement(DESTINATION_POINTS).id,
    'date_from': new Date('2020-02-19 08:20'),
    'date_to': new Date('2020-03-05 02:15'),
    'base_price': getRandomInteger(),
    'is_favorite': true,
    offers: [ getRandomArrayElement(getRandomArrayElement(OFFERS).offers).id ],
  },
  {
    id: nanoid(),
    type: getRandomArrayElement(EVENT_POINTS_TYPES),
    destination: getRandomArrayElement(DESTINATION_POINTS).id,
    'date_from': new Date('2020-04-11 09:00'),
    'date_to': new Date('2020-05-17 18:00'),
    'base_price': getRandomInteger(),
    'is_favorite': false,
    offers: [ getRandomArrayElement(getRandomArrayElement(OFFERS).offers).id ],
  },
  {
    id: nanoid(),
    type: getRandomArrayElement(EVENT_POINTS_TYPES),
    destination: getRandomArrayElement(DESTINATION_POINTS).id,
    'date_from': new Date('2021-02-14 12:20'),
    'date_to': new Date('2021-04-10 23:30'),
    'base_price': getRandomInteger(),
    'is_favorite': true,
    offers: [ getRandomArrayElement(getRandomArrayElement(OFFERS).offers).id ],
  },
  {
    id: nanoid(),
    type: getRandomArrayElement(EVENT_POINTS_TYPES),
    destination: getRandomArrayElement(DESTINATION_POINTS).id,
    'date_from': new Date('2023-06-01 14:00'),
    'date_to': new Date('2023-06-02 16:30'),
    'base_price': getRandomInteger(),
    'is_favorite': true,
    offers: [ getRandomArrayElement(getRandomArrayElement(OFFERS).offers).id ],
  },
  {
    id: nanoid(),
    type: getRandomArrayElement(EVENT_POINTS_TYPES),
    destination: getRandomArrayElement(DESTINATION_POINTS).id,
    'date_from': new Date('2024-11-12 08:00'),
    'date_to': new Date('2024-11-15 20:15'),
    'base_price': getRandomInteger(),
    'is_favorite': false,
    offers: [ getRandomArrayElement(getRandomArrayElement(OFFERS).offers).id ],
  },
  {
    id: nanoid(),
    type: getRandomArrayElement(EVENT_POINTS_TYPES),
    destination: getRandomArrayElement(DESTINATION_POINTS).id,
    'date_from': new Date('2022-03-22 10:45'),
    'date_to': new Date('2022-03-25 18:00'),
    'base_price': getRandomInteger(),
    'is_favorite': false,
    offers: [ getRandomArrayElement(getRandomArrayElement(OFFERS).offers).id ],
  },
];

const getRandomEvent = () => ({
  id: nanoid(),
  ...getRandomArrayElement(mockEvents),
});

export { getRandomEvent, DESTINATION_POINTS, OFFERS };
