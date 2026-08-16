import { API_URL } from "./apiUrl";

export const signupApi = async (userData) => {
  const res = await fetch(`${API_URL}/user/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  return { res, data };
};

export const sendOtpApi = async (email) => {
  const res = await fetch(`${API_URL}/user/otp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  const data = await res.json();

  return { res, data };
};

export const resetPasswordApi = async (userData) => {
  const res = await fetch(`${API_URL}/user/reset-password`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  return { res, data };
};

export const loginApi = async (userData) => {
  const res = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  return { res, data };
};

export const enterOtpApi = async (userData) => {
  const res = await fetch(`${API_URL}/user/verify-otp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  return { res, data };
};

export const dashboardApi = async () => {
  const res = await fetch(`${API_URL}/user/dashboard`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  console.log("dashboard data", data);

  return { res, data };
};

export const verifyEmailApi = async (userData) => {
  const res = await fetch(`${API_URL}/user/verify-email`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  return { res, data };
};

export const getCurrentUserApi = async () => {
  const res = await fetch(`${API_URL}/user/me`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return { data };
};

export const addMemberApi = async (memberData) => {
  const res = await fetch(`${API_URL}/user/add-member`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(memberData),
  });

  const data = await res.json();

  console.log("addmemberdata", data);

  if (!res.ok) {
    throw new Error(data.message);
  }

  return { res, data };
};

export const getAllUserApi = async () => {
  const res = await fetch(`${API_URL}/user/all`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  console.log("getAlluser", data);

  if (!res.ok) {
    throw new Error(data.message);
  }

  return { data };
};

export const deleteUserApi = async (userId) => {
  const res = await fetch(`${API_URL}/user/delete/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();

  console.log("deleteUser", data);

  if (!res.ok) {
    throw new Error(data.message);
  }

  return { res, data };
};