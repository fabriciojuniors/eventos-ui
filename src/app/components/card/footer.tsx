type Props = {
    hasNext: boolean,
    totalItens: number,
    itens: number
}

export default function CardFooter(props: Props) {
    return (
        <div className="flex justify-between items-center px-4 py-3">
            <div className="text-sm text-slate-500">
                Mostrando <b>1-{props.itens}</b> de {props.totalItens}
            </div>
            <div className="flex space-x-1">
                <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                    Anterior
                </button>
                <button disabled={props.hasNext} className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                    Próximo
                </button>
            </div>
        </div>
    )
}