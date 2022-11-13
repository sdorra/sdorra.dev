import NavigationLink from "./NavigationLink";

const Navigation = () => (
  <nav>
    <ul className="flex gap-4">
      <li>
        <NavigationLink href="/">Home</NavigationLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
