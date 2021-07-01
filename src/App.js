import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Cart from './components/Cart'
import Items from './components/Items'



function App() {
  const [routes] = useState({
    HOME: '/',
    CART: '/cart'
  });
  const [links] = useState({
    HOME: 'Home',
    CART: 'Cart'
  });

  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [options, setOptions] = useState([]);

  const [cartQuantities, setCartQuantities] = useState([]);
  // const [cartOptions, setCartOptions] = useState([]);

  // Initialize Item state
  useEffect(() => {
    const getItems = async () => {
      const itemsFromServer = await fetchItems();
      setItems(itemsFromServer);
    }

    getItems();
  }, []);

  // Initialize Item Quantity <select> value state
  useEffect(() => {
    const qtys = {};
    for (const item of items) {
      qtys[item.id] = 1;
    };
    setQuantities(qtys);
  }, [items]);

  // Initialize Item Options <select> list state
  useEffect(() => {
    const newOptions = [];
    for (let i = 1; i <= 100; i++) {
      newOptions.push(i);
    }
    setOptions(newOptions);
  }, []);

  // Fetch Items from backend
  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/items');
    const data = await res.json();

    return data;
  }

  // Find item object from items array
  const findItem = (itemId) => {
    const item = items.find(item => {
      return item.id === itemId;
    });
    return item;
  }

  // Find cart { item, count } object from cartQuantities
  const findCartObj = (item) => {
    const cartIndex = cartQuantities.findIndex(cartQuantity => {
      return cartQuantity.item === item;
    });
    const cartObj = cartIndex >= 0 ? cartQuantities[cartIndex] : {};
    return { cartObj, cartIndex };
  }

  // Add Item to cart
  const addToCart = (itemId, itemCount) => {
    // Isolate item object from items array
    const item = findItem(itemId);
    // Isolate cart item from cartQuantities
    // Creates new item object if not found
    const { cartObj, cartIndex } = findCartObj(item);

    // Copies cartQuantities while replacing any existing reference in the same slot
    const newCartQuantities = [ ...cartQuantities ];
    if (cartObj.count) {
      cartObj.count += itemCount;
      newCartQuantities.splice(cartIndex, 1, cartObj);
    } else {
      cartObj.item = item;
      cartObj.count = itemCount;
      newCartQuantities.push(cartObj);
    }
    
    setCartQuantities(newCartQuantities);
  }

  // Change Item quantity in Cart
  const changeCartQuantity = (itemId, itemCount) => {
    const item = findItem(itemId);
    const { cartObj, cartIndex } = findCartObj(item);
    const newCartQuantities = [ ...cartQuantities ];
    if (itemCount) {
      cartObj.count = itemCount;
      newCartQuantities.splice(cartIndex, 1, cartObj);
    } else {
      newCartQuantities.splice(cartIndex, 1);
    }

    setCartQuantities(newCartQuantities);
  }

  // Number of items in cart
  const nCart = () => {
    let count = 0;
    for (const cartItem of cartQuantities) {
      count += cartItem.count;
    }
    return count;
  }

  // subtotal cost of items in Cart
  // const subTotal = () {
  //   console.log('recalculating cost');
  //   const subT = 0;
  //   for (const [ item ] of cart) {
  //       console.log(item);
  //   }
  //   return true;
  // }

  return (
    <Router>
      <div className="container">
        <Header links={links} routes={routes} nCart={nCart} />
        <Route path='/' exact render={(props) => (<Home />)} />
        <Route path='/cart' render={(props) => (<CartPage />)} />
      </div>
    </Router>
  );

  function Home() {
    return (
      <>
        {items.length > 0 ? <Items items={items} addToCart={addToCart} options={options} quantities={quantities} setQuantities={setQuantities} /> : 'No Items To Show'}
      </>
    )
  }

  function CartPage() {
    return (
      <>
        {nCart() > 0 ? <Cart cart={cartQuantities} changeCartQuantity={changeCartQuantity} /> : 'No Items in Cart'}
      </>
    )
  }
}


export default App;
