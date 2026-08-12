export const signupApi= async (userData) => {
  const res = await fetch("http://localhost:5000/user/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data=await res.json()
  return  {res,data};
};

export const sendOtpApi = async (email) => {
    const res=await fetch('http://localhost:5000/user/otp',{
            method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),})
      const data=await res.json()
      return {res,data}
};

export const resetPasswordApi = async (userData) => {
    const res=await fetch('http://localhost:5000/user/reset-password',{
            method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData)
        })
        const data =await res.json()
        return {res,data}
};

export const loginApi = async (userData) => {
    const res = await fetch('http://localhost:5000/user/login',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(userData)
    })
    
    const data = await res.json()
    return {res,data}
};
export const enterOtpApi = async (userData) => {
    const res=await fetch('http://localhost:5000/user/verify-otp',{
            method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
        })
        const data=await res.json()
        return {res,data}
};

export const dashboardApi = async () => {
    const res = await fetch('http://localhost:5000/user/dashboard',{
      method: 'GET',
      credentials: 'include',
    })
    const data = await res.json()
    return {res,data}
};

export const verifyEmailApi = async (userData) => {
    const res = await fetch("http://localhost:5000/user/verify-email", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data= await res.json()
    return {res,data}
};

export const getCurrentUserApi = async () => {
  const res = await fetch("http://localhost:5000/user/me", {
    method: "GET",
    credentials: "include",
  });

  
    const data = await res.json();
    console.log('api data',data)
  

  if (!res.ok) {
    throw new Error(data.message);
  }

  return {data};
};