import { useState } from "react";

export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    ({ target: { name, value } }) => {
      setValues({
        ...values,
        [name]: value
      });
    }
  ];
};
