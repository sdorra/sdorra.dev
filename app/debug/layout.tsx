import Notification from "components/Notification";
import { FC, PropsWithChildren } from "react";

const DebugLayout: FC<PropsWithChildren> = ({ children }) => {
  if (process.env.NODE_ENV !== "development") {
    return (
      <div className="grid grid-rows-[auto,1fr] h-full">
        <div>
          <h1 className="text-4xl font-bold">Debug Page</h1>
          <p className="mt-2">This page is used for development purposes</p>
        </div>
        <div className="flex items-center justify-center">
        <Notification type="error">This page is only available in development mode</Notification>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export default DebugLayout;
