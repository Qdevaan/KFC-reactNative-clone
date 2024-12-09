export type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  addOns?: number[];
  drinks?: number[];
};

export type MenuData = {
  menuItems: MenuItem[];
};

export const HEADER_MAX_HEIGHT = 300;
export const HEADER_MIN_HEIGHT = 120;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

