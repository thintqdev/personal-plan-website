"use client"

import * as React from "react"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface TimePickerProps {
  time?: string
  onTimeChange?: (time: string) => void
  placeholder?: string
  className?: string
}

export function TimePicker({
  time,
  onTimeChange,
  placeholder = "Chọn giờ",
  className,
}: TimePickerProps) {
  const [hours, setHours] = React.useState("")
  const [minutes, setMinutes] = React.useState("")

  React.useEffect(() => {
    if (time) {
      const [h, m] = time.split(":")
      setHours(h || "")
      setMinutes(m || "")
    }
  }, [time])

  const handleTimeChange = (newHours: string, newMinutes: string) => {
    if (newHours && newMinutes) {
      const formattedTime = `${newHours.padStart(2, "0")}:${newMinutes.padStart(2, "0")}`
      onTimeChange?.(formattedTime)
    }
  }

  const handleHoursChange = (value: string) => {
    const numValue = parseInt(value)
    if (value === "" || (numValue >= 0 && numValue <= 23)) {
      setHours(value)
      handleTimeChange(value, minutes)
    }
  }

  const handleMinutesChange = (value: string) => {
    const numValue = parseInt(value)
    if (value === "" || (numValue >= 0 && numValue <= 59)) {
      setMinutes(value)
      handleTimeChange(hours, value)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !time && "text-muted-foreground",
            className
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {time ? time : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex items-center space-x-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Giờ</label>
            <Input
              type="number"
              placeholder="00"
              value={hours}
              onChange={(e) => handleHoursChange(e.target.value)}
              className="w-16 text-center"
              min="0"
              max="23"
            />
          </div>
          <div className="flex items-center justify-center pt-6">
            <span className="text-lg font-medium">:</span>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Phút</label>
            <Input
              type="number"
              placeholder="00"
              value={minutes}
              onChange={(e) => handleMinutesChange(e.target.value)}
              className="w-16 text-center"
              min="0"
              max="59"
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"].map((timeOption) => (
            <Button
              key={timeOption}
              variant="outline"
              size="sm"
              onClick={() => {
                const [h, m] = timeOption.split(":")
                setHours(h)
                setMinutes(m)
                handleTimeChange(h, m)
              }}
              className="text-xs"
            >
              {timeOption}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
