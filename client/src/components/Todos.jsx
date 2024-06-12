import React, { useEffect } from "react";
import { getData } from "../services/httpService";
import { useQuery } from "@tanstack/react-query";
import Todo from "./Todo";

const Todos = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getData,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  const container = data?.map((item) => <Todo key={item.id} {...item} />);

  return <ul>{container}</ul>;
};

export default Todos;
