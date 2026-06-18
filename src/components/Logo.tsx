import Image from "next/image";

export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <Image
      src="https://i.ibb.co/6765s6RW/ff48bff1-df6d-4dcf-a6ec-f0a9f4468b4f.png"
      alt="je-me-lance.fr"
      width={size}
      height={size}
      className="rounded-lg"
      unoptimized
    />
  );
}
