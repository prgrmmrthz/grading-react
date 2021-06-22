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
    lrn: yup.string().required(),
    name: yup.string().required(),
    sex: yup.string().required(),
    birthday: yup.date().max(new Date())
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
  }

  useEffect(() => {
    //console.debug(preloadedValues);
    if (preloadedValues) {
      const { lrn, name, sex, birthday } = preloadedValues;
      setValue('lrn', lrn);
      setValue('name', name);
      setValue('sex', sex);
      setValue('birthday', birthday);
      setFocus('lrn');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadedValues]);

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Form.Group>
        <Form.Label>LRN</Form.Label>
        <Form.Control
          type="text"
          name="lrn"
          placeholder="Enter lrn"
          {...register("lrn")}
        />
        <p>{errors.lrn?.message}</p>
      </Form.Group>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter name"
          {...register("name")}
        />
        <p>{errors.name?.message}</p>
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          name="birthday"
          placeholder="Enter birthday"
          {...register("birthday")}
        />
        <p>{errors.birthday?.message}</p>
      </Form.Group>
      <Form.Group>
        <Form.Label>Sex</Form.Label>
        <Form.Control as="select" {...register("sex")}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Form.Control>
        <p>{errors.sex?.message}</p>
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
