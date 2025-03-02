import Btn from "@/components/Btn/btn";
import Image from 'next/image';
import work from "../../pages/api/data";

const ProjectMobile = () => {
  return (
    <div className='project-container-mobile'>
        {
          work.slice(-4).map((project, index) => {
            return (
              <div key={index} className='project-mobile'>
                <Image
                  src={`/images/${project.image}`}
                  alt={project.title || ""}
                  priority={true}
                  width={400}
                  height={300} 
                  />
                  <h1>{project.title}</h1>
                  <div className="project-text-mobile">
                  <p>{project.type}</p>
                  <p>{project.year}</p>
                  </div>
              </div>
            )
          })
        }
        <div className="project-btn-container">
        <div className="project-btn-mobile">
          <Btn>
           <p>More work</p>
          </Btn>
         </div>
         </div>
    </div>
  )
}

export default ProjectMobile
