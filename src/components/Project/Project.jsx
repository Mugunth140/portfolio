import Image from "next/image";
import Link from "next/link";
//import Router from "next/router";
import { useState } from "react";
import work from '../../pages/api/data';
import Btn from "../Btn/btn";

const Project = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="project-wrapper">
      <section className="project-container">
      {work.slice(0, 4).map((project, index) => (
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
    <span >
      <Link className="view" href="/work/" rel="noopener noreferrer">
        {project.text}
      </Link>
    </span>
  </div>
))}
      </section>
      <aside className="project-model">
        <div data-scroll data-scroll-speed="0.05" className="model-container">
          <div className="model-slider">
            {work.map((project, index) => (
              <div
                key={index}
                style={{
                  transform: `translateY(-${
                    hoveredIndex !== null ? hoveredIndex * 100 : 0
                  }%)`,
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
        <div data-scroll data-scroll-speed="0.1" className="project-btn">
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

