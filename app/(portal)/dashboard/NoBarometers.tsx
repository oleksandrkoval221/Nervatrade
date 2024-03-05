export default function NoBarometers() {
  return (
    <div className="w-full h-[calc(100vh-96px)] flex items-center justify-center">
      <div className="w-full max-w-[646px] flex flex-col items-center gap-6 mb-[136px]">
        <h1 className="font-bold text-[32px] text-center">
          Create a dashboard
        </h1>
        <p className="text-base text-gray-second text-center">
          Welcome to dashboards, from here you will be able to create, pin and
          store your favourite barometers and widgets.
        </p>
      </div>
    </div>
  );
}
