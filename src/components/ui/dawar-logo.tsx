import Image from "next/image";

export default function DawarLogo() {
  return (
    <Image
      alt="Dawar Parcel"
      className="h-14 w-[154px]"
      height={56}
      priority
      src="/images/dawar-logo.svg"
      width={154}
    />
  );
}
