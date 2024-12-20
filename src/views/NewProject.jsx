import React, { useState, useEffect } from 'react';
import ModalTickets from "../components/utils/Modal/ModalTickets.jsx";
import ModalMiembros from "../components/utils/Modal/ModalMiembros";
import Cloud from "../components/Assets/cloud.svg";
import Table from "../components/utils/Table/Table.jsx";
import TableUsers from "../components/utils/Table/TableUsers.jsx";
import DeleteButton from '../components/utils/Buttons/DeleteProjectButton.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicketsProject, getProject } from '../api/project_alone_api.js';
import { getUsers } from '../api/users_project';

const NewProject = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [tickets, setTickets] = useState([]);
    const [members, setMembers] = useState([]);
    const [paidAmount, setPaidAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura del modal

    useEffect(() => {
        const fetchData = async () => {
            const project = await getProject(id);
            setProjectName(project.nombre);
            const dataTickets = await getTicketsProject(id);
            setTickets(dataTickets);

            // Cargar miembros desde localStorage
            const storedMembers = localStorage.getItem(`members_${id}`);
            if (storedMembers) {
                setMembers(JSON.parse(storedMembers));
            } else {
                const dataM = await getUsers(id);
                setMembers(dataM);
                // Guardar miembros iniciales en localStorage
                localStorage.setItem(`members_${id}`, JSON.stringify(dataM));
            }

            // Cargar monto pagado desde localStorage
            const storedPaidAmount = localStorage.getItem(`paidAmount_${id}`);
            if (storedPaidAmount) {
                setPaidAmount(parseFloat(storedPaidAmount));
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const total = tickets.reduce((sum, ticket) => sum + (ticket.monto || 0), 0);
        setTotalAmount(total);
    }, [tickets]);

    const addTicket = (newTicket) => {
        setTickets([...tickets, newTicket]);
        return true;
    };

    const addMember = (newMember) => {
        const existingMember = members.find(member => member.email === newMember.email);
        if (existingMember) {
            return false;
        }
        const updatedMembers = [...members, { ...newMember, percentage: 0, paid: false }];
        setMembers(updatedMembers);

        // Guardar miembros actualizados en localStorage
        localStorage.setItem(`members_${id}`, JSON.stringify(updatedMembers));
        return true;
    };

    const updatePercentage = (index, newPercentage) => {
        const updatedMembers = [...members];
        updatedMembers[index].percentage = newPercentage;
        setMembers(updatedMembers);

        // Guardar miembros actualizados en localStorage
        localStorage.setItem(`members_${id}`, JSON.stringify(updatedMembers));
    };

    const handlePayment = (index, amount) => {
        const updatedMembers = [...members];
        updatedMembers[index].paid = true;
        const newPaidAmount = paidAmount + parseFloat(amount);
        setPaidAmount(newPaidAmount);
        setMembers(updatedMembers);

        // Guardar miembros y monto pagado actualizados en localStorage
        localStorage.setItem(`members_${id}`, JSON.stringify(updatedMembers));
        localStorage.setItem(`paidAmount_${id}`, newPaidAmount.toString());
    };

    const handleDeleteProject = () => {
        setShowDeleteModal(false);
        navigate('/myprojects');
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const remainingAmount = totalAmount - paidAmount;

    return (
        <div className="w-screen py-auto bg-white px-4 text-black pt-5">
            <p className="max-w-auto md:text-2xl sm:text-1xl text-xl pl-4">Proyecto: </p>
            <h1 className="font-bold md:text-3xl sm:text-2xl text-xl pb-3 pl-4">{projectName}</h1>
            <div className="max-w-auto mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">

                <div className="w-full shadow-md flex flex-col p-4 md:my-0 my-8 rounded-lg">
                    <h2 className='text-2xl font-bold text-center py-8'>Gastos</h2>
                    <p className='text-center text-[#38bdf8] text-4xl font-bold'>{totalAmount} $</p>
                    <div className='text-center font-medium'>
                        <p className='py-2 my-5'>Total Gasto Tickets</p>
                    </div>
                </div>

                <div className="w-full shadow-md flex flex-col p-4 md:my-0 my-8 rounded-lg">
                    <h2 className='text-2xl font-bold text-center py-8'>Pagado</h2>
                    <p className='text-center text-red-600 text-4xl font-bold'>{paidAmount.toFixed(2)} $</p>
                    <div className='text-center font-medium'>
                        <p className='py-2 my-5'>Total Pagado por los miembros</p>
                    </div>
                </div>

                <div className="w-full shadow-md flex flex-col p-4 md:my-0 my-8 rounded-lg">
                    <h2 className='text-2xl font-bold text-center py-8'>Falta Pagar</h2>
                    <p className={`text-center text-4xl font-bold ${remainingAmount === 0 ? 'text-green-600' : 'text-red-600'}`}>{remainingAmount.toFixed(2)} $</p>
                    <div className='text-center font-medium'>
                        <p className='py-2 my-5'>Total a pagar restante.</p>
                    </div>
                </div>

                <div className="w-screen my-5 flex justify-center px-4  rounded-lg shadow-lg h-[300px]">
                    <div className="max-w-auto mx-5 my-auto items-center p-5">
                        <div className="w-full h-auto flex flex-col p-4 mx-auto">
                            <img className='w-20 mx-auto mt-auto bg-transparent mb-10' src={Cloud} alt="/" />
                            <p className='text-center text-2xl font-medium font-sans pb-5'>Carga Manualmente el Ticket</p>
                            <button
                                className='bg-[#299ad78d] hover:text-white w-auto rounded-md font-medium font-sans my-auto mx-auto px-6 py-3'
                                onClick={handleOpenModal}
                            >
                                Carga Manual
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full py-16 text-black px-4'>
                <div className='border-4 border-double border-r-[#38bdf8] border-t-[#38bdf8] border-l-black border-b-black py-5 px-5 rounded-lg'>
                    <p className="max-w-auto md:text-2xl sm:text-1xl text-xl pl-4">Tickets Seleccionados</p>
                    <Table data={tickets} />
                </div>
                <div className='border-4 border-double border-r-[#38bdf8] border-t-[#38bdf8] border-l-black border-b-black my-5 py-5 px-5 rounded-lg shadow-xl'>
                    <p className="max-w-auto md:text-2xl sm:text-1xl text-xl pl-1 pt-10">Añadir Miembros</p>
                    <ModalMiembros addMember={addMember} />
                    <TableUsers data={members} updatePercentage={updatePercentage} totalAmount={totalAmount} paidAmount={paidAmount} handlePayment={handlePayment} />
                    {showDeleteModal && (<DeleteButton onDelete={handleDeleteProject} onCancel={() => setShowDeleteModal(false)} />
                    )}
                </div>
            </div>

            <ModalTickets
                addTicket={addTicket}
                id={id}
                open={openModal}
                handleClose={handleCloseModal}
            />
        </div>
    );
};

export default NewProject;