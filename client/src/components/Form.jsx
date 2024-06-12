import React from "react";
import { createData } from "../services/httpService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Form = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createData,
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["todos"])  делается повторные запрос с указанным тегом
      // const oldData = queryClient.getQueryData(["todos"]); // получаем старыне данныфе их кеша по тегу
      queryClient.setQueryData(["todos"], (oldTodos) => [...oldTodos, data]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.currentTarget.elements.title;
    mutation.mutate({ title: title.value, completed: false });
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="title" />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
