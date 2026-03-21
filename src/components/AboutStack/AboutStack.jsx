const Aboutstack = () => {
  const AboutStackData = [
    {
      title: "Frontend Development",
      description:
        "I build clean, responsive interfaces with React and Next.js, focused on performance, accessibility, and polished user interactions.",
    },
    {
      title: "Backend Development",
      description:
        "I design robust APIs and scalable server architecture using Node.js, Express, and modern databases with security and maintainability in mind.",
    },
    {
      title: "End-to-End Product Delivery",
      description:
        "From product planning and UI implementation to deployment and SEO, I deliver complete web experiences that are reliable, fast, and user-focused.",
    },
  ];

  return (
    <div className="stack-wrapper">
      <div className="stack-title">
        <p className="stack-kicker">Services</p>
        <h2>How I Can Support You</h2>
      </div>
      <div className="stack-content">
        {AboutStackData.map((data, index) => {
          return (
            <div className="stack-items" key={index}>
              <h2 className="item-title">{data.title}</h2>
              <div className="item-description">
                <p>{data.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Aboutstack;
