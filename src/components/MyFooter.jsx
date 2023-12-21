import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const MyFooter = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <Container>
        <Row>
          <Col>
            <p>&copy; 2023 Libreria Nyarlathotep</p>
            <p>Contact: info@example.com</p>
            <blockquote>
  <p>«E su tutto, in questo ripugnante cimitero dell'universo, si ode un sordo e pazzesco rullìo di tamburi, un sottile e monotono lamento di flauti blasfemi che giungono da stanze inconcepibili, senza luce, di là dal Tempo; la detestabile cacofonia al cui ritmo danzano lenti, goffi e assurdi, i giganteschi, tenebrosi ultimi dèi. Le cieche, mute, stolide abominazioni la cui anima è Nyarlathotep.»
<br />
<span> (H. P. Lovecraft, Nyarlathotep)</span></p>
</blockquote>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
