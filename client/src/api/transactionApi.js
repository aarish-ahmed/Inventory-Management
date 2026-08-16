import { API_URL } from "./apiUrl";

export const getTransaction = async (setTransaction) => {
  const res = await fetch(`${API_URL}/transaction/list`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (res.ok) {
    setTransaction(data);
    console.log(data);
  } else {
    console.log(data.message);
  }
};

export const getTransactionReceiptApi = async (id) => {
  const res = await fetch(`${API_URL}/transaction/receipt/${id}`, {
    method: "GET",
    credentials: "include",
  });

  return res;
};