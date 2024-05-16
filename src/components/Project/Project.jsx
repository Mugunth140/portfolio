import React from "react";
import Btn from "../Btn/btn";
import Link from "next/link";

const Project = () => {

  const work = [
    {
      title: "Zephyrus",
      text:"A Cross Platform Social Media Application",
      type: "Design & Development",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Portfolio 2021",
      text:"Previous Version of My Portfolio",
      type: "Design & Development",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Weather Forecast",
      text:"Weather Forecasting Web Application",
      type: "Design & Development",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Rock Paper Scissor",
      text:"A Simple Rock Paper Scissor Web Based Game",
      type: "Design & Development",
      image: "https://via.placeholder.com/150",
    },
  ];
  return (
    <div className="project-wrapper">
      <section className="project-container">
         {work.map((work, index) => (
        <div key={index} className="project">
          <div className="project-text">
          <h2>{work.title}</h2>
          <p>{work.type}</p>
          </div>
          <span><a href={"#"} target="_blank" rel="noopener noreferrer">{work.text}</a></span>
        </div>
      ))}
      </section>
      <aside className="project-model">
        <div className="model-container"></div>
        <div className="project-btn">
            <Btn>
            <Link href="/work"><p>More work</p></Link>
            </Btn>
        </div>
      </aside>
    </div>
  );
};

export default Project;

