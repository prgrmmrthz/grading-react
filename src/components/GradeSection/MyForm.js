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
    grade: yup.string().required(),
    section: yup.string().required()
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
      const { grade, section } = preloadedValues;
      setValue('grade', grade);
      setValue('section', section);
      setFocus('grade');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadedValues]);

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Form.Group>
        <Form.Label>grade</Form.Label>
        <Form.Control
          type="text"
          name="grade"
          placeholder="Enter grade"
          {...register("grade")}
        />
        <p>{errors.grade?.message}</p>
      </Form.Group>
      <Form.Group>
        <Form.Label>section</Form.Label>
        <Form.Control
          type="text"
          name="section"
          placeholder="Enter section"
          {...register("section")}
        />
        <p>{errors.section?.message}</p>
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
