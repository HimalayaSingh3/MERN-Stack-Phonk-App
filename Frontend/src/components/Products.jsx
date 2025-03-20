import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [phonks, setPhonks] = useState([]);

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

  return (
    <div className="p-10 bg-red-200 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {phonks.length > 0 ? (
          phonks.map((item) => (
            <div
              key={item._id}
              className="rounded-lg text-center bg-gray-800 w-full p-6 shadow-xl"
            >
              <div className="w-full flex justify-between items-center bg-white p-6 rounded">
                <img
                  src={`http://localhost:3000/${item.frontImage}`}
                  alt={item.title}
                  className="h-20 object-fit rounded-lg"
                  onError={(e) => (e.target.src = "fallback-image-url.jpg")}
                />
                <div>
                  <h1 className="text-lg mt-2 font-semibold">{item.title}</h1>
                  <p className="text-xs mt-2 text-gray-600">{item.artist}</p>
                </div>
              </div>
              <audio
                controls
                className="mt-2 w-full rounded bg-gray-100 p-2 shadow-md"
              >
                <source
                  src={`http://localhost:3000/${item.audioFile}`}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))
        ) : (
          <h1 className="text-center text-gray-500">No Phonks added yet</h1>
        )}
      </div>
    </div>
  );
};

export default Products;
