import Btn from "@/components/Btn/btn";
import Transition from "@/components/Transitions/Transition";
import Head from "next/head";
import Image from "next/image";
import work from "../../api/data";

const WorkDetails = ({ project }) => {
  if (!project) {
    return <p>Project not found</p>;
  }
  return (
    <Transition>
      <Head>
        <title>{`${project.title} | Mugunth Work`}</title>
        <meta name="description" content={project.text} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://mugunth.dev/work/${project.id}`} />
        <meta property="og:site_name" content="mugunth.dev" />
        <meta property="og:title" content={`${project.title} | Mugunth Work`} />
        <meta property="og:description" content={project.text} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://mugunth.dev/work/${project.id}`} />
        <meta property="og:image" content={`https://mugunth.dev/images/${project.image}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} | Mugunth Work`} />
        <meta name="twitter:description" content={project.text} />
        <meta name="twitter:image" content={`https://mugunth.dev/images/${project.image}`} />
      </Head>
      <section className="work-detailes-container">
        <div className="detailes-header">
          <div className="detailes-title">
            <h1>{project.title}</h1>
            <p>{project.text}</p>
          </div>

          {project.isLive && (
            <div className="detailes-btn">
              <Btn>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <p>live</p>
                </a>
              </Btn>
            </div>
          )}
        </div>

        <div className="detailes-body">
          <div className="detailes-image-container">
            <Image
              src={`/images/${project.image}`}
              alt={`${project.title} image`}
              width={850}
              height={750}
              //objectFit="cover"
              className="detailes-img"
              priority
            />
            <div className="detailes-sourcecode">
              <Btn>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <p>source code</p>
                </a>
              </Btn>
            </div>
          </div>
          <div className="detailes-aside">
            <div className="detailes-platform">
              <h3 className="detailes-grey">
                Platform :{" "}
                <span className="detaile-text">{project.platform}</span>
              </h3>
              <h3 className="detailes-grey">
                Year :{" "}
                <span span className="detaile-text">
                  {project.year}
                </span>
              </h3>
            </div>
            <div className="detailes-type">
              <h3 className="detailes-grey">
                Service :{" "}
                <span span className="detaile-text">
                  {project.type}
                </span>
              </h3>
            </div>
            <div className="detailes-stack">
              <h3 className="detailes-grey" >
                Stack :{" "}
                <span span className="detaile-text">
                  {project.stack}
                </span>
              </h3>
            </div>

            <div className="detailes-description">
              <h3 className="detailes-grey" >Description:<br/><br/><span id="description">{project.description}</span></h3>
            </div>
          </div>
        </div>
      </section>
    </Transition>
  );
};

export async function getStaticPaths() {
  return {
    paths: work.map((project) => ({ params: { id: project.id.toString() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = work.find((item) => item.id.toString() === params.id) || null;

  if (!project) {
    return { notFound: true };
  }

  return {
    props: { project },
  };
}

export default WorkDetails;
