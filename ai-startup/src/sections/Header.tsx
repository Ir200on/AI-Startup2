import LogoIcon from "@/assets/logo.svg";

export const Header = () => {
  return (
    <header className="py-4">
      <div className="container">
        <div className="flex justify-between">
          <div>
            <span>logo</span>
          </div>
          <div>
            <button>Join waitlist</button>
            <span>menu</span>
          </div>
        </div>
      </div>
    </header>
  );
};
