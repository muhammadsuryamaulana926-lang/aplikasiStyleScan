import React, { createContext, useState, useContext } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { CheckCircle, WarningCircle, Info, Trash } from 'phosphor-react-native';

type ModalType = 'success' | 'error' | 'info' | 'confirm';

interface ModalOptions {
  title: string;
  message: string;
  type?: ModalType;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

interface ModalContextType {
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType>({} as any);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ModalOptions | null>(null);

  const showModal = (opts: ModalOptions) => {
    setOptions(opts);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setTimeout(() => setOptions(null), 300);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal transparent visible={visible} animationType="fade">
        <View className="flex-1 bg-black/50 items-center justify-center px-6">
          <View className="bg-white w-full rounded-3xl p-6 items-center shadow-lg">
            {options?.type === 'success' && <CheckCircle size={48} color="#10B981" weight="fill" />}
            {options?.type === 'error' && <WarningCircle size={48} color="#EF4444" weight="fill" />}
            {options?.type === 'info' && <Info size={48} color="#3B82F6" weight="fill" />}
            {options?.type === 'confirm' && <Trash size={48} color="#EF4444" weight="fill" />}
            
            <Text className="text-xl font-bold text-black mb-2 mt-4 text-center">{options?.title}</Text>
            <Text className="text-sm text-gray-500 text-center mb-6 leading-relaxed">{options?.message}</Text>
            
            <View className="flex-row w-full space-x-3 justify-between">
              {options?.type === 'confirm' && (
                <TouchableOpacity onPress={hideModal} className="flex-1 py-3.5 rounded-full border border-gray-200 items-center mr-2">
                  <Text className="font-bold text-black">{options?.cancelText || 'Batal'}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                onPress={() => {
                  if (options?.onConfirm) options.onConfirm();
                  hideModal();
                }} 
                className={`flex-1 py-3.5 rounded-full items-center ${options?.type === 'confirm' || options?.type === 'error' ? 'bg-red-500' : 'bg-[#0A4D68]'}`}
              >
                <Text className="font-bold text-white">{options?.confirmText || 'OK'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ModalContext.Provider>
  );
};
