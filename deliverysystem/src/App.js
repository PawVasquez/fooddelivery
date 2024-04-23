import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge, Form, FormControl, Modal, Dropdown, Navbar, Nav } from 'react-bootstrap';
import './App.css';

const FoodItem = ({ item, addToCart }) => {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={item.image} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Card.Text>Price: ${item.price}</Card.Text>
        <Button onClick={() => addToCart(item)}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

const Cart = ({ cartItems, saveOrder }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    saveOrder(cartItems);
  };

  return (
    <div>
      <h2>Cart</h2>
      <ListGroup>
        {cartItems.map((item, index) => (
          <ListGroup.Item key={index}>
            {item.name} - ${item.price} <Badge variant="primary">{item.quantity}</Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <p>Total: ${totalPrice}</p>
      <Button variant="success" onClick={handleCheckout}>Checkout</Button>
    </div>
  );
};

const Order = ({ order, index, deleteOrder, updateOrderStatus }) => {
  const [editMode, setEditMode] = useState(false);

  const handleStatusChange = (status) => {
    updateOrderStatus(index, status);
  };

  const handleEditModeToggle = () => {
    setEditMode(!editMode);
  };

  return (
    <ListGroup.Item key={index}>
      {order.items.map((item, idx) => (
        <span key={idx}>
          {item.name} - ${item.price} <Badge variant="primary">{item.quantity}</Badge><br />
        </span>
      ))}
      <p>Total: ${order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
      <Dropdown>
        <Dropdown.Toggle variant="secondary">
          {order.status}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleStatusChange('Preparing')}>Preparing</Dropdown.Item>
          <Dropdown.Item onClick={() => handleStatusChange('On the way')}>On the way</Dropdown.Item>
          <Dropdown.Item onClick={() => handleStatusChange('Delivered')}>Delivered</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button variant="primary" onClick={handleEditModeToggle}>
        {editMode ? 'Save' : 'Edit'}
      </Button>
      <Button variant="danger" onClick={() => deleteOrder(index)}>Delete</Button>
    </ListGroup.Item>
  );
};

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const saveOrder = (items) => {
    setOrders([...orders, { items, status: 'Preparing' }]);
    setCartItems([]);
  };

  const updateOrderStatus = (index, status) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = status;
    setOrders(updatedOrders);
  };

  const deleteOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
  };

  // Predefined food data
  const foodItems = [
    { name: 'Pizza', description: 'Delicious pizza with toppings', image: 'pizza.jpg', price: 10 },
    { name: 'Burger', description: 'Juicy burger with cheese and veggies', image: 'burger.jpg', price: 8 },
    // Add more food items here
  ];

  // Predefined cold drinks data
  const coldDrinks = [
    { name: 'Iced Tea', description: 'Refreshing iced tea', image: 'tea.jpg', price: 2.5 },
    // Add more cold drinks items here
  ];

  // Predefined hot drinks data
  const hotDrinks = [
    { name: 'Coffee', description: 'Hot coffee', image: 'coffee.jpg', price: 3 },
    // Add more hot drinks items here
  ];

  // Predefined desserts data
  const desserts = [
    { name: 'Chocolate Cake', description: 'Decadent chocolate cake', image: 'cake.jpg', price: 5 },
    // Add more desserts items here
  ];

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Food Delivery</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Row>
        <Col>
          <h1>Food Delivery System</h1>
          <Row>
            {foodItems.map((item, index) => (
              <FoodItem key={index} item={item} addToCart={addToCart} />
            ))}
          </Row>
        </Col>
        <Col>
          <h2>Cold Drinks</h2>
          <Row>
            {coldDrinks.map((item, index) => (
              <FoodItem key={index} item={item} addToCart={addToCart} />
            ))}
          </Row>
        </Col>
        <Col>
          <h2>Hot Drinks</h2>
          <Row>
            {hotDrinks.map((item, index) => (
              <FoodItem key={index} item={item} addToCart={addToCart} />
            ))}
          </Row>
        </Col>
        <Col>
          <h2>Desserts</h2>
          <Row>
            {desserts.map((item, index) => (
              <FoodItem key={index} item={item} addToCart={addToCart} />
            ))}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Cart cartItems={cartItems} saveOrder={saveOrder} />
          <Button variant="primary" onClick={handleShowModal}>
            Show Order Summary
          </Button>
          <Modal show={showModal} onHide={handleCloseModal}>
            {/* Render modal for order summary */}
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Orders</h2>
          <ListGroup>
            {orders.map((order, index) => (
              <Order key={index} order={order} index={index} deleteOrder={deleteOrder} updateOrderStatus={updateOrderStatus} />
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
