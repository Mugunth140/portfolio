import Transition from "@/components/Transitions/Transition";
import Image from "next/image";
import { useRouter } from "next/router";
import work from "../../api/data";
import Btn from "@/components/Btn/btn";

const WorkDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) {
    return (
      <>
        <div className="dynamicWorkLoader">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  // Find the project by its id
  const project = work.find((project) => project.id.toString() === id);

  if (!project) {
    return <p>Project not found</p>;
  }
  return (
    <Transition>
      <section className="work-detailes-container">
        <div className="detailes-header">
          <div className="detailes-title">
            <h1>{project.title}</h1>
            <p>{project.text}</p>
          </div>

          {project.isLive && (
            <div className="detailes-btn">
              <Btn>
                <a href={project.url} target="_blank">
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
                <a href={project.github} target="_blank">
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

export default WorkDetails;
