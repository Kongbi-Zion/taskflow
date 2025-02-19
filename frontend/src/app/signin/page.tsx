import dynamic from "next/dynamic";
import LazyLoader from "../../components/ui/lazyloader";

// Lazy load SignInContent with a fallback
const SignInContent = dynamic(() => import("../../components/page/signin"), {
  loading: () => <LazyLoader />,
});

const SignIn: React.FC = () => {
  return <SignInContent />;
};

export default SignIn;
