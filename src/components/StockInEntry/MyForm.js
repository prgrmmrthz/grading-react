import React, { useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function MyForm({ preloadedValues, onSubmit, loading, mode }) {
  const schema = yup.object().shape({
    stockinqty: yup.number().integer().positive().moreThan(0).required()
  });

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) =>{
    onSubmit(data);
    reset();
  }

  const resetForm = (data) =>{
    reset();
  }

  useEffect(() => {
    //console.debug(preloadedValues);
    if (preloadedValues) {
      const { name,barcode,qty,stockinqty } = preloadedValues;
      setValue('name', name);
      setValue('barcode', barcode);
      setValue('qty', qty);
      setValue('stockinqty', stockinqty);
      setFocus('stockinqty');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadedValues]);

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
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
        {loading ? "  Loading..." : `[${mode===1 ? 'NEW' : 'EDIT'}] Submit`}
      </Button> &nbsp;
      <Button size="sm" variant="secondary" onClick={()=> resetForm()}>
        Reset
      </Button>
    </Form>
  );
}
