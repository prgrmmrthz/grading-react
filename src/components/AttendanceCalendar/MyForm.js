import React, {useEffect} from "react";
import {
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function MyForm({preloadedValues, onSubmit, loading}) {
  const schema = yup.object().shape({
    month: yup.string().required(),
    schooldays: yup.number().integer().positive().moreThan(0).required()
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

  useEffect(() => {
    //console.debug(preloadedValues);
    if (preloadedValues) {
      const { month, schooldays } = preloadedValues;
      setValue('month', month);
      setValue('schooldays', schooldays);
      setFocus('month');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadedValues]);

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Form.Group>
        <Form.Label>Month</Form.Label>
        <Form.Control
          type="text"
          name="month"
          placeholder="Enter Month"
          {...register("month")}
        />
        <p>{errors.month?.message}</p>
      </Form.Group>
      <Form.Group>
        <Form.Label>School days</Form.Label>
        <Form.Control
          type="number"
          name="schooldays"
          placeholder="Enter school days"
          {...register("schooldays")}
        />
        <p>{errors.schooldays?.message}</p>
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
