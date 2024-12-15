import { MenuData } from './menuDataTypes';

export const menuData: MenuData = {
  menuItems: [
    {
      id: 100,
      name: "Krunch Burger",
      price: 310,
      image: "https://www.kfcpakistan.com/images/b438e990-bc23-11ee-be0d-ed0e61ce8a3a-Untitleddesign(5)-min_variant_0-2024-01-26082002.png",
      description: "Zinger fillet, lettuce, mayo, and a soft sesame bun.",
      addOns: [600, 601, 602],
      drinks: [700, 701, 702]
    },
    {
      id: 200,
      name: "Zinger Burger",
      price: 550,
      image: "https://www.kfcpakistan.com/images/6249b820-0513-11ee-9e45-cb0ed000d4a6-Zinger_variant_0-2023-06-07091210.png",
      description: "Our signature burger with a crunchy Zinger fillet, lettuce and mayo.",
      addOns: [600, 601, 602],
      drinks: [700, 701, 702]
    },
    {
      id: 300,
      name: "Crispy Box",
      price: 750,
      image: "https://www.kfcpakistan.com/images/63fb28b0-9627-11ef-b420-51a55a9d1dbc-CrispyBox-2024-10-29185539.png",
      description: "1 Zinger Burger + 1 Piece Chicken + 1 Fries + 1 Drink + 1 Coleslaw",
      addOns: [600, 601, 602],
      drinks: [700, 701, 702]
    },
    {
      id: 400,
      name: "Family Festival",
      price: 2450,
      image: "https://www.kfcpakistan.com/images/63fb28b0-9627-11ef-b5b6-331c16c28159-family-Festivle-1-2024-10-29185539.png",
      description: "4 Zinger Burgers + 4 Pieces Chicken + 2 Dinner Rolls + 1.5L Drink",
      addOns: [600, 601, 602],
      drinks: [700, 701, 702]
    },
    {
      id: 500,
      name: "Bucket for Two",
      price: 1450,
      image: "https://www.kfcpakistan.com/images/7e703860-8c0a-11ef-96ca-83eb584d9244-Thumbnail(3)-2024-10-16220337.png",
      description: "9 Pieces Chicken + 1 Large Fries + 2 Regular Drinks",
      addOns: [600, 601, 602],
      drinks: [700, 701, 702]
    },
    {
      id: 600,
      name: "Fries",
      price: 270,
      image: "https://www.kfcpakistan.com/images/62153aa0-0513-11ee-8eee-c7aabf77bad4-RegularFries-2023-06-07091210.png",
      description: "Crispy and delicious French fries."
    },
    {
      id: 601,
      name: "Dinner Roll",
      price: 60,
      image: "https://www.kfcpakistan.com/images/6249b820-0513-11ee-9e45-cb0ed000d4a6-Dinner-Roll-copy-2023-06-07091210.png",
      description: "Soft and fluffy dinner roll."
    },
    {
      id: 602,
      name: "Coleslaw",
      price: 90,
      image: "https://www.kfcpakistan.com/images/61ec55e0-0513-11ee-aee5-69eb5757a047-Coleslaw-2023-06-07091210.png", 
      description: "Creamy and delicious coleslaw."
    },
    {
      id: 700,
      name: "Regular Pepsi",
      price: 180,
      image: "https://www.kfcpakistan.com/images/6249b820-0513-11ee-9e45-cb0ed000d4a6-pepsicopy-2023-06-07091210.png",
      description: "Refreshing Pepsi drink."
    },
    {
      id: 701,
      name: " Regular 7UP",
      price: 180,
      image: "https://www.kfcpakistan.com/images/62153aa0-0513-11ee-8eee-c7aabf77bad4-7up-2023-06-07091210.png",
      description: "Refreshing Diet Pepsi drink."
    },
    {
      id: 702,
      name: "Regular Mirinda",
      price: 180,
      image: "https://www.kfcpakistan.com/images/61ea8120-0513-11ee-b037-a334837c64cb-Mirinda-2023-06-07091210.png",
      description: "Refreshing 7UP drink.",
    }
  ]
};

