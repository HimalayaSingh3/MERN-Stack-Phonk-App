import React from "react";

const Categories = () => {
  return (
    <div className="min-h-screen p-10 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 max-w-5xl w-full">
        {[
          { name: "Comedy", color: "bg-purple-300" },
          { name: "Business", color: "bg-green-300" },
          { name: "Education", color: "bg-yellow-300" },
          { name: "Hobbies", color: "bg-gray-300" },
          { name: "Government", color: "bg-blue-300" },
        ].map((category, index) => (
          <div
            key={index}
            className={`${category.color} h-32 items-center text-lg font-bold rounded-lg p-6 hover:scale-110 transition-transform duration-300`}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
