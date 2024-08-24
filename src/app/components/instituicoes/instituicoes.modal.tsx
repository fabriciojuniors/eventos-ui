import { findById, save } from "@/app/services/instituicoes.service";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function InstituicaoModal(props: { openModal: boolean, setOpenModal: Function, instituicaoId?: string }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        reset({});
        setIsProcessing(false);        

        if (props.instituicaoId && props.openModal) {
            loadInstituicao(props.instituicaoId);
        }

    }, [props.openModal, props.instituicaoId])

    const salvar = async (data: any) => {
        setIsProcessing(true);
        try {
            await save(data);

            toast("Instituição salva com sucesso", {
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

    const loadInstituicao = async (instituicaoId: string) => {
        const response = await findById(instituicaoId);

        if (response.data) {
            reset(response.data);
        }
    }

    return (
        <Modal show={props.openModal} size="md" position={"top-center"} popup onClose={() => props.setOpenModal(false)}>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Cadastro de instituição</h3>
                    <form onSubmit={handleSubmit(salvar)}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="nome" value="Nome da instituição" />
                            </div>
                            <TextInput id="nome" placeholder="Informe o nome da instituição" required {...register("nome")} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="nome" value="Nome da instituição" />
                            </div>
                            <Select id="tipo" required {...register("tipo")}>
                                <option value={"CONFEDERACAO"}>Confederação</option>
                                <option value={"SINGULAR"}>Singular</option>
                                <option value={"CENTRAL"}>Central</option>
                                <option value={"COOPERATIVA"}>Cooperativa</option>
                            </Select>
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