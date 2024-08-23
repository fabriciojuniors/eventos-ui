export default function CardContent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative p-6 overflow-hidden flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            {children}
        </div>
    )
}