const SettingWidget = () => {
  return (
    <div className="w-full max-w-[608px] h-[180px] p-4 flex flex-col justify-around">
      <div className="flex gap-3 items-center">
        <div className="bg-dark-main w-[calc(100%-50px)] h-12 rounded flex items-center justify-center">Economic Calendar</div>
        <div className="rounded-full border border-gray-500 w-8 h-8 flex items-center justify-center cursor-pointer">
          <img src="/icons/Calendar.svg" width={18} alt="s" />
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <button className="bg-green-main text-black w-[calc(100%-50px)] h-12 rounded flex items-center justify-center">Customize Setting</button>
        <div className="rounded-full border border-gray-500 w-8 h-8 flex items-center justify-center cursor-pointer">
          <img src="/icons/Setting.svg" width={18} alt="s" />
        </div>
      </div>
    </div>
  )
}

export default SettingWidget;