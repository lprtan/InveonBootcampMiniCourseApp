import axios from "axios";
import { Modal, Button, Alert } from "react-bootstrap";
import { useState } from "react";

function CartModal({ show, handleClose, cartItems, handleRemoveFromCart, handleConfirmCart }) {
  const [successMessage, setSuccessMessage] = useState("");

  const confirmCartHandler = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Token bulunamadı.");
      }

      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedToken = JSON.parse(atob(base64));

      const email = decodedToken.email;

      const courseId = cartItems[0]?.id;

      const response = await axios.post(
        `https://localhost:7037/api/UserCourse?email=${email}&courseId=${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API cevabı:", response.data);

      setSuccessMessage("Ürün başarıyla satın alındı!");

      handleRemoveFromCart(cartItems[0]?.id);

    } catch (error) {
      console.error("Hata:", error.response ? error.response.data : error.message);
      setSuccessMessage("Satın alma işlemi sırasında bir hata oluştu.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sepetiniz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
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
        <Button variant="success" onClick={confirmCartHandler}>
          Sepeti Onayla
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
