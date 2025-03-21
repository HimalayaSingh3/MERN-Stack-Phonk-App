import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

function Admin() {
  const [phonks, setPhonks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    image: null,
    music: null,
  });

  useEffect(() => {
    const fetchPhonks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/admin/get-phonks"
        );
        setPhonks(response.data.data);
      } catch (error) {
        console.error("Error fetching phonks:", error);
      }
    };

    fetchPhonks();
  }, []);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] || null : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.artist || !formData.image || !formData.music) {
      alert("All fields, including audio and image files, are required!");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("artist", formData.artist);
    data.append("frontImage", formData.image);
    data.append("audioFile", formData.music);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/admin/add-phonk",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setPhonks([...phonks, response.data.data]);
      setFormData({ title: "", artist: "", image: null, music: null });
    } catch (error) {
      console.error("Error adding phonk:", error);
      alert("Failed to add phonk. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/admin/delete-phonk/${id}`
      );
      setPhonks(phonks.filter((phonk) => phonk._id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting phonk:", error);
      alert("Failed to delete phonk.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-red-100">
      <div className="absolute right-10 flex gap-4">
        <Link to="/profile">
          <button className="cursor-pointer text-white bg-green-500 p-2 px-4 rounded-lg">
            Profile
          </button>
        </Link>
      </div>

      <div className="absolute left-10">
        <Drawer>
          <DrawerTrigger asChild>
            <button className="cursor-pointer p-2 rounded-lg bg-purple-700 text-white font-semibold">
              Add Phonk
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Admin</DrawerTitle>
                <DrawerDescription>Add a new phonk.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex flex-col space-y-2">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="p-4 border outline-0 rounded-sm w-full"
                    required
                  />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter Title..."
                    className="p-2 border outline-0 rounded-sm w-full"
                    required
                  />
                  <input
                    type="text"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    placeholder="Enter Artist Name..."
                    className="p-2 border outline-0 rounded-sm w-full"
                    required
                  />
                  <input
                    type="file"
                    name="music"
                    accept="audio/*"
                    onChange={handleChange}
                    className="p-4 border outline-0 rounded-sm w-full"
                    required
                  />
                </div>
              </div>
              <DrawerFooter>
                <button
                  onClick={handleSubmit}
                  className="bg-purple-700 text-white p-2 rounded-lg cursor-pointer w-full"
                >
                  Submit
                </button>
                <DrawerClose asChild>
                  <button className="bg-red-600 text-white p-2 rounded-lg cursor-pointer w-full">
                    Cancel
                  </button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {phonks.length > 0 ? (
          phonks.map((item) => (
            <div
              key={item._id}
              className="h-full text-center bg-white w-full sm:w-68 p-6 flex flex-col items-center shadow-xl"
            >
              <img
                src={item.frontImage} // ✅ Use Cloudinary URL directly
                alt={item.title}
                className="w-48 object-cover rounded-lg"
                onError={(e) => (e.target.src = "fallback-image-url.jpg")}
              />
              <h1 className="text-lg mt-2 font-semibold">{item.title}</h1>
              <p className="text-xs mt-2 text-gray-600">{item.artist}</p>
              <audio controls className="mt-2 w-full">
                <source
                  src={item.audioFile} // ✅ Use Cloudinary URL directly
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
              <button
                onClick={() => handleDelete(item._id)}
                className="mt-2 py-2 px-6 w-full bg-red-700 cursor-pointer text-white"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <h1 className="text-center text-gray-500">No Phonks added yet</h1>
        )}
      </div>
    </div>
  );
}

export default Admin;
