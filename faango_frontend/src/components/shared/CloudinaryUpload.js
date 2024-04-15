import { openUploadWidget } from "../../utils/CloudinaryService";
import React, { useEffect, useState } from "react";
import {  backendUrl} from "../../utils/config.js";

const CloudinaryUpload = ({ setUrl, setName }) => {
  const [cloudinaryCloudName, setCloudinaryCloudName] = useState("");
  const [cloudinaryUploadPreset, setCloudinaryUploadPreset] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(backendUrl + "/api/secret");
        const data = await response.json();
        setCloudinaryCloudName(data.secretKey1);
        setCloudinaryUploadPreset(data.secretKey2);
      } catch (error) {
        console.error("Error fetching secret key:", error);
      }
    };

    fetchData();
  }, []);

  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: cloudinaryCloudName,
        uploadPreset: cloudinaryUploadPreset,
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setUrl(result.info.secure_url);
          setName(result.info.original_filename);
          console.log(setUrl);
          console.log(setName);
        } else {
          if (error) {
            console.log(error);
          }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button
      className="bg-white w-40 text-l p-3 flex items-center justify-center cursor-pointer rounded-full font-semibold hover:font-bold transform transition-transform hover:scale-105 mt-4"
      onClick={uploadImageWidget}
    >
      Select Track
    </button>
  );
};

export default CloudinaryUpload;
