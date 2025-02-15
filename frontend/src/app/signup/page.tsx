import dynamic from "next/dynamic";
import LazyLoader from "../../components/ui/lazyloader";

// Lazy load SignUpContent with a loading fallback
const SignUpContent = dynamic(() => import("../../components/page/signup"), {
  loading: () => <LazyLoader />,
});

const SignUp: React.FC = () => {
  return <SignUpContent />;
};

export default SignUp;
