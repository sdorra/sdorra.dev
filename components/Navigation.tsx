import NavigationLink from "./NavigationLink";

const Navigation = () => (
  <nav>
    <ul className="flex gap-4">
      <li>
        <NavigationLink href="/">Home</NavigationLink>
      </li>
      <li>
        <NavigationLink href="/about">About</NavigationLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
