'use client';

import { useEffect, useState } from "react"
import { deleteById, findAll } from "../../services/instituicoes.service";
import { deleteById as deleteEventoById } from "../../services/eventos.service";
import { toast } from "react-toastify";
import Page from "../../types/page.type";
import CardHeader from "../card/header";
import Card from "../card/card";
import CardFooter from "../card/footer";
import CardContent from "../card/content";
import EditButton from "../buttons/edit-btn";
import DeleteButton from "../buttons/delete-btn";
import { Popover } from "flowbite-react";
import InstituicaoModal from "./instituicoes.modal";
import EventoModal from "./eventos/eventos.modal";

export default function InstituicoesList() {
    const [data, setData] = useState({} as Page);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEvento, setOpenModalEvento] = useState(false);
    const [institucaiIdEdit, setInstituicaoIdEdit] = useState('' as string | undefined);
    const [eventoEdit, setEventoEdit] = useState({});
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (!openModal && !openModalEvento) {
            retrieveData();
            setInstituicaoIdEdit(undefined);
            setEventoEdit({});
        }
    }, [openModal, openModalEvento, page]);

    const retrieveData = async () => {
        const response = await findAll(page);
        if (response.data) {
            setData(response.data);
        } else {
            toast("Erro ao carregar dados.");
        }
    }

    const getTipoInstituicaoDescription = (tipo: string) => {
        switch (tipo) {
            case "COOPERATIVA": return "Cooperativa"
            case "CONFEDERACAO": return "Confederação"
            case "SINGULAR": return "Singular"
            case "CENTRAL": return "Central"
            default: return "Tipo não identificado"
        }
    }

    const open = (instituicao?: string) => {
        setInstituicaoIdEdit(instituicao);
        setOpenModal(true);
    }

    const openEvento = (instituicaoId: string, evento?: string) => {
        setEventoEdit({ instituicaoId, evento });
        setOpenModalEvento(true);
    }

    const deleteInstituicao = async (id: string) => {
        try {
            await deleteById(id);
            toast("Instituição excluída com sucesso", {
                theme: "dark",
                type: "success"
            });
            retrieveData();
        } catch (e: any) {
            toast(<div><strong>Erro ao excluir instituição</strong><br /> {e.response.data.message} </div>, {
                theme: "dark",
                type: "error"
            })
        }
    }


    const deleteEvento = async (instituicaoId: string, id: string) => {
        try {
            await deleteEventoById(instituicaoId, id);
            toast("Evento excluído com sucesso", {
                theme: "dark",
                type: "success"
            });
            retrieveData();
        } catch (e: any) {
            toast(<div><strong>Erro ao excluir evento</strong><br /> {e.response.data.message} </div>, {
                theme: "dark",
                type: "error"
            })
        }
    }

    const formatDateTime = (dateTime: string) => {
        return new Date(dateTime).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const getPopover = (instituicao: any) => {
        if (instituicao.eventos && instituicao.eventos.length > 0) {
            return <div className="w-auto text-md text-gray-500 dark:text-gray-400 p-5">
                <div className="border-b border-gray-200 px-3 py-2">
                    <h3 id="default-popover" className="font-semibold text-gray-900 dark:text-white">Eventos</h3>
                </div>
                <table className="table-auto border-collapse w-full">
                    <thead>
                        <tr>
                            <th className="border-b border-gray-300 px-4 py-2">Nome</th>
                            <th className="border-b border-gray-300 px-4 py-2">Data/Hora Início</th>
                            <th className="border-b border-gray-300 px-4 py-2">Data/Hora Fim</th>
                            <th className="border-b border-gray-300 px-4 py-2">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instituicao.eventos && instituicao.eventos.length > 0 && instituicao.eventos.map((ev: any) =>
                            <tr key={ev.id} className="hover:bg-slate-50">
                                <td className="border-b border-gray-300 px-4 py-2">{ev.nome}</td>
                                <td className="border-b border-gray-300 px-4 py-2">{formatDateTime(ev.dataHoraInicio)}</td>
                                <td className="border-b border-gray-300 px-4 py-2">{formatDateTime(ev.dataHoraFim)}</td>
                                <td className="border-b border-gray-300 px-4 py-2">
                                    <EditButton action={() => openEvento(instituicao.id, ev.id)} />
                                    <DeleteButton action={() => deleteEvento(instituicao.id, ev.id)} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button
                    className="mt-5 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button"
                    onClick={() => openEvento(instituicao.id)}
                    data-modal-target="default-modal" data-modal-toggle="default-modal">
                    Adicionar
                </button>
            </div>
        }

        return <div className="w-auto text-md text-gray-500 dark:text-gray-400 p-5">
            <div className="border-b border-gray-200 px-3 py-2">
                <h3 id="default-popover" className="font-semibold text-gray-900 dark:text-white">Nenhum eventos cadastrado.</h3>
            </div>
            <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
                onClick={() => openEvento(instituicao.id)}
                data-modal-target="default-modal" data-modal-toggle="default-modal">
                Adicionar
            </button>
        </div>
    }

    const getIndicadorEventos = (eventos: any[]) => {
        if (eventos && eventos.length > 1) {
            return <span className="pl-2 text-sm text-slate-500 w-fit text-blue-600 underline">(+{eventos.length - 1})</span>
        }
    }

    return (
        <Card>
            <CardHeader title="Instituição" btnAction={() => open("")} />
            <CardContent>
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-200 bg-slate-50 w-2/4">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Nome
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Tipo
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Eventos
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Ações
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.content && data.content.map(instituicao =>
                            <tr className="hover:bg-slate-50 border-b border-slate-200" key={instituicao.id}>
                                <td className="p-2">
                                    <p className="block font-semibold text-sm text-slate-800">{instituicao.nome}</p>
                                </td>
                                <td className="p-2">
                                    <p className="text-sm text-slate-500">{getTipoInstituicaoDescription(instituicao.tipo)}</p>
                                </td>
                                <td className="p-2">
                                    <Popover content={getPopover(instituicao)}>
                                        <div className="flex w-fit">
                                            <p className="text-sm text-slate-500 w-fit">{instituicao.eventos && instituicao.eventos.length > 0
                                                ? instituicao.eventos[0].nome
                                                : "Nenhum evento cadastrado."}</p>

                                            {getIndicadorEventos(instituicao.eventos)}
                                        </div>
                                    </Popover>
                                </td>
                                <td className="p-2">
                                    <EditButton action={() => open(instituicao.id)} />
                                    <DeleteButton action={() => deleteInstituicao(instituicao.id)} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <CardFooter hasNext={data.hasNext} totalItens={data.totalItens} itens={data.content?.length ?? 0} setPage={setPage} page={page} />
            </CardContent>
            <InstituicaoModal openModal={openModal} setOpenModal={setOpenModal} instituicaoId={institucaiIdEdit} />
            <EventoModal openModal={openModalEvento} setOpenModal={setOpenModalEvento} dados={eventoEdit} />
        </Card>
    )
}