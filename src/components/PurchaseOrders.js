import React from "react";
import { Card, Button, Container, Row, Col, Form, InputGroup, FormControl } from "react-bootstrap";

export default function PurchaseOrders() {
  return (
    <div>
      <Card className="text-center">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>
            <Container>
              <Row>
                <Col>
                  <Button variant="primary">Go somewhere</Button>
                </Col>
                <Col>
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <InputGroup className="mb-3">
                        <FormControl
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="basic-addon2">
                            @example.com
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
