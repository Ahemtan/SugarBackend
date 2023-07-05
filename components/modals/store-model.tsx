"use client";

import { userStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
    const storeModal = userStoreModal();
    return(
        <Modal title="Create Store" description="Add a new store!!" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            Form components
        </Modal>
    )
}