import React, { useEffect, useRef, useState } from "react";
import defaultProfileImg from "../assets/images/amiri3.jpg";
import axios from "axios";
import { useFormik } from "formik";

function Profile() {
  const fileInputRef = useRef(null);
  const [profileImg, setProfileImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(defaultProfileImg);
  // console.log("preview images",previewImg);
  
  let token = localStorage.getItem("user_token");
  const userProfile = JSON.parse(localStorage.getItem("getUserProfile"));
    // console.log('image==>',userProfile.profileImg);
    
  
  const userId = userProfile?._id;
  const [editId, setEditId] = useState(null);
  const [initialValues, setInitialValues] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState([]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImg(imageUrl);
      setSelectedFile(file);
      console.log("Selected file:", file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImg(defaultProfileImg); 
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  const formik = useFormik({
    initialValues: {
      _id: userProfile?._id || "",
      firstname: userProfile?.firstname || "",
      lastname: userProfile?.lastname || "",
      email: userProfile?.email || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("form values==>", values);
      userUpdate(values._id, values, selectedFile);
      setEditId(null);
    },
  });

  const userUpdate = async (id, values, file) => {
    const formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("email", values.email);

    if (file) {
      formData.append("profileImg", file);
    }

    try {
      let res = await axios.patch(
        "http://localhost:3000/users/update/" + id,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("user profile update ==>", res.data.data);
      const updatedUser = res.data.data;
      if (updatedUser.profileImg) {
        const fullImageUrl = `http://localhost:3000/images/${updatedUser.profileImg}`;
        // uploads
        console.log("full image url==>",fullImageUrl);
        
        setPreviewImg(fullImageUrl);
      }
      localStorage.setItem("getUserProfile", JSON.stringify(updatedUser));
      // window.location.reload();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="container">
          <div class="card p-3 user-main">
            <div className="user-profile container">
              <h1 className="underline-short">User Profile</h1>
              <div className="d-flex">
                <div className="img-content">
                  <img src={previewImg} alt="" />
                </div>
                <div className="user-cnt w-25 ms-3">
                  <h3 className="fw-bold">
                    {userProfile
                      ? `${userProfile.firstname} ${userProfile.lastname}`
                      : "User Name"}
                  </h3>
                  <div className="upload-btn d-flex">
                    <div className="w-50">
                      <div>
                        <button
                          className="btn btn-primary"
                          style={{ width: "180px" }}
                          onClick={handleButtonClick}
                        >
                          Upload New Image
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                    <div className="w-50" style={{ marginLeft: "55px" }}>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleRemoveImage}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit} className="d-flex">
                <div className="w-50">
                  <label className="mb-2">User ID:</label>
                  <input
                    type="text"
                    name="_id"
                    onChange={formik.handleChange}
                    value={formik.values?._id}
                  />
                  <label className="mt-2 mb-2">First Name:</label>
                  <input
                    type="text"
                    name="firstname"
                    onChange={formik.handleChange}
                    value={formik.values?.firstname}
                  />
                  <button
                    type="submit"
                    class="btn btn-primary mt-4"
                    // onClick={() => {
                    //   setEditId(userProfile?._id);
                    //   setInitialValues({
                    //     firstname: userProfile?.firstname,
                    //     lastname: userProfile?.lastname,
                    //     email: userProfile?.email,
                    //   });
                    // }}
                  >
                    SAVE CHANGES
                  </button>
                </div>
                <div className="w-50 ms-2 ">
                  <label className="mb-2">Last Name:</label>
                  <input
                    type="text"
                    name="lastname"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                  />
                  <label className="mt-2 mb-2">Email:</label>
                  <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
