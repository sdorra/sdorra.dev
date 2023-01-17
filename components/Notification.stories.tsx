import ContentSection from "./ContentSection";
import Notification, { types } from "./Notification";

export const Types = () => (
  <ul className="space-y-4">
    {types.map((type) => (
      <li key={type}>
        <Notification type={type}>
          Fugiat veniam officia dolor eu cupidatat ipsum nisi labore veniam nisi. Velit adipisicing minim pariatur ex
          sint veniam veniam id eu. Quis cupidatat cupidatat culpa labore reprehenderit velit pariatur duis tempor.
        </Notification>
      </li>
    ))}
  </ul>
);

export const Links = () => (
  <ul className="space-y-4">
    {types.map((type) => (
      <li key={type}>
        <Notification type={type}>
          Fugiat veniam officia dolor eu cupidatat ipsum nisi labore veniam nisi. Velit adipisicing{" "}
          <a href="#minim">minim</a> pariatur ex sint veniam veniam id eu. Quis cupidatat cupidatat culpa labore
          reprehenderit velit <a href="#pariatur">pariatur</a> duis tempor.
        </Notification>
      </li>
    ))}
  </ul>
);

export const Title = () => (
  <Notification title="Bonus" type="info">
    Exercitation voluptate eiusmod voluptate ullamco adipisicing et. Duis reprehenderit Lorem id dolore Lorem sit
    ullamco mollit Lorem ut aliquip dolore labore. Magna mollit cupidatat nulla. Labore deserunt anim magna. Non duis
    duis aute non incididunt. Nostrud est magna tempor enim elit Lorem pariatur veniam occaecat. Nostrud laborum qui
    excepteur aliqua anim aliquip. Qui reprehenderit cupidatat voluptate et.
  </Notification>
);

export const Prose = () => (
  <ContentSection>
    <h1>Notifications in prose text</h1>
    <p>
      Fugiat elit amet et deserunt laborum aute dolor. Aliquip sint nostrud consectetur Lorem anim ea ullamco. Id anim
      veniam commodo id. Tempor dolor exercitation reprehenderit minim in minim voluptate culpa cillum fugiat.
    </p>
    <Notification>
      Fugiat elit amet et deserunt laborum aute dolor. Aliquip sint nostrud consectetur Lorem anim ea ullamco. Id anim
      veniam commodo id. Tempor dolor exercitation reprehenderit minim in minim voluptate culpa cillum fugiat.
    </Notification>
    <p>
      Fugiat elit amet et deserunt laborum aute dolor. Aliquip sint nostrud consectetur Lorem anim ea ullamco. Id anim
      veniam commodo id. Tempor dolor exercitation reprehenderit minim in minim voluptate culpa cillum fugiat.
    </p>
    <h2>Notifications containing prose text</h2>
    <Notification type="error" title="With formating" prose>
      <p>
        Occaecat dolore eu adipisicing aliquip <a href="#aliquip">aliquip</a> est dolore consectetur sit ad. Magna ea
        incididunt in aute ea laborum eu esse nulla do et eu aliqua fugiat cillum. Adipisicing et ea officia duis
        nostrud incididunt enim enim ullamco laborum aliqua tempor. Sint sunt ullamco quis sit commodo incididunt non
        magna. Deserunt aute sit consectetur pariatur quis. Incididunt eu ipsum ex labore qui.
      </p>
      <h3>More text</h3>
      <p>
        Fugiat duis sunt nisi minim ad laborum. Commodo veniam mollit et deserunt occaecat Lorem aliqua est quis. Eu
        sint qui nisi Lorem laboris sunt ex velit ad consequat exercitation ad. Ex minim cupidatat velit non voluptate
        do do tempor proident mollit. Quis laboris cupidatat sint do proident ipsum non labore. Cupidatat dolore enim
        exercitation eu sint labore aliquip voluptate exercitation adipisicing consectetur occaecat nostrud elit duis.
        Aliqua est deserunt exercitation adipisicing aute in esse ipsum ex Lorem proident. Consequat ea laborum duis
        duis eiusmod non exercitation incididunt mollit.
      </p>
    </Notification>
  </ContentSection>
);
