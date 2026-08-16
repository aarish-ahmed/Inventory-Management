import { API_URL } from "./apiUrl";

export const getOneProductApi = async (id) => {
  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  return { res, data };
};

export const sellProductApi = async (
  id,
  quantity,
  selectedWarehouse
) => {
  const res = await fetch(`${API_URL}/product/sell/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      quantity,
      warehouse: selectedWarehouse,
    }),
  });

  const data = await res.json();

  return { res, data };
};

export const getProductsApi = async (page) => {
  const res = await fetch(`${API_URL}/product/list?page=${page}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  return { res, data };
};

export const searchProductApi = async (query) => {
  const res = await fetch(
    `${API_URL}/product/search?q=${encodeURIComponent(query)}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await res.json();

  return { res, data };
};

export const purchaseProductApi = async (
  id,
  quantity,
  warehouseName,
  supplier,
  unitPrice
) => {
  const res = await fetch(`${API_URL}/product/purchase/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      quantity,
      warehouseName,
      supplier,
      unitPrice,
    }),
  });

  const data = await res.json();

  return { res, data };
};