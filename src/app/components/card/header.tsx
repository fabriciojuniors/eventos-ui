
type Props = {
    title: string,
    btnAction: Function
}

export default function CardHeader(props: Props) {
    return (
        <div className="p-6">
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {props.title}
            </h5>
            <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
                onClick={() => props.btnAction()}
                data-modal-target="default-modal" data-modal-toggle="default-modal">
                Nova {props.title}
            </button>
        </div>
    )

}