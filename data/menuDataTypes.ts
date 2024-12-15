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