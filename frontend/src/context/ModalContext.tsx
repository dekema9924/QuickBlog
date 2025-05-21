
import { createContext, useEffect, useContext, useState } from "react";

const ModalContext = createContext({
    isModalOpen: false,
    toggleModal: () => { }
})


export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(toggle => !toggle);


    return (
        <>
            <ModalContext.Provider value={{ isModalOpen, toggleModal }}>
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

