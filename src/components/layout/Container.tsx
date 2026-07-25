import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-[min(1700px,calc(100%_-_40px))] md:w-[min(1700px,calc(100%_-_72px))] ${className}`}>
      {children}
    </div>
  );
}
