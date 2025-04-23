import React, { useState } from "react";

const Demo = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <h1 className="text-2xl">{counter}</h1>
      <button onClick={handleClick} className="border-1 ">
        Increment
      </button>
    </div>
  );
};

export default Demo;
