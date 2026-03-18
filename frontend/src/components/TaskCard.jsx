export default function TaskCard({ title, priority, status }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Priority: {priority}</p>
      <small>Status: {status}</small>
    </div>
  );
}