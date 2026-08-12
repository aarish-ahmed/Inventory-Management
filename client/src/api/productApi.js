export const getOneProductApi = async (id) => {
  const res = await fetch(`http://localhost:5000/product/${id}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return { data };
};

export const sellProductApi = async (id, quantity) => {
  const res = await fetch(`http://localhost:5000/product/sell/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      quantity,
    }),
  });
  const data = await res.json();
  return { res, data };
};

export const getProductsApi = async (page) => {
    const res= await fetch(`http://localhost:5000/product/list?page=${page}`,{
      method:'GET',
      credentials:'include',
    })
    const data=await res.json()
    return {res,data}
};