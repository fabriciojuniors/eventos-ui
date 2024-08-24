import { findById, save } from "@/app/services/eventos.service";
import { Button, Checkbox, Label, Modal, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EventoModal(props: { openModal: boolean, setOpenModal: Function, dados: any }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        reset({});
        setIsProcessing(false);

        if (props.dados.instituicaoId && props.dados.evento && props.openModal) {
            loadEvento(props.dados);
        }

    }, [props.openModal, props.dados])

    const salvar = async (data: any) => {        
        setIsProcessing(true);
        try {
            await save(data, props.dados.instituicaoId);

            toast("Evento salvo com sucesso", {
                theme: "dark",
                type: "success"
            });
            props.setOpenModal(false);
            reset();
        } catch (e: any) {
            toast(<div><strong>{e.response.data.message}</strong> <br /> {e.response.data.details}</div>, {
                theme: "dark",
                type: "error",
                data: "TESTE"
            });
            setIsProcessing(false);
        }

    }

    const loadEvento = async (dados: any) => {
        const response = await findById(dados.instituicaoId, dados.evento);

        if (response.data) {
            reset(response.data);
        }
    }

    return (
        <Modal show={props.openModal} size="md" position={"top-center"} popup onClose={() => props.setOpenModal(false)}>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Cadastro de evento</h3>
                    <form onSubmit={handleSubmit(salvar)}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="nome" value="Nome do evento" />
                            </div>
                            <TextInput id="nome" placeholder="Informe o nome do evento" required {...register("nome")} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="dhInicio" value="Data/Hora Início" />
                            </div>
                            <TextInput id="dhInicio" placeholder="Informe a data/hora de início" required {...register("dataHoraInicio")} type="datetime-local" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="dhFim" value="Data/Hora Fim" />
                            </div>
                            <TextInput id="dhFim" placeholder="Informe a data/hora de fim" {...register("dataHoraFim")} type="datetime-local" />
                        </div>
                        <div className="flex items-center gap-2 mt-5">
                            <Checkbox id="ativo" {...register("ativo")} disabled={true} />
                            <Label htmlFor="ativo" className="flex">
                                Ativo
                            </Label>
                        </div>

                        <div className="mt-5 flex justify-end text-sm font-medium text-gray-500 dark:text-gray-300">
                            <Button color="dark" className="mr-1" onClick={() => props.setOpenModal(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" color="light" isProcessing={isProcessing}>
                                Salvar
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}