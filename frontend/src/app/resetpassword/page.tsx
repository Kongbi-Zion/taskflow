import dynamic from "next/dynamic";
import LazyLoader from "../../components/ui/lazyloader";

// Lazy load ResetPasswordComponent with a loading fallback
const ResetPasswordComponent = dynamic(
  () => import("../../components/page/resetpass"),
  {
    loading: () => <LazyLoader />,
  }
);

const ResetPassword: React.FC = () => {
  return <ResetPasswordComponent />;
};

export default ResetPassword;
