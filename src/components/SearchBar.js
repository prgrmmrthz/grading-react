import React from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

export default function SearchBar({handleSearch, placeholder}) {
  return (
    <Form onSubmit={(event) =>handleSearch(event)}>
      <Form.Group controlId="formBasicEmail">
        <InputGroup className="mb-3">
          <FormControl placeholder={placeholder} />
          <InputGroup.Append>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    </Form>
  );
}
