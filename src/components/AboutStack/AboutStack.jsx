const Aboutstack = () => {
  const AboutStackData = [
    {
      title: "Clint-Side (User Interface/User Experience)",
      description:
        "I specialize in crafting visually appealing, responsive interfaces using React and Next.js. My focus is on delivering intuitive, pixel-perfect designs and smooth animations that enhance user engagement and provide exceptional user experiences.",
    },
    {
      title: "Server-Side (Api's & Database)",
      description:
        "I excel in building robust, scalable server-side systems with Node.js, Express, and databases like MongoDB and MySQL. I develop secure, efficient applications and RESTful APIs, ensuring data integrity and writing clean, maintainable code for long-term performance.",
    },
    {
      title: "End-to-End (All-In-One-Package)",
      description:
        "As an End-to-End Developer, I integrate my interface and server-side skills to deliver complete web solutions. From UI design with React and Next.js to building server infrastructure, I handle all development aspects. Additionally, I incorporate SEO best practices to ensure your application is discoverable and reaches a wider audience.",
    },
  ];

  return (
    <div className="stack-wrapper">
      <div className="stack-title">
        <h2>I&apos;m Equipped to Support you with</h2>
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
