import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";
import Categories from "./categories";
import Container from "../container";

////

function Navbar() {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
}

export default Navbar;
