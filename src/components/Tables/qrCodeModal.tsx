import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // qrCodeImageUrl: string | null;
  onDownload: () => void;
}




export const QrCodeModal: React.FC<ModalProps> = ({ isOpen, onClose, onDownload }) => {
  const { qrCode } = useSelector((state: RootState) => state.tables)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>QR Code Preview</DialogTitle>
        </DialogHeader>
        <div className="text-center">
          {qrCode ? (
            <img src={qrCode} alt="QR Code" className="mx-auto" />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onDownload} disabled={!qrCode}>
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}