interface BannerProps {
  title: string;
  subtitle: string;
  desc: string;
  img: string;
}

export default function Banner({ title, subtitle, desc, img }: BannerProps) {
  return (
    <div
      className="text-white w-[319px] h-[391px] rounded-[20px] p-[20px] bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(${img})` }}
    >
      <h1 className="font-bold text-[24px]">{title}</h1>
      <div>
        <hr />
        <div className="my-4 line-clamp-2 overflow-hidden text-ellipsis">
          {desc}
        </div>
        <div className="font-bold">{subtitle}</div>
      </div>
    </div>
  );
}
