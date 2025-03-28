// components/Project/PageMenu.tsx
export default function PageMenu({ projectId }: { projectId: string }) {
  return (
    <ul id="pageMenu">
      <li data-menuanchor="page1" className="active">
        <a href="#page1">
          <span>✏️ {projectId}</span>
          <i></i>
        </a>
      </li>
      <li data-menuanchor="page2">
        <a href="#page2">
          <span>💻 Technology Stack</span>
          <i></i>
        </a>
      </li>
      <li data-menuanchor="page3">
        <a href="#page3">
          <span>👩🏻‍💻 Key Responsibilities</span>
          <i></i>
        </a>
      </li>
      <li data-menuanchor="page4">
        <a href="#page4">
          <span>💡 Main Features</span>
          <i></i>
        </a>
      </li>
      <li data-menuanchor="page5">
        <a href="#page5">
          <span>🕵🏻‍♀️ Troubleshooting & Solutions</span>
          <i></i>
        </a>
      </li>
    </ul>
  );
}
