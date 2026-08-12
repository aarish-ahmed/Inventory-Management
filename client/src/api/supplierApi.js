export const getSupplierList = async (setSupplier,setMessage) => {
    const res= await fetch('http://localhost:5000/supplier/list',{
        method:'GET',
        credentials:'include',
      })
      const data=await  res.json()
     if(res.ok){
       setSupplier(data)
      console.log(data)
     }
     else{
      console.log(data.message)
      setMessage(data.message)
     }
};


export const createSupplier = async (supplierData) => {
  const res = await fetch("http://localhost:5000/supplier/add", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplierData),
  });

  const data = await res.json();

  return {
    ok: res.ok,
    data,
  };
};