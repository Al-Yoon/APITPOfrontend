import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalUser from '../components/utils/Modal/ModalUser';
import UserPic from '../components/Assets/user-avatar.svg';
import DeleteUserButton from '../components/utils/Buttons/DeleteUserButton';
import TicketsHistoryTable from '../components/utils/Table/TicketsHistoryTable';
import { AuthContext } from "../components/utils/AuthContextPrueba";
import { updateUser } from "../api/profile_api"
import { getTicketsByUserId } from '../api/tickets_api';

const UserPanel = () => {
    const { user } = useContext(AuthContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();
    const [tempUserData] = React.useState({});
    const [perfil, setPerfil] = React.useState({});
    const [openModal, setOpenModal] = useState(false);
    const [ticketsData, setTicketsData] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return; // Detener ejecución si no hay usuario
        }
    
        const fetchTicketsData = async () => {
            try {
                const tickets = await getTicketsByUserId(user.id);
                setTicketsData(tickets); // Asignar datos resueltos al estado
            } catch (error) {
                console.error("Error al obtener los tickets:", error);
            }
        };
    
        fetchTicketsData(); // Llamar a la función
    }, [user, navigate]);
    

    function validarMail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleUserUpdate = async () => {
        if(tempUserData.user !== "" && validarMail(tempUserData.mail) && tempUserData.pass !== ""){
            const userData = {
                username:tempUserData.user,
                email:tempUserData.mail,
                password:tempUserData.pass
            };
            const updatedProfile = await updateUser(user.id,userData);
            console.log(updatedProfile);
            setPerfil(updatedProfile);
        }
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        user && (
            <div className="w-full py-[5rem] bg-white px-4 text-black">
                <p className="max-w-[1240px] md:text-2xl sm:text-1xl text-xl pl-4">Mi</p>
                <h1 className="font-bold md:text-3xl sm:text-2xl text-xl pb-3 pl-4">Usuario</h1>
                <div className="max-w-auto mx-auto grid md:grid-cols-3 gap-8 pl-5 pr-5">

                    <div className="w-full h-[550px] shadow-2xl flex flex-col p-4 md:my-0 my-8 rounded-lg justify-center">
                        <p className='text-center text-2xl font-bold'>Modificar Usuario</p>
                        <button 
                            className='bg-[#299ad78d] hover:text-white w-2/3 rounded-md font-medium font-sans uppercase my-6 mx-auto px-auto py-3 h-[60px] ' onClick={handleOpenModal} > Modificar </button>
                    </div>
                    
                    <div className="w-[full] h-[550px] shadow-2xl flex flex-col p-4 md:my-0 rounded-lg justify-center">
                        <img className='w-20 mx-auto' src={UserPic} alt="/"/>
                        <div className='text-center font-medium'>
                            <h2 className='text-2xl font-bold text-center pt-8'>Nombre: {user.nombre}</h2>
                            <p className='py-2 my-5'>Email: {user.email}</p>
                        </div>
                    </div>

                    <div className="w-full h-[550px] shadow-2xl flex flex-col p-4 md:my-0 my-8 rounded-lg justify-center">
                        <p className='text-center text-2xl font-bold'>Eliminar Usuario</p>
                        <button className='bg-[#e57373] text-black hover:text-white w-2/3 rounded-md font-medium my-6 mx-auto px-6 h-[60px] font-sans uppercase pb-1' onClick={() => setShowDeleteModal(true)}>Eliminar</button>
                    </div>
                </div>

                {showDeleteModal && (<DeleteUserButton onCancel={() => setShowDeleteModal(false)}/>)}

                <div className="w-full py-10 px-4 mt-10">
                    <p className="max-w-[1240px] md:text-2xl sm:text-1xl text-xl pl-4">Historial de</p>
                    <h1 className="font-bold md:text-3xl sm:text-2xl text-xl pb-3 pl-4">Tickets</h1>
                    <TicketsHistoryTable data={ticketsData}/>
                </div>

                <ModalUser userData={perfil} onUpdateUser={handleUserUpdate} open={openModal} handleClose={handleCloseModal}/>
            </div>
        )
    );
};

export default UserPanel;