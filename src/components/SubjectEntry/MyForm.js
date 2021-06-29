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
    name: yup.string().required(),
    code: yup.string().required().test((code) => !code.includes(' '))
  });

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) =>{
    onSubmit(data);
  }

  useEffect(() => {
    //console.debug(preloadedValues);
    if (preloadedValues) {
      const { name, code} = preloadedValues;
      setValue('name', name);
      setValue('code', code);
      setFocus('code');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadedValues]);

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Form.Group>
        <Form.Label>Subject code</Form.Label>
        <Form.Control
          type="text"
          code="code"
          placeholder="Enter code"
          {...register("code")}
        />
        <p>{errors.code?.message}</p>
      </Form.Group>
      <Form.Group>
        <Form.Label>Subject Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter name"
          {...register("name")}
        />
        <p>{errors.name?.message}</p>
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
