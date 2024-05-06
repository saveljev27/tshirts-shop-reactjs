import React from 'react';

import { useSelector } from 'react-redux';

import {
  Categories,
  Sort,
  ShirtBlock,
  Skeleton,
  Pagination,
} from '../components';

import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectShirtData } from '../redux/shirt/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchShirt } from '../redux/shirt/asyncActions';
import { categories } from '../utils/data';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items, status } = useSelector(selectShirtData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getShirts = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? String(categoryId) : '';
    const search = searchValue;

    dispatch(
      fetchShirt({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getShirts();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);
  const shirts = items.map((obj: any) => <ShirtBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      {categories.map(
        (titleId, index) =>
          index === categoryId && (
            <h2 key={index} className="content__title">
              {titleId}
            </h2>
          )
      )}
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Nothing found 😕</h2>
          <p>
            Unfortunately, it was not possible to get the t-shirts. Please try
            again later.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : shirts}
        </div>
      )}
      {(items.length >= 8 || currentPage === 3) && (
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      )}
    </div>
  );
};

export default Home;
