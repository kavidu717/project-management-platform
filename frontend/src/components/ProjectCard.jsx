export default function ProjectCard({ title, description, status }) {
  return (
    <div >
      <h3>{title}</h3>
      <p>{description}</p>
      <small>Status: {status}</small>
    </div>
  );
}