import React from "react";

const reference_value = [8.75, 4.11, 9.77, 14.09, 18.98, 23.85, 28.25];

const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const generateUniqueArray = (arr: number[]) => {
  const newArray: number[] = [];
  const set = new Set<number>();

  while (newArray.length < arr.length) {
    const newValue = arr[newArray.length] + getRandomNumber(-5, 5);
    const roundedValue = Math.round(newValue * 100) / 100;

    if (roundedValue > 0.5 && !set.has(roundedValue)) {
      newArray.push(roundedValue);
      set.add(roundedValue);
    }
  }

  return newArray.map((value) => Math.round(value));
};

const newArray = generateUniqueArray(reference_value);

const page = () => {
  return (
    <div className="container mx-auto mt-32 text-center">
      <p className="font-semibold text-xl">
        {/* Apply blue color to the first element */}
        <span className="text-blue-500">{newArray[0]}</span>{" "}
        {/* Apply red color to the rest */}
        {newArray.slice(1).map((value, index) => (
          <span key={index} className="text-red-500 ml-2">
            {value}
          </span>
        ))}
      </p>
    </div>
  );
};

export default page;
