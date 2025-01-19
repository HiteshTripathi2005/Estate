import React from "react";

const Demo = () => {
  const handelClick = async () => {
    const fetchdata = await fetch(
      "https://geocode.maps.co/search?q=nalasopara&api_key=678915a31a217029300394xoa2c3551"
    )
      .then((data) => data.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <button onClick={handelClick}>demo</button>
    </div>
  );
};

export default Demo;
