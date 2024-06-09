import Transition from "@/components/Transitions/Transition";
import Image from "next/image";
import { useRouter } from "next/router";
import work from "../../api/data";
import styles from "./workDetailes.module.scss";

const WorkDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  // // Debugging logs
  // console.log('Router:', router);
  // console.log('ID:', id);
  // console.log('Work:', work);

  if (!router.isReady) {
    return <p>Loading...</p>;
  }

  // Find the project by its id
  const project = work.find((proj, index) => index.toString() === id);

  if (!project) {
    return <p>Project not found</p>;
  }
  return (
    <Transition>
      <div className={styles.projectDetails}>
        <h1>{project.title}</h1>
        <p className={styles.year}>{project.year}</p>
        <div className={styles.projectImage}>
          <Image
            src={`/images/${project.image}`}
            alt={`${project.title} image`}
            width={700}
            height={475}
            //objectFit="cover"
            className="image"
            priority
          />
        </div>
        <p className={styles.type}>{project.type}</p>
        <p className={styles.text}>{project.text}</p>
      </div>
    </Transition>
  );
};

export default WorkDetails;
