import LogoS from "@/components/shared/LogoScreen";
import LoginScreen from "@/components/login/LoginScreen";

export default function Page() {
  return (
    <div className="flex flex-row">
      <LogoS />
      <LoginScreen/>
    </div>
  );
}
