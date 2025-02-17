import dynamic from "next/dynamic";
import DashboardLayout from "../../layouts/dashboard";
import LazyLoader from "@/components/ui/lazyloader";
import React from "react";

// Lazy load ProjectComponent
const ProjectComponent = dynamic(
  () => import("../../../components/page/project"),
  {
    loading: () => <LazyLoader />,
  }
);

const MemoizedProjectComponent = React.memo(ProjectComponent);

const Project: React.FC = () => {
  return (
    <DashboardLayout>
      <div>
        <MemoizedProjectComponent />
      </div>
    </DashboardLayout>
  );
};

export default Project;
