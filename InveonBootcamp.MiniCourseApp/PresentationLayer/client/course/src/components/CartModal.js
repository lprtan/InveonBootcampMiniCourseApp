import React from "react";
import { Modal, Button } from "react-bootstrap";

function CartModal({ show, handleClose, cartItems, handleRemoveFromCart, handleConfirmCart }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sepetiniz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h5>{item.title}</h5>
              <p>
                <strong>Fiyat:</strong> {item.price.toFixed(2)} TL
              </p>
              <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
                Sepetten Çıkar
              </Button>
            </div>
          ))
        ) : (
          <p>Sepetiniz boş.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Kapat
        </Button>
        <Button variant="success" onClick={handleConfirmCart}>
          Sepeti Onayla
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
