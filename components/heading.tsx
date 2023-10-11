"use client";

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

function Heading({ title, subtitle, center }: Props) {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="mt-2 font-light text-neutral-500">{subtitle}</div>
    </div>
  );
}

export default Heading;
