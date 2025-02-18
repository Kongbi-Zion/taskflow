"use client";
import dynamic from "next/dynamic";
import LazyLoader from "../../components/ui/lazyloader";

// Lazy load ForgotPasswordComponent with a loading fallback
const ForgotPasswordComponent = dynamic(
  () => import("../../components/page/forgotpass"),
  {
    loading: () => <LazyLoader />,
  }
);

const ForgotPassword: React.FC = () => {
  return <ForgotPasswordComponent />;
};

export default ForgotPassword;
