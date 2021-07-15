import { useState } from 'react';

import Header from './components/layout/Header';
import Meals from './components/meals/Meals';
import Cart from './components/cart/Cart';

function App() {
  const [cartIsShow, setCartIsShow] = useState(false);

  const showCartHandler = () => {
    setCartIsShow(true);
  }

  const hideCartHandler = () => {
    setCartIsShow(false);
  }

  return (
    <>
      {
        cartIsShow && <Cart onClose={hideCartHandler} />
      }
      <Header onShowCart={showCartHandler} />
      <Meals />
    </>
  );
}

export default App;