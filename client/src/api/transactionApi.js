
export const getTransaction = async (setTransaction) => {
    const res= await fetch('http://localhost:5000/transaction/list',{
          method:'GET',
          credentials:'include',
        })
        const data=await  res.json()
        if(res.ok){
          setTransaction(data)
        console.log(data)
        }
        else{
          console.log(data.message)
          
         
        }
      
};

export const getTransactionReceiptApi = async (id) => {
  const res = await fetch(
    `http://localhost:5000/transaction/receipt/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return res;
};

