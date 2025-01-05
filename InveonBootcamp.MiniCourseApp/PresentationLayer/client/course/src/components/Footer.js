import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col sm={12} md={4}>
            <h5>Hakkımızda</h5>
            <p>MyCourse platformu, kullanıcıların online kurslara erişebileceği bir eğitim platformudur.</p>
          </Col>
          <Col className ="footer-content" sm={12} md={4}>
            <h5>İletişim</h5>
            <p>Email: alpereentan@gmail.com</p>
            <p>Telefon: +90 5446885212</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
