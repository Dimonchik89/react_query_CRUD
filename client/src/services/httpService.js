import axios from "axios";

const getData = async () => {
  const { data } = await axios("http://localhost:3000/todos");
  return data;
};

const updateData = async ({ id, body }) => {
  const { data } = await axios({
    url: `http://localhost:3000/todos/${id}`,
    method: "PATCH",
    data: { ...body },
  });
  return data;
};

const deleteData = async (id) => {
  const { data } = await axios({
    url: `http://localhost:3000/todos/${id}`,
    method: "DELETE",
  });
  return data;
};

const createData = async (body) => {
  const { data } = await axios({
    url: `http://localhost:3000/todos`,
    method: "POST",
    data: body,
  });
  return data;
};

export { getData, updateData, deleteData, createData };
