import React, { useState } from "react";
import Btn from "../Btn/btn";
import Image from "next/image";
import Link from "next/link";

const Project = () => {
  const [model, setModel] = useState({ active: false, index: 0 });

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
        {work.map((work, index) => (
          <div key={index} className="project" setModel={setModel}>
            <div className="project-text">
              <h2>{work.title}</h2>
              <p>{work.type}</p>
            </div>
            <span>
              <a href={"#"} target="_blank" rel="noopener noreferrer">
                {work.text}
              </a>
            </span>
          </div>
        ))}
      </section>
      <aside className="project-model">
        <div className="model-container">
          {work.map((work, index) => {
            return (
              <div className="model" key={index}>
                <Image
                  src={`/images/${work.image}`}
                  alt={work.title || ""}
                  width={400}
                  height={0}
                />
              </div>
            );
          })}
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
