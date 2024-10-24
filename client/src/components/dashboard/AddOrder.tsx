import { PlusIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import IUser from '@/types/userInterface'
import toast from 'react-hot-toast'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { TimePicker } from '../TimePicker'

export default function AddOrderForm() {
    const { user } = useSelector((state: RootState) => state.auth)
    const { _id, username } = user as IUser
    const [selectedServices, setSelectedServices] = useState<string>('')
    const [complexities, setComplexities] = useState<{ [key: string]: string }>(
        {},
    )
    const [additionalInstructions, setAdditionalInstructions] =
        useState<string>('')
    const [outputFormat, setOutputFormat] = useState<string>('')
    const [files, setFiles] = useState<File[]>([])
    const [progress, setProgress] = useState(0)

    const [date, setDate] = useState<Date>()
    const [time, setTime] = useState<{ hour: string; minute: string }>({
        hour: '00',
        minute: '00',
    })

    const [deliveryDate, setDeliveryDate] = useState<Date | null>(null)

    const complexityOptions = [
        { label: 'Basic $5' },
        { label: 'Simple $10' },
        { label: 'Medium $15' },
        { label: 'Complex $20' },
        { label: 'Super Complex $30' },
    ]

    const services = [
        'Color Correction',
        'Shadow Adding',
        'Clipping Path',
        'eCommerce Photo Editing',
        'Photo Retouching',
        'Background Removal',
        'Image Manipulation',
        'Packshot Retouching',
        'Image Masking',
    ]

    const handleComplexitySelect = (service: string, complexity: string) => {
        setComplexities((prevComplexities) => ({
            ...prevComplexities,
            [service]: complexity,
        }))
    }

    const handleFileUpload = (files: FileList) => {
        const fileArray = Array.from(files)
        setFiles((prevFiles) => [...prevFiles, ...fileArray])
    }

    const handleUpload = async () => {
        const totalFiles = files.length

        for (let i = 0; i < totalFiles; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setProgress(((i + 1) / totalFiles) * 100)
        }
    }

    useEffect(() => {
        if (date) {
            const newDeliveryDate = new Date(date)

            newDeliveryDate.setHours(parseInt(time.hour, 10))
            newDeliveryDate.setMinutes(parseInt(time.minute, 10))
            newDeliveryDate.setSeconds(0)

            setDeliveryDate(newDeliveryDate)
        }
    }, [date, time])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await handleUpload()

        const data = {
            userId: _id,
            username,
            services: selectedServices ? [selectedServices] : [],
            complexities,
            additionalInstructions,
            outputFormat,
            deliveryDate: deliveryDate,
            files,
        }

        console.log(data)

        try {
            toast.success(
                'Successfully added to order. Wait to accept your order. Redirecting to dashboard...',
            )

            setTimeout(() => {
                // navigate('/dashboard')
            }, 2000)
        } catch (err) {
            toast.error((err as Error).message)
            console.error('Failed to submit the order:', err)
        }
    }

    return (
        <div className="space-y-6 border rounded-xl p-10 shadow-lg m-4">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">
                    Place Your Order
                </h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid w-full max-w-full space-y-2">
                    <Label htmlFor="file-upload">Upload Image</Label>
                    <div className="flex items-center justify-center h-20 border-2 border-dashed rounded-lg border-gray-300">
                        <label
                            htmlFor="file-upload"
                            className="p-6 flex flex-col items-center justify-center cursor-pointer"
                        >
                            <PlusIcon className="h-6 w-6" />
                            <span className="text-sm text-gray-600">
                                Click to upload
                            </span>
                            <Input
                                type="file"
                                id="file-upload"
                                accept="image/*"
                                multiple
                                onChange={(e) =>
                                    handleFileUpload(e.target.files!)
                                }
                                className="hidden"
                                required
                            />
                        </label>
                    </div>
                    {files.length > 0 && (
                        <p className="text-sm text-gray-600">
                            {files.length === 0
                                ? 'No file selected'
                                : files.length > 1
                                  ? `Selected ${files.length} files`
                                  : `Selected ${files.length} file`}
                        </p>
                    )}
                    {progress > 0 && (
                        <div className="w-full">
                            <Progress value={progress} />
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <h3 className="mb-6 text-lg">Select Services</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {services.map((service) => (
                            <div
                                key={service}
                                className="flex flex-col space-y-2"
                            >
                                <RadioGroup
                                    value={selectedServices}
                                    onValueChange={setSelectedServices}
                                    required
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value={service}
                                            id={service}
                                        />
                                        <Label
                                            htmlFor={service}
                                            className="text-sm font-medium leading-none"
                                        >
                                            {service}
                                        </Label>
                                    </div>
                                    {selectedServices === service && (
                                        <Select
                                            onValueChange={(value) =>
                                                handleComplexitySelect(
                                                    service,
                                                    value,
                                                )
                                            }
                                            required
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select Complexity" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Complexity & Price
                                                    </SelectLabel>
                                                    {complexityOptions.map(
                                                        (complexity) => (
                                                            <SelectItem
                                                                key={
                                                                    complexity.label
                                                                }
                                                                value={
                                                                    complexity.label
                                                                }
                                                            >
                                                                {
                                                                    complexity.label
                                                                }
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                </RadioGroup>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid w-full max-w-full space-y-2">
                    <Label htmlFor="message">Additional Instructions</Label>
                    <Textarea
                        id="message"
                        value={additionalInstructions}
                        onChange={(e) =>
                            setAdditionalInstructions(e.target.value)
                        }
                        placeholder="Add any details about your order..."
                        className="resize-none h-32"
                        required
                    />
                </div>

                <div className="flex items-center flex-wrap gap-5">
                    <div className="flex flex-col">
                        <h3 className="mb-3 text-lg">Choose Output Format</h3>
                        <Select onValueChange={setOutputFormat} required>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select an Image Format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Image Formats</SelectLabel>
                                    {[
                                        'JPEG',
                                        'PNG',
                                        'TIFF',
                                        'PSD',
                                        'GIF',
                                        'RAW',
                                        'SVG',
                                        'WEBP',
                                    ].map((format) => (
                                        <SelectItem key={format} value={format}>
                                            {format}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="mb-3 text-lg">Choose Delivery Date</h3>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-[280px] justify-start text-left font-normal',
                                        !date && 'text-muted-foreground',
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? (
                                        format(date, 'PPP')
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    fromDate={new Date()}
                                    initialFocus
                                    required
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div>
                        <h3 className="mb-3 text-lg">Choose Delivery Time</h3>
                        <TimePicker setTime={setTime} />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button type="submit">Submit Order</Button>
                </div>
            </form>
        </div>
    )
}
