const Aboutstack = () => {
  const AboutStackData = [
    {
      title: "Frontend",
      description: "",
    },
    {
      title: "Backend",
      description: "",
    },
    {
      title: "Full-Stack",
      description: "",
    },
  ];

  return (
    <div className="stack-wrapper">
      <div className="stack-title">
        <h1>I can help you with</h1>
      </div>
      <div className="stack-content">
        {AboutStackData.map((data, index) => {
          return (
            <div className="stack-item" key={index}>
              <h2>{data.title}</h2>
              <p>{data.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Aboutstack;
