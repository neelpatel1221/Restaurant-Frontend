import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { deleteable, getTableQrCode, getTables } from "@/features/tableSlice";
<<<<<<< Updated upstream
import toast, { Toaster } from "react-hot-toast";
import { Plus, QrCode, Pencil, Trash } from "lucide-react";
=======
>>>>>>> Stashed changes

import { Button } from "@/components/ui/button";
import { QrCodeModal } from "./qrCodeModal";
import { TableForm } from "./TableForm";
<<<<<<< Updated upstream
=======
import { Toaster } from "../ui/toaster";
import { toast } from "@/components/ui/use-toast"; // ✅ Added import

// ✅ Added required icons
import { Plus, QrCode, Pencil, Trash } from "lucide-react";
>>>>>>> Stashed changes

export type Payment = {
  _id: string;
  tableNumber: number;
  isAvailable: boolean;
  qrCode: string;
  seating: number;
};

export function DataTableDemo() {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [tableId, setTableId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { tables, error, success, qrCode } = useSelector(
    (state: RootState) => state.tables
  );

  // ✅ Fetch tables on mount
  useEffect(() => {
    dispatch(getTables());
<<<<<<< Updated upstream
  }, []);
=======
  }, [dispatch]);
>>>>>>> Stashed changes

  // ✅ Show error toast
  useEffect(() => {
<<<<<<< Updated upstream
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (success) toast.success(success);
=======
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
  }, [error]);

  // ✅ Show success toast
  useEffect(() => {
    if (success) toast({ title: "Success", description: success });
>>>>>>> Stashed changes
  }, [success]);

  const openQrCodeModal = async (id: string) => {
    try {
<<<<<<< Updated upstream
      dispatch(getTableQrCode(id));
=======
      await dispatch(getTableQrCode(id));
>>>>>>> Stashed changes
      setIsQrModalOpen(true);
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  const handleAddTable = () => {
    setIsTableModalOpen(true);
<<<<<<< Updated upstream
  };

  const closeQrCodeModal = () => {
    setIsQrModalOpen(false);
  };

=======
  };

  const closeQrCodeModal = () => setIsQrModalOpen(false);
>>>>>>> Stashed changes
  const closeTableFormModal = () => {
    setIsTableModalOpen(false);
    setTableId(null);
  };

  const openEditModal = (id: string) => {
    setTableId(id);
    setIsTableModalOpen(true);
  };

  const handleDownload = () => {
    if (!qrCode) return;
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center py-4">
        <Button variant="default" onClick={handleAddTable}>
<<<<<<< Updated upstream
          <Plus /> Add Table
        </Button>
      </div>

      {/* Card/Grid Layout */}
=======
          <Plus className="mr-2 h-4 w-4" /> Add Table
        </Button>
      </div>

      {/* Grid of Tables */}
>>>>>>> Stashed changes
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 py-4">
        {tables.map((tableItem) => (
          <div
            key={tableItem._id}
            className={`p-4 rounded-lg shadow-md border-2 flex flex-col items-center justify-center cursor-pointer transition-transform duration-200
<<<<<<< Updated upstream
        ${tableItem.isAvailable
                ? "bg-green-200 border-green-400 text-green-900 hover:scale-105"
                : "bg-gray-100 border-gray-400 text-black hover:scale-105"
              } 
        hover:shadow-[0_0_10px_2px] hover:shadow-current
      `}
          >
            <div className="text-lg font-bold mb-1">Table {tableItem.tableNumber}</div>
            <div className="text-sm mb-2">Seating: {tableItem.seating ?? 2}</div>
=======
              ${tableItem.isAvailable
                ? "bg-green-200 border-green-400 text-green-900 hover:scale-105"
                : "bg-gray-100 border-gray-400 text-black hover:scale-105"
              }
              hover:shadow-[0_0_10px_2px] hover:shadow-current
            `}
          >
            <div className="text-lg font-bold mb-1">
              Table {tableItem.tableNumber}
            </div>
            <div className="text-sm mb-2">
              Seating: {tableItem.seating ?? 2}
            </div>
>>>>>>> Stashed changes

            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openQrCodeModal(tableItem._id)}
              >
                <QrCode className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openEditModal(tableItem._id)}
              >
                <Pencil className="w-5 h-5 text-black" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={async () => {
                  try {
                    await dispatch(deleteable(tableItem._id)).unwrap();
                    dispatch(getTables());
                  } catch (error) {
                    console.error("Delete failed", error);
                  }
                }}
              >
                <Trash className="w-5 h-5 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
      {/* Modals */}
      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={closeQrCodeModal}
        onDownload={handleDownload}
      />

      <TableForm
        isOpen={isTableModalOpen}
        onClose={closeTableFormModal}
        id={tableId}
      />
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
      <Toaster />
    </div>
  );
}

