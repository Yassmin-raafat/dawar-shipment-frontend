import Image from "next/image";

export default function DawarLogo() {
  return (
    <span className="relative block h-14 w-[154px]">
      <Image
        alt="Dawar Parcel"
        className="h-14 w-[154px] object-contain dark:hidden"
        fill
        priority
        src="/images/dawar-logo.svg"
        sizes="154px"
      />
      <Image
        alt=""
        aria-hidden="true"
        className="hidden h-14 w-[154px] object-contain dark:block"
        fill
        priority
        src="/image%2022913.png"
        sizes="154px"
      />
    </span>
  );
}
