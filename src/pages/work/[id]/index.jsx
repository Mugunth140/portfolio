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
  const project = work.find((project, index) => index.toString() === id);

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

          <div className="detailes-btn">
            <Btn>
              <a
                href={project.github}
                target="_blank"
                className="detailes-sourcecode"
              >
                <p>source code</p>
              </a>
            </Btn>
            {project.isLive && (
              <Btn>
                <a href={project.url} target="_blank">
                  <p>live</p>
                </a>
              </Btn>
            )}
          </div>
        </div>
      </section>
      {/* <div className={styles.projectDetails}>
        <div className={styles.projectImage}>
          <Image
            src={`/images/${project.image}`}
            alt={`${project.title} image`}
            width={700}
            height={475}
            //objectFit="cover"
            className={styles.image}
            priority
          />
          <div className={styles.imageDescription}>
            <p className={styles.type}>{project.type}</p>
            <p className={styles.year}>{project.year}</p>
          </div>
        </div>
        <aside className={styles.projectDetailesAside}>
        <h1>{project.title}</h1>

        <p className={styles.text}>{project.text}</p>
        </aside>
      </div> */}
    </Transition>
  );
};

export default WorkDetails;
