export default function Message() {
    return (
        <div className="m-2">
            <div className="flex items-end justify-end mb-4">
                <div className="bg-black text-white max-w-xs p-3 rounded-lg rounded-br-none shadow">
                    <p>Hi there! How can I help you today?</p>
                    <span className="text-xs block text-right mt-1">
                        {new Date().toLocaleTimeString()}
                    </span>
                </div>
            </div>

            <div className="flex items-end justify-start mb-4">
                <div className="max-w-xs p-3 border rounded-lg rounded-bl-none shadow">
                    <p>I have a few questions regarding my order.</p>
                    <span className="text-xs block text-left mt-1">
                        {new Date().toLocaleTimeString()}
                    </span>
                </div>
            </div>
        </div>
    )
}
