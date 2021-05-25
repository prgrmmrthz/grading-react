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
        <Form.Label>Product</Form.Label>
        <Form.Control
          type="text"
          name="name"
          readOnly
          {...register("name")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Unit</Form.Label>
        <Form.Control
          type="text"
          name="unit"
          readOnly
          {...register("name")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>QTY on Hand</Form.Label>
        <Form.Control
          type="text"
          name="qty"
          readOnly
          {...register("qty")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Adjust QTY</Form.Label>
        <Form.Control
          type="number"
          name="adjustqty"
          placeholder="Enter QTY to adjust"
          {...register("adjustqty", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
      </Form.Group><Form.Group>
        <Form.Label>Reason</Form.Label>
        <Form.Control
          type="text"
          name="reason"
          placeholder="Enter Reason for Adjustment"
          {...register("reason", { required: true })}
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
