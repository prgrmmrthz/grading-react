import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function MyForm({ preloadedValues, onSubmit, loading }) {
  const schema = yup.object().shape({
    qty: yup.number().integer().required(),
    reason: yup.string().min(4).max(50).required(),
    adjustqty: yup.number().integer().required().when('qty', (qty, schema) => {
      return schema.test({
        test: adjustqty => adjustqty < 0 ? Math.abs(adjustqty) <= qty : adjustqty > 0
      })
    })
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedValues,
    resolver: yupResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Product</Form.Label>
        <Form.Control type="text" name="name" readOnly {...register("name")} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Unit</Form.Label>
        <Form.Control type="text" name="unit" readOnly {...register("unit")} />
      </Form.Group>
      <Form.Group>
        <Form.Label>QTY on Hand</Form.Label>
        <Form.Control type="text" name="qty" readOnly {...register("qty")} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Adjust QTY (use negative(-) to remove stock)</Form.Label>
        <Form.Control
          type="number"
          name="adjustqty"
          placeholder="Enter QTY to adjust"
          {...register("adjustqty")}
        />
        <p>{errors.adjustqty?.message}</p>
      </Form.Group>
      <Form.Group>
        <Form.Label>Reason</Form.Label>
        <Form.Control
          type="text"
          name="reason"
          placeholder="Enter Reason for Adjustment"
          {...register("reason")}
        />
        <p>{errors.reason?.message}</p>
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
