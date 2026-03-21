import Image from "next/image";
import Link from "next/link";
//import Router from "next/router";
import { useState } from "react";
import work from '../../pages/api/data';
import Btn from "../Btn/btn";

const Project = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const recentProjects = work.slice(-4);

  return (
    <div className="project-wrapper">
      <section className="project-container">
      {recentProjects.map((project, index) => (
  <div
    key={index}
    className="project"
    onMouseEnter={() => setHoveredIndex(index)}
    onMouseLeave={() => setHoveredIndex(0)}
  >
    <div className="project-text">
      <h2>{project.title}</h2>
      <p>{project.type}</p>
    </div>
    <span >
      <Link className="view" href="/work/" rel="noopener noreferrer">
        {project.text}
      </Link>
    </span>
  </div>
))}
      </section>
      <aside className="project-model">
        <div className="model-container">
          <div
            className="model-slider"
            style={{ transform: `translateY(-${hoveredIndex * 100}%)` }}
          >
            {recentProjects.map((project, index) => (
              <div key={index} className="model">
                <Image
                  src={`/images/${project.image || "coming-soon.jpg"}`}
                  alt={project.title || ""}
                  priority={index === 0}
                  fill
                  sizes="(max-width: 900px) 90vw, (max-width: 1200px) 35vw, 28vw"
                  style={{ objectFit: "cover" }}
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

