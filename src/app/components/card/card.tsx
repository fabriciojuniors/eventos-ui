export default function Card({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl m-auto w-4/5">
            {children}
        </div>
    )
}