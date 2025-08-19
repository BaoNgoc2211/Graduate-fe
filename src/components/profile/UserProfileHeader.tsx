import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Phone } from "lucide-react"

interface UserProfileHeaderProps {
  avatar?: string
  name: string
  phone?: string
}

export function UserProfileHeader({ avatar, name, phone }: UserProfileHeaderProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className="p-6 mb-6 bg-white border-0 shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-blue-100 shadow-lg">
            <AvatarImage src={avatar ? `/images/${avatar}` : undefined} alt={name} />
            <AvatarFallback className="text-xl font-semibold bg-blue-900 text-white">{initials}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-blue-900 mb-1">{name}</h2>
          {phone && (
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <span className="text-sm">{phone}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
