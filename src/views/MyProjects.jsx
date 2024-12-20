import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TransitionsModal from '../components/utils/Modal/ModalProyects';
import Historial from '../components/Assets/historial.svg';
import UpArrow from '../components/Assets/arrow-up-outline.svg';
import DownArrow from '../components/Assets/arrow-down-outline.svg';
import DeleteProjectButton from '../components/utils/Buttons/DeleteProjectButton';
import { getProjectByUserId, createProjects } from '../api/projects_api';

const MyProjects = () => {
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const [projects, setProjects] = useState([]);
    const [userBalance, setUserBalance] = useState(() => {
        const savedBalance = localStorage.getItem('userBalance');
        return savedBalance ? parseFloat(savedBalance) : 0;
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getProjectByUserId(userObj.id);
                setProjects(projects);
            } catch (error) {
                console.log("Error al obtener proyectos:", error);
            }
        };

        fetchProjects();
    }, [userObj.id]); // Solo depender de userObj.id

    useEffect(() => {
        localStorage.setItem('userBalance', userBalance);
    }, [userBalance]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA'); // 'en-CA' formatea la fecha como YYYY-MM-DD
    };

    const getTotalAmount = (projectId) => {
        const totalAmount = localStorage.getItem(`totalAmount_${projectId}`);
        return totalAmount ? parseFloat(totalAmount) : 0;
    };

    const getTotalProjectAmount = () => {
        return projects.reduce((sum, project) => sum + getTotalAmount(project.id), 0);
    };

    const addProject = async (newProject) => {
        try {
            const createdProject = await createProjects(newProject);
            setProjects([...projects, createdProject]);
        } catch (error) {
            console.error("Error al crear proyecto:", error);
        }
    };

    const handleBalanceChange = (e) => {
        setUserBalance(e.target.value);
    };

    return (
        <div className="py-auto">
            <div className='w-full py-10 bg-white px-4 text-black'>
                <p className="max-w-auto mx-auto md:text-2xl sm:text-1xl text-xl pl-4">Mis</p>
                <h1 className="font-bold md:text-3xl sm:text-2xl text-xl pb-3 pl-4">Proyectos</h1>      
                <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                
                    <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg">
                        <h2 className='text-2xl font-bold text-center py-8'>Crear Proyecto</h2>
                        <p className='text-center text-[#38bdf8] text-4xl font-bold'><TransitionsModal addProject={addProject}/></p>
                        <div className='text-center font-medium'>
                            <p className='py-2 my-5'>Crea un proyecto para luego asignarle los gastos</p>
                        </div>
                    </div>
                    
                    <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg">
                        <h2 className='text-2xl font-bold text-center py-8 text-[#38b931] flex justify-center'>Saldo Usuario</h2>
                        <img className='w-20 mx-auto' src={UpArrow} alt="/"/>
                        <input type="number" value={userBalance} onChange={handleBalanceChange}
                            className="text-center text-4xl font-bold mx-auto pl-4 pt-4" style={{ maxWidth: '80%' }}
                        />
                    </div>

                    <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg">
                        <h2 className='text-2xl font-bold text-center py-8 text-[#c43434] flex justify-center'>Total Proyectos</h2>
                        <img className='w-20 mx-auto' src={DownArrow} alt="/"/>
                        <div className='text-center font-medium'>
                            <p className='text-4xl py-2 my-5 pl-3 font-bold'>{getTotalProjectAmount()} $</p>
                        </div>
                    </div>

                    {projects.map((project, index) => (
                        <div key={index} className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg">
                            <img className='w-20 mx-auto mt-auto bg-transparent' src={Historial} alt="/" />
                            <h2 className='text-2xl font-bold text-center pt-8 flex justify-center'>Proyecto: {project.nombre}</h2>
                            <div className='text-center font-medium'>
                                <p className='py-2 my-5'>{project.descripcion}</p>
                                <p className='py-2 my-5'>{formatDate(project.fecha)}</p>
                                <p className='py-2 my-5'>Gastado: {getTotalAmount(project.id)} $</p>
                            </div>
                            <Link to={`/newprojects/${project.id}`} className='bg-[#38bdf8] text-black w-2/3 rounded-md font-medium font-sans  my-6 mx-auto px-6 py-3 flex justify-center'> Ver Proyecto </Link>
                            <button className="bg-[#e57373] text-black w-2/3 rounded-md font-medium font-sans my-6 mx-auto px-6 py-3 flex justify-center" onClick={() => { setSelectedProjectId(project.id); setShowDeleteModal(true); }}>Eliminar Proyecto</button>
                        </div>
                    ))}
                    {showDeleteModal && selectedProjectId && ( <DeleteProjectButton projectId={selectedProjectId} onCancel={() => setShowDeleteModal(false)} onDelete={() => { setProjects(projects.filter((p) => p.id !== selectedProjectId)); setShowDeleteModal(false); }}/>)}
                </div>
            </div>
        </div>
    );
};

export default MyProjects;