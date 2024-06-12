import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateData, deleteData } from "../services/httpService";

const Todo = ({ title, completed, id }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateData,
    onSuccess: (data) => {
      //   queryClient.invalidateQueries(["todos"]);
      //   const todos = queryClient.getQueryData(["todos"]);
      //   const finallyData = todos.map((item) => {
      //     if (`${item.id}` !== data.id) {
      //       return item;
      //     } else {
      //       return data;
      //     }
      //   });

      queryClient.setQueryData(["todos"], (oldData) => {
        return oldData.map((item) => {
          if (String(item.id) !== String(data.id)) {
            return item;
          } else {
            return data;
          }
        });
      });
    },
  });
  const deletMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: (data) => {
      const { id } = data;

      queryClient.setQueryData(["todos"], (oldTodos) => {
        return oldTodos.filter((item) => String(item.id) !== String(id));
      });
    },
  });

  return (
    <li>
      <input
        id={id}
        type="checkbox"
        checked={completed}
        onChange={() => {
          mutation.mutate({ id, body: { completed: !completed } });
        }}
      />
      <label htmlFor={id}>{title}</label>
      <button onClick={() => deletMutation.mutate(id)}>X</button>
    </li>
  );
};

export default Todo;
