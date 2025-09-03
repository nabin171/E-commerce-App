import React, { useEffect, useState } from "react";

const About = () => {
  const [increment, setIncrement] = useState(0);
  useEffect(() => {
    console.log("count", increment);
    console.log("hey");
  }, [increment]);
  return (
    <div>
      <button onClick={() => setIncrement(increment + 1)}>
        Increment{increment}
      </button>
    </div>
  );
};

export default About;
