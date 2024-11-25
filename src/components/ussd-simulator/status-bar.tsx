import Image from "next/image";
import React from "react";
import { cn } from "~/lib/utils";

type Props = {
  isDark?: boolean;
};

const StatusBar: React.FC<Props> = ({ isDark }) => {
  return (
    <div
      className={cn(
        "h-10 w-full px-6 pt-5 absolute flex flex-row justify-between items-center text-gray-900 bg-white z-50",
        isDark ? "bg-gray-800 text-white" : "bg-white"
      )}
    >
      <span
        className={cn(
          "text-sm font-semibold absolute left-10 top-6",
          isDark ? "text-white" : "text-gray-900"
        )}
      >
        {new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </span>
      <Image
        src={isDark ? "/status-bar-dark.png" : "/status-bar.png"}
        alt="Status Bar"
        className="h-10 w-full object-scale-down"
        layout="intrinsic"
        width={350}
        height={14}
      />
    </div>
  );
};

export default StatusBar;
