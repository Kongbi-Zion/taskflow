import dynamic from "next/dynamic";
import DashboardLayout from "../../layouts/dashboard";
import LazyLoader from "@/components/ui/lazyloader";

// Lazy load ProjectComponent
const ProjectComponent = dynamic(
  () => import("../../../components/page/project"),
  {
    loading: () => <LazyLoader />,
  }
);

const Project: React.FC = () => {
  return (
    <DashboardLayout>
      <div>
        <ProjectComponent />
      </div>
    </DashboardLayout>
  );
};

export default Project;
