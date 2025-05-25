
import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
    isModalOpen: false,
    toggleModal: () => { },
    setIsModalOpen: (value: boolean) => { }
})


export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(true);


    return (
        <>
            <ModalContext.Provider value={{ isModalOpen, toggleModal, setIsModalOpen }}>
                {children}
            </ModalContext.Provider>
        </>
    );


};




export const useModalContext = () => {
    const context = useContext(ModalContext)

    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');

    }
    return context

}

