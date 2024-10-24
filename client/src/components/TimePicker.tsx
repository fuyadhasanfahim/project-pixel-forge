import { useState, useEffect } from 'react'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'

const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0'),
)
const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0'),
)

interface TimePickerProps {
    setTime: (time: { hour: string; minute: string }) => void
}

export const TimePicker: React.FC<TimePickerProps> = ({ setTime }) => {
    const [selectedHour, setSelectedHour] = useState<string>('00')
    const [selectedMinute, setSelectedMinute] = useState<string>('00')

    useEffect(() => {
        setTime({ hour: selectedHour, minute: selectedMinute })
    }, [selectedHour, selectedMinute, setTime])

    return (
        <div className="flex items-center gap-x-5">
            <Select value={selectedHour} onValueChange={setSelectedHour}>
                <SelectTrigger className="w-16">
                    <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent>
                    {hours.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                            {hour}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                <SelectTrigger className="w-16">
                    <SelectValue placeholder="Minute" />
                </SelectTrigger>
                <SelectContent>
                    {minutes.map((minute) => (
                        <SelectItem key={minute} value={minute}>
                            {minute}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
