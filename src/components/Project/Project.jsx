import React, { useState } from "react";
import Btn from "../Btn/btn";
import Image from "next/image";
import Link from "next/link";

const Project = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const work = [
    {
      title: "Zephyrus",
      text: "A Cross Platform Social Media Application",
      type: "Design & Development",
      image: "1.jpg",
    },
    {
      title: "Portfolio 2021",
      text: "Previous Version of My Portfolio",
      type: "Design & Development",
      image: "2.jpg",
    },
    {
      title: "Weather Forecast",
      text: "Weather Forecasting Web Application",
      type: "Design & Development",
      image: "3.jpg",
    },
    {
      title: "Rock Paper Scissor",
      text: "A Simple Rock Paper Scissor Web Based Game",
      type: "Design & Development",
      image: "4.jpg",
    },
  ];

  return (
    <div className="project-wrapper">
      <section className="project-container">
        {work.map((project, index) => (
          <div
            key={index}
            className="project"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="project-text">
              <h2>{project.title}</h2>
              <p>{project.type}</p>
            </div>
            <span>
              <a href={"#"} target="_blank" rel="noopener noreferrer">
                {project.text}
              </a>
            </span>
          </div>
        ))}
      </section>
      <aside className="project-model">
        <div className="model-container">
          <div className="model-slider">
            {work.map((project, index) => (
              <div
                key={index}
                style={{
                  transform: `translateY(-${hoveredIndex !== null ? hoveredIndex * 100 : 0}%)`,
                }}
                className="model"
              >
                <Image
                  src={`/images/${project.image}`}
                  alt={project.title || ""}
                  priority={true}
                  width={400}
                  height={0} // Adjust height as per your image dimensions
                />
              </div>
            ))}
          </div>
        </div>
        <div className="project-btn">
          <Btn>
            <Link href="/work">
              <p>More work</p>
            </Link>
          </Btn>
        </div>
      </aside>
    </div>
  );
};

export default Project;
