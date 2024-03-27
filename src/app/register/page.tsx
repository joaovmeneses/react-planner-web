import LogoS from "@/components/shared/LogoScreen";
import RegScreen from "@/components/register/RegisterScreen";

export default function Page() {
  return (
    <div className="flex flex-row">
      <LogoS />
      <RegScreen />
    </div>
  );
}
