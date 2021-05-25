import React from "react";
import {
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function MyForm({preloadedValues, onSubmit, loading}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
      defaultValues: preloadedValues
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Supplier Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter Supplier Name"
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        {loading && (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
        {loading ? "  Loading..." : "  Submit"}
      </Button>
    </Form>
  );
}
