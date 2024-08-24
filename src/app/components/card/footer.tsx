import { Button } from "flowbite-react"

type Props = {
    hasNext: boolean,
    totalItens: number,
    itens: number,
    setPage: Function,
    page: number,
}

export default function CardFooter(props: Props) {
    return (
        <div className="flex justify-between items-center px-4 py-3">
            <div className="text-sm text-slate-500">
                Mostrando <b>{1}-{props.itens}</b> de {props.totalItens}
            </div>
            <div className="flex space-x-1">
                <Button onClick={() => props.setPage((props.page - 1))} disabled={props.page == 0} color={"gray"} className="xs min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                    Anterior
                </Button>
                <Button onClick={() => props.setPage((props.page + 1))} disabled={props.hasNext == false} color={"gray"} className="xs min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                    Próximo
                </Button>
            </div>
        </div>
    )
}