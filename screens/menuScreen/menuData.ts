import { MenuSection } from './types';

export const menuData: MenuSection[] = [
  {
    title: 'Choose an option',
    type: 'required',
    items: [
      {
        id: 'krunch-burger',
        name: 'Krunch Burger',
        price: 310,
        image: "https://www.kfcpakistan.com/images/b438e990-bc23-11ee-be0d-ed0e61ce8a3a-Untitleddesign(5)-min_variant_0-2024-01-26082002.png",
        description: 'Zinger fillet, lettuce, mayo, and a soft sesame bun.',
      },
    ],
  },
  {
    title: 'Drink',
    type: 'optional',
    items: [
      {
        id: 'pepsi',
        name: 'Pepsi Regular',
        price: 180,
        image: 'https://www.kfcpakistan.com/images/6249b820-0513-11ee-9e45-cb0ed000d4a6-pepsicopy-2023-06-07091210.png',
      },
      {
        id: '7up',
        name: '7UP Regular',
        price: 180,
        image: 'https://www.kfcpakistan.com/images/62153aa0-0513-11ee-8eee-c7aabf77bad4-7up-2023-06-07091210.png',
      },
      
    ],
  },
  {
    title: 'Add Ons',
    type: 'optional',
    items: [
      {
        id: 'coleslaw',
        name: 'Coleslaw',
        price: 150,
        image: 'https://www.kfcpakistan.com/images/61ec55e0-0513-11ee-aee5-69eb5757a047-Coleslaw-2023-06-07091210.png',
      },
      {
        id: 'dinner-roll',
        name: 'Dinner Roll',
        price: 50,
        image: 'https://www.kfcpakistan.com/images/6249b820-0513-11ee-9e45-cb0ed000d4a6-Dinner-Roll-copy-2023-06-07091210.png',
      },
    ],
  },
];