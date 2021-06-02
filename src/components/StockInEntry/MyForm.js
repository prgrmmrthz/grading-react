import React, { useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function MyForm({ preloadedValues, onSubmit, loading }) {
  const schema = yup.object().shape({
    stockinqty: yup.number().integer().positive().moreThan(0).required()
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    //console.debug(preloadedValues);
    if (preloadedValues) {
      const { name,barcode,qty } = preloadedValues;
      setValue('name', name);
      setValue('barcode', barcode);
      setValue('qty', qty);
      setValue('stockinqty', 0);
    }
  }, [preloadedValues]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Product</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          name="name"
          readOnly
          {...register("name")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Barcode</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          name="barcode"
          readOnly
          {...register("barcode")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>QTY on hand</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          name="qty"
          readOnly
          {...register("qty")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>StockIn QTY</Form.Label>
        <Form.Control
          type="number"
          name="stockinqty"
          placeholder="Enter QTY to stock"
          {...register("stockinqty")}
        />
        <p>{errors.stockinqty?.message}</p>
      </Form.Group>
      <Button size="sm" variant="primary" type="submit" disabled={loading}>
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
