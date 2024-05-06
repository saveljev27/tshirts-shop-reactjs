import { SortPropertyEnum } from '../redux/filter/types';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export const categories = ['All', 'Black', 'White', 'Color', 'Sweatshirts'];
export const typeNames = ['Yourself', 'For Gift'];
export const sizeNames = ['S', 'M', 'L'];

export const sortList: SortItem[] = [
  { name: 'Popularity +', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'Popularity -', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'Price +', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'Price -', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'Alphabetically +', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'Alphabetically -', sortProperty: SortPropertyEnum.TITLE_ASC },
];
