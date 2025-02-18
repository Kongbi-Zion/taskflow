"use client";
import dynamic from "next/dynamic";
import DashboardLayout from "../layouts/dashboard";
import LazyLoader from "../../components/ui/lazyloader";

// Lazy load ProfileComponent
const ProfileComponent = dynamic(
  () => import("../../components/page/profile"),
  {
    loading: () => <LazyLoader />,
  }
);

const Profile: React.FC = () => {
  return (
    <DashboardLayout>
      <ProfileComponent />
    </DashboardLayout>
  );
};

export default Profile;
