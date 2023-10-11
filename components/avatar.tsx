"use client";

import Image from "next/image";

interface Props {
  src: string | null | undefined;
}

function Avatar({ src }: Props) {
  return <Image className="rounded-full" height="30" width="30" alt="Avatar" src={src || "/placeholder.jpg"} />;
}

export default Avatar;
