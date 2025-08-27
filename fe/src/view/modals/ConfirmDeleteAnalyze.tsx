import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
interface ConfirmOrderModalProps {
  onConfirm: (analyzeId: string) => void;
  onClose: () => void;

  analyzeId: string;
  isOpen: boolean;
}

export function ConfirmDeleteAnalyze({
  onConfirm,
  onClose,
  analyzeId,
  isOpen,
}: ConfirmOrderModalProps) {
  return (
    <Modal title="Confirmação do Pedido" open={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <p className=" sm:text-base text-sm ">
          Tem certeza que deseja deletar esta análise ?
        </p>

       

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="ghost" className="px-4" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="px-4" onClick={() => onConfirm(analyzeId)}>
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
