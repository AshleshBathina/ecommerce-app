import { User } from "lucide-react"


const ProfilePage = () => {
  return (
    <div className="pt-7 h-screen bg-[#0F0F0F]">
      <div className="px-7">
        <div className="bg-[#222222] rounded-3xl p-6 gap-2 flex items-center">
          <div className="bg-blue-900 relative size-20 rounded-full flex justify-center items-center" >
            <p className="font-semibold text-4xl text-white">A</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xl text-white font-medium">Ashlesh Bathina</p>
            <p className="text-sm text-gray-400">ashleshbathina@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="flex px-7">
        <div className="bg-[#222222] rounded-3xl flex flex-col items-center p-6">
          <div className="">
            <User className="size-6" />
          </div>
          <h1 className="">Edit Profile</h1>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage