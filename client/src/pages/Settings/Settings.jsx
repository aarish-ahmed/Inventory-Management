import { useEffect, useState } from "react";
import { addMemberApi, deleteUserApi, getAllUserApi } from "../../api/userApi";

const Settings = () => {
  const [allUser, setAllUser] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "staff",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { res, data } = await addMemberApi(formData);

    if (res.ok) {
      setAllUser(data);

      setFormData({
        username: "",
        email: "",
        password: "",
        role: "staff",
      });

      setMessage("Member added successfully");
      setShowAddForm(false);
    } else {
      setMessage(data.message);
    }
  };

  const getAllUser = async () => {
    const { data } = await getAllUserApi();
    setAllUser(data);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleDeleteUser = async (userId) => {
  try {
    const { res,data } = await deleteUserApi(userId);

    if(res.ok){
      console.log(data.message);

    // Remove deleted user from frontend immediately
    setAllUser((prevUsers) =>
      prevUsers.filter((user) => user._id !== userId)
    );
    }
    
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      {/* PAGE HEADER */}

      <div className="max-w-7xl mx-auto mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage members and their roles
        </p>

      </div>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">


        {/* =========================
            LEFT SIDE - ADD MEMBER
        ========================= */}

        <div>

          {!showAddForm ? (

            <button
              type="button"
              onClick={() => {
                setShowAddForm(true);
                setMessage("");
              }}
              className="
                px-6
                py-3
                bg-green-500
                text-white
                font-semibold
                rounded-lg
                hover:bg-green-600
                transition
                cursor-pointer
              "
            >
              + Add Member
            </button>

          ) : (

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-7">

              {/* FORM HEADER */}

              <div className="flex items-start justify-between mb-6">

                <div>

                  <h2 className="text-xl font-bold text-gray-800">
                    Add Member
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Create a new user account
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setMessage("");
                  }}
                  className="
                    text-gray-400
                    hover:text-gray-700
                    text-2xl
                    font-bold
                    cursor-pointer
                    leading-none
                  "
                >
                  ×
                </button>

              </div>


              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >

                {/* NAME */}

                <div className="flex flex-col gap-2">

                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="username"
                    placeholder="Enter name"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      px-4
                      py-3
                      border
                      border-gray-300
                      rounded-lg
                      outline-none
                      focus:border-green-500
                      focus:ring-1
                      focus:ring-green-500
                    "
                  />

                </div>


                {/* EMAIL */}

                <div className="flex flex-col gap-2">

                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      px-4
                      py-3
                      border
                      border-gray-300
                      rounded-lg
                      outline-none
                      focus:border-green-500
                      focus:ring-1
                      focus:ring-green-500
                    "
                  />

                </div>


                {/* PASSWORD */}

                <div className="flex flex-col gap-2">

                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      px-4
                      py-3
                      border
                      border-gray-300
                      rounded-lg
                      outline-none
                      focus:border-green-500
                      focus:ring-1
                      focus:ring-green-500
                    "
                  />

                </div>


                {/* ROLE */}

                <div className="flex flex-col gap-2">

                  <label
                    htmlFor="role"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Role
                  </label>

                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="
                      w-full
                      px-4
                      py-3
                      border
                      border-gray-300
                      rounded-lg
                      outline-none
                      focus:border-green-500
                      focus:ring-1
                      focus:ring-green-500
                      bg-white
                    "
                  >

                    <option value="staff">
                      Staff
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </select>

                </div>


                {/* MESSAGE */}

                {message && (
                  <p className="text-sm text-gray-600">
                    {message}
                  </p>
                )}


                {/* BUTTONS */}

                <div className="flex gap-3">

                  <button
                    type="submit"
                    className="
                      flex-1
                      bg-green-500
                      text-white
                      py-3
                      rounded-lg
                      font-semibold
                      hover:bg-green-600
                      transition
                      cursor-pointer
                    "
                  >
                    Add Member
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setMessage("");
                    }}
                    className="
                      px-5
                      py-3
                      bg-gray-200
                      text-gray-700
                      rounded-lg
                      font-semibold
                      hover:bg-gray-300
                      transition
                      cursor-pointer
                    "
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          )}

        </div>


        {/* =========================
            RIGHT SIDE - MEMBERS
        ========================= */}

        <div className="lg:col-span-2">

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            {/* HEADER */}

            <div className="px-7 py-6 border-b border-gray-200">

              <h2 className="text-xl font-bold text-gray-800">
                Members
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Manage system users
              </p>

            </div>


            {/* TABLE HEADER */}

            <div
              className="
                grid
                grid-cols-[1fr_1.6fr_0.9fr_0.9fr]
                items-center
                bg-gray-800
                text-white
                px-7
                py-4
                text-sm
                font-semibold
              "
            >

              <div>
                Name
              </div>

              <div>
                Email
              </div>

              <div className="pl-5">
                Role
              </div>

              <div className="text-center">
                Actions
              </div>

            </div>


            {/* USERS */}

            <div>

              {allUser.length === 0 ? (

                <div className="px-7 py-10 text-center text-gray-500">
                  No members found.
                </div>

              ) : (

                allUser.map((user) => (

                  <div
                    key={user._id}
                    className="
                      grid
                      grid-cols-[1fr_1.6fr_0.9fr_0.9fr]
                      items-center
                      px-7
                      py-5
                      border-b
                      border-gray-200
                      last:border-b-0
                      hover:bg-gray-50
                      transition
                    "
                  >

                    {/* NAME */}

                    <div className="font-semibold text-gray-800 truncate pr-4">
                      {user.username}
                    </div>


                    {/* EMAIL */}

                    <div className="text-gray-600 truncate pr-4">
                      {user.email}
                    </div>


                    {/* ROLE */}

                    <div className="pl-5">

                      <span
                        className={`
                          inline-block
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          capitalize
                          ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-green-100 text-green-700"
                          }
                        `}
                      >
                        {user.role}
                      </span>

                    </div>


                    {/* ACTION */}

                    <div className="flex justify-center">

                      <button
                        type="button"
                        className="
                          px-4
                          py-2
                          bg-red-100
                         
                          text-medium
                          text-red-400
                          font-semibold
                          rounded-md
                          hover:bg-red-400
                          hover:text-white
                          transition
                          cursor-pointer
                        " onClick={(()=>handleDeleteUser(user._id))}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Settings;