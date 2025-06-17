import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between bg-primary p-6">
        <div>
          <div className="text-3xl">NFTix</div>
        </div>
        <div className="flex gap-4">
          <div className="text-primary">Connect Wallet</div>
          <div className="border border-border font-bold text-accent rounded-3xl p-4">
            My NFTs
          </div>
          <div>My Collections</div>
          <div>Settings</div>
          <div>Help</div>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};

export default Navbar;
