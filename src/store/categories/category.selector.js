import { createSelector } from 'reselect';

const selectCategorReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategorReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
