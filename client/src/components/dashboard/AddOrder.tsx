import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
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
import { DateTimePicker } from '../ui/DateTimePicker'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import IUser from '@/types/userInterface'
import { usePostOrderMutation } from '@/features/orders/orderApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function AddOrderForm() {
    const [postOrder, { isLoading }] = usePostOrderMutation()
    const { user } = useSelector((state: RootState) => state.auth)
    const { _id, username } = user as IUser
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [complexities, setComplexities] = useState<{ [key: string]: string }>(
        {},
    )
    const [additionalInstructions, setAdditionalInstructions] =
        useState<string>('')
    const [outputFormat, setOutputFormat] = useState<string | undefined>()
    const [deliveryDate, setDeliveryDate] = useState<Date | undefined>()
    const navigate = useNavigate()

    const complexityOptions = [
        { label: 'Basic', price: '$5' },
        { label: 'Simple', price: '$10' },
        { label: 'Medium', price: '$15' },
        { label: 'Complex', price: '$20' },
        { label: 'Super Complex', price: '$30' },
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

    const handleServiceSelect = (service: string) => {
        setSelectedServices((prevSelected) =>
            prevSelected.includes(service)
                ? prevSelected.filter((s) => s !== service)
                : [...prevSelected, service],
        )
    }

    const handleComplexitySelect = (service: string, complexity: string) => {
        setComplexities((prevComplexities) => ({
            ...prevComplexities,
            [service]: complexity,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = {
            userId: _id,
            username,
            services: selectedServices,
            complexities,
            additionalInstructions,
            outputFormat,
            deliveryDate,
        }

        try {
            await postOrder(data).unwrap()

            toast.success(
                'Successfully added to order. Wait to accept your order. Redirecting to dashboard...',
            )

            setTimeout(() => {
                navigate('/dashboard')
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
                                className="hidden"
                            />
                        </label>
                    </div>
                    {/* {progress > 0 && <Progress value={progress} />} */}
                </div>

                <div className="flex flex-col">
                    <h3 className="mb-6 text-lg">Select Services</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="flex flex-col space-y-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={service}
                                        checked={selectedServices.includes(
                                            service,
                                        )}
                                        onCheckedChange={() =>
                                            handleServiceSelect(service)
                                        }
                                    />
                                    <Label
                                        htmlFor={service}
                                        className="text-sm font-medium leading-none"
                                    >
                                        {service}
                                    </Label>
                                </div>

                                {selectedServices.includes(service) && (
                                    <Select
                                        onValueChange={(value) =>
                                            handleComplexitySelect(
                                                service,
                                                value,
                                            )
                                        }
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
                                                            {complexity.label} -{' '}
                                                            {complexity.price}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
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
                    />
                </div>

                <div className="flex items-center flex-wrap gap-5">
                    <div className="flex flex-col">
                        <h3 className="mb-3 text-lg">Choose Output Format</h3>
                        <Select onValueChange={setOutputFormat}>
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
                        <DateTimePicker
                            className="w-72"
                            granularity="minute"
                            hourCycle={24}
                            value={deliveryDate}
                            onChange={setDeliveryDate}
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button type="submit" disabled={isLoading}>
                        Submit Order
                    </Button>
                </div>
            </form>
        </div>
    )
}
