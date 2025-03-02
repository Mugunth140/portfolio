import Transition from "@/components/Transitions/Transition";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Btn from "@/components/Btn/btn";
import Magnetic from "@/components/Magnetic/magnetic";
import SplitText from "@/components/SplitText/SplitText";
import { BiGridAlt } from "react-icons/bi";
import { CiCircleList } from "react-icons/ci";
import Image from "next/image";
import work from "../api/data";

export default function Work({ isMobile }) {
  const [category, setCategory] = useState("All");
  const [viewStyle, setViewStyle] = useState("default");
  
  const sortedWork = [...work].reverse();
  
  const filteredWork = sortedWork.filter((project) => {
    const projectTypeList = project.type.toLowerCase().split(", ");
    return category === "All"
      ? true 
      : projectTypeList.includes(category.toLowerCase());
  });

  const colors = {
    1: "#A8BBA9", // Neutral Green
    2: "#A0B4C4", // Neutral Blue
    3: "#D8C3A5", // Neutral Beige
    4: "#B2A396", // Neutral Taupe
    5: "#A5A58D", // Neutral Olive
    6: "#C5C6D0", // Neutral Lavender
    7: "#BFC9CA", // Neutral Light Blue
    8: "#CAD2C5", // Neutral Sage
    9: "#C1C1C1", // Neutral Light Gray
    10: "#BCC4B7", // Neutral Pale Green
    11: "#D9D9D9", // Neutral Silver
    12: "#E0E0E0", // Neutral Light Silver
    13: "#DADADA", // Neutral Cool Gray
    14: "#CBCBCB", // Neutral Medium Gray
    15: "#D3D3D3" // Neutral Soft Gray
  };

  const getRandomColor = () => {
    const colorKeys = Object.keys(colors);
    const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    return colors[randomKey];
  };

  return (
    <>
      <Head>
        <title>Mugunth | Work</title>
        <meta
          name="description"
          content="Explore Mugunth's portfolio showcasing expertise in both design and development. Discover projects that highlight creativity, technical skills, and innovative solutions."
        />
        <meta
          name="keywords"
          content="Mugunth, Portfolio, Web Development, Design, JavaScript, Python, React, Node.js, Projects, UI/UX, Full-Stack Developer"
        />
        <meta name="author" content="Mugunth" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Mugunth | Work" />
        <meta
          property="og:description"
          content="Showcasing Mugunth's design and development projects, combining creativity and technology for impactful solutions."
        />
        <meta property="og:image" content="https://mugunth.me/images/9.jpg" />
        <meta property="og:url" content="https://mugunth.me/work" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mugunth | Work" />
        <meta
          name="twitter:description"
          content="Explore my portfolio of web development and design projects showcasing my expertise and creativity."
        />
        <meta name="twitter:image" content="https://mugunth.me/images/9.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Transition>
        <div className="work-container">
          <div className="work-main">
            <div className="work-title">
              <h1>
                <SplitText text="Showcasing My Expertise in Design and Development" />
              </h1>
            </div>

            <div className="work-bar">
              <div className="filter-buttons">
                <Btn>
                  <div
                    className={`filter-button ${category === "All" ? "active" : ""}`}
                    onClick={() => setCategory("All")}
                  >
                    <p>All</p>
                  </div>
                </Btn>
                <Btn>
                  <div
                    className={`filter-button ${category === "Design" ? "active" : ""}`}
                    onClick={() => setCategory("Design")}
                  >
                    <p>Design</p>
                  </div>
                </Btn>
                <Btn>
                  <div
                    className={`filter-button ${category === "Development" ? "active" : ""}`}
                    onClick={() => setCategory("Development")}
                  >
                    <p>Development</p>
                  </div>
                </Btn>
              </div>
              {!isMobile && (
                <div className="sort-buttons">
                  <Magnetic>
                    <div
                      className={`sort-button ${viewStyle === "default" ? "active" : ""}`}
                      onClick={() => setViewStyle("default")}
                    >
                      <p>
                        <BiGridAlt />
                      </p>
                    </div>
                  </Magnetic>
                  <Magnetic>
                    <div
                      className={`sort-button ${viewStyle === "compact" ? "active" : ""}`}
                      onClick={() => setViewStyle("compact")}
                    >
                      <p>
                        <CiCircleList />
                      </p>
                    </div>
                  </Magnetic>
                </div>
              )}
            </div>

            <div className="work-project-container">
              <div
                className={
                  viewStyle === "compact" ? "project-index" : "index-none"
                }
              >
                <h5>project</h5>
                <h5>year</h5>
                <h5>service</h5>
              </div>
              {filteredWork.map((project, index) => (
                <Link href={`/work/${project.id}`} key={project.id} legacyBehavior>
                  <a
                    className={`work-project view ${
                      viewStyle === "compact" ? "project-compact" : ""
                    }`}
                  >
                    {viewStyle === "default" && (
                      <div
                        className="project-image"
                        style={{
                          backgroundColor: getRandomColor(),
                        }}
                      >
                        {/* 67.5% is for the 700/475 ratio */}
                        <Image
                          src={`/images/${project.image ? project.image : 'coming-soon.jpg'}`}
                          alt={`unable to fetch image from api`}
                          layout="fill"
                          objectFit="cover"
                          className="image"
                        />
                      </div>
                    )}
                    <div className="separator"></div>
                    <div className="project-text">
                      <h2>{project.title}</h2>
                      <p className="project-year">{project.year}</p>
                    </div>
                    <div className="project-type">
                      <p>{project.type}</p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}