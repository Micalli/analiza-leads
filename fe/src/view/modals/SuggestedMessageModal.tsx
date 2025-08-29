import toast from "react-hot-toast";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { Copy } from "lucide-react";
interface SuggestedMessageProps {
  suggestedMessage: string | undefined;
  onClose: () => void;

  isOpen: boolean;
}

export function SuggestedMessageModal({
  suggestedMessage,
  onClose,
  isOpen,
}: SuggestedMessageProps) {
  function copyToClipboard(text: string | undefined) {
    if (!text) return;
    if (!navigator.clipboard) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
        toast.success("Mensagem copiada!");
      } catch (err) {
        console.log("🚀 ~ copyToClipboard ~ err:", err);
      }
      document.body.removeChild(textarea);
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Mensagem copiada!"))
      .catch(() => toast.error("Erro ao copiar!"));
  }

  return (
    <Modal title="Mensagem sugerida" open={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <p className=" text-white sm:text-base text-sm ">
          Aqui vai a mensagem sugerida para o lead:
        </p>

        <div className="relative p-3 bg-black/10 border border-black/10 rounded-lg">
          <div title="Copiar mensagem">
            <Copy
              className="text-gray-300 absolute top-2 right-2 cursor-pointer hover:text-white transition"
              onClick={() => copyToClipboard(suggestedMessage)}
            />
          </div>
          <p className="text-sm text-gray-300 font-light whitespace-pre-wrap pr-8">
            {suggestedMessage}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" className="px-4" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
