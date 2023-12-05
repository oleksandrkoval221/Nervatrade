export default async function NewsTerminal() {
  return (
    <div className="mx-auto w-full md:pl-5">
      <div className="w-full grid xl:grid-cols-12 gap-4">
        <div className="xl:col-span-5 xl:h-[calc(100vh-32px)]">
          news terminal
        </div>
        <div className="xl:col-span-7 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">twitter feed</div>
          <div className="lg:col-span-1">price alert</div>
        </div>
      </div>
    </div>
  );
}
