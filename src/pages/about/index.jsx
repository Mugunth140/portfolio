import Aboutstack from "@/components/AboutStack/AboutStack";
import Btn from "@/components/Btn/btn";
import SplitText from "@/components/SplitText/SplitText";
import Techstack from "@/components/Techstack/Techstack";
import Transition from "@/components/Transitions/Transition";
import Head from "next/head";


export default function About() {

  return (
    <>
      <Head>
        <title>Mugunth | About</title>
        <meta
          name="description"
          content="Discover Mugunth's journey as a full-stack developer. From designing sleek interfaces to building scalable applications, explore my skills, projects, and passion for web development."
        />
        <meta name="keywords" content="Mugunth, Full-Stack Developer, Web Development, JavaScript, Python, React, Node.js, Portfolio, UI/UX Design" />
        <meta name="author" content="Mugunth" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mugunth.dev/about" />
        <meta property="og:site_name" content="mugunth.dev" />
        
        {/* Open Graph Metadata */}
        <meta property="og:title" content="Mugunth | About" />
        <meta
          property="og:description"
          content="Explore Mugunth's journey in web development, featuring projects, skills, and passion for creating impactful solutions."
        />
        <meta property="og:image" content="https://mugunth.dev/images/about.jpg" />
        <meta property="og:url" content="https://mugunth.dev/about" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mugunth | About" />
        <meta
          name="twitter:description"
          content="Discover my journey as a full-stack developer, my skills, and the projects I've worked on."
        />
        <meta name="twitter:image" content="https://mugunth.dev/images/about.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Transition>
        <div className="aboutWrapper">
          <div className="aboutMain">
            <div className="aboutTitle">
              <h1> 
                < SplitText text="A Journey Through My Creative and Technical Endeavors"/>
              </h1>
            </div>

            <div className="aboutContent">
              <aside className="aboutMe">
                <p>
                  My passion lies in transforming ideas into impactful
                  solutions, whether it&apos;s designing sleek, user-centered
                  interfaces or developing robust, scalable applications. I
                  thrive on challenges and continuously explore new technologies
                  and methodologies to enhance my work.
                </p>
                
                <div className="cvBtnContainer">
                <Btn><a id="cv-btn" href="/mugunth_resume.pdf" download="mugunth_resume.pdf"><p>Download CV</p></a></Btn>
                </div>

              </aside>
              <div className="aboutHighlights">
                <div className="highlightCard">
                  <h3>What I do</h3>
                  <p>Designing thoughtful interfaces and building fast, scalable web products.</p>
                </div>
                <div className="highlightCard">
                  <h3>How I work</h3>
                  <p>From idea to launch clear process, clean code, and detail focused execution.</p>
                </div>
                <div className="highlightCard">
                  <h3>Focus</h3>
                  <p>Performance, accessibility, and delightful user experiences across devices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Techstack />
        <Aboutstack />
      </Transition>
    </>
  );
}
