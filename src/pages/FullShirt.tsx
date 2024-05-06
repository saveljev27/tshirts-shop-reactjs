import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { categories, sizeNames, typeNames } from '../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../redux/cart/types';
import { addItem } from '../redux/cart/slice';
import { selectCartItemById } from '../redux/cart/selectors';

const FullShirt: React.FC = () => {
  const [shirts, setShirts] = React.useState<{
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    rating: number;
    category: number;
    sizes: number[];
    types: number[];
  }>();

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const cartItem = useSelector(selectCartItemById(id || ''));

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    if (!shirts) return;
    const item: CartItem = {
      id: shirts.id,
      title: shirts.title,
      price: shirts.price,
      imageUrl: shirts.imageUrl,
      type: typeNames[activeType],
      size: sizeNames[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  React.useEffect(() => {
    async function fetchShirts() {
      try {
        const { data } = await axios.get(
          'https://659472421493b011606a870c.mockapi.io/items/' + id
        );
        setShirts(data);
      } catch (error) {
        console.log('Fetch error', error);
        navigate('/');
      }
    }
    fetchShirts();
  }, []);

  if (!shirts) return <div className="status">Loading...</div>;

  return (
    <div className="container">
      <div className="product">
        <div className="product__img">
          <img src={shirts.imageUrl} />
        </div>
        <div className="product__description">
          <h2 className="product__title">{shirts.title}</h2>
          <h4>
            Price: <span className="product__price">{shirts.price} €</span>
          </h4>
          <h4>
            Rating:
            <span className="product__price">{shirts.rating} / 100</span>
          </h4>
          <h4>
            Category:
            <span className="product__price">
              {categories[shirts.category]}
            </span>
          </h4>
          <div className="product-block__selector">
            <ul>
              {shirts.types.map((typeId) => (
                <li
                  key={typeId}
                  onClick={() => setActiveType(typeId)}
                  className={activeType === typeId ? 'active' : ''}
                >
                  {typeNames[typeId]}
                </li>
              ))}
            </ul>
            <ul>
              {shirts.sizes.map((sizeId) => (
                <li
                  key={sizeId}
                  onClick={() => setActiveSize(sizeId)}
                  className={activeSize === sizeId ? 'active' : ''}
                >
                  {sizeNames[sizeId]}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add To Cart</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
      <BackButton
        href="/"
        classContainer="button button--black "
        title="Back"
      />
    </div>
  );
};

export default FullShirt;
