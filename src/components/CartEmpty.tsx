import React from 'react';

import cartEmptyImg from '../assets/img/empty-cart.png';
import BackButton from './BackButton';

export const CartEmpty: React.FC = () => (
  <div className="cart cart--empty">
    <h2>
      Cart is empty <span>😕</span>
    </h2>
    <p>
      Most likely, you haven't ordered our t-shirt yet.
      <br />
      To order, go to the main page.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <BackButton
      classContainer="button button--black"
      href="/"
      title="Go to main page"
    />
  </div>
);
