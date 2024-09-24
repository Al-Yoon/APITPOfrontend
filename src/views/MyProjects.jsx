import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TransitionsModal from '../components/Body/ModalProyects';
import Historial from '../components/Assets/historial.svg';
import UpArrow from '../components/Assets/arrow-up-outline.svg';
import DownArrow from '../components/Assets/arrow-down-outline.svg';
import DeleteButton from '../components/layout/DeleteButton';

const MyProjects = () => {
    const initialProjects = [
        { name: "Finde Pasado", description: "Finde Pasado", date: "9/18/2024", slug: "proyecto-finde-pasado" }
    ];
    const [projects, setProjects] = useState(() => {
        const savedProjects = JSON.parse(localStorage.getItem('projects'));
        return savedProjects || initialProjects;
    });
    const [userBalance, setUserBalance] = useState(() => {
        const savedBalance = localStorage.getItem('userBalance');
        return savedBalance ? parseFloat(savedBalance) : 0;
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProjectSlug, setSelectedProjectSlug] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    useEffect(() => {
        localStorage.setItem('userBalance', userBalance);
    }, [userBalance]);

    const getTotalAmount = (slug) => {
        const storedTotal = localStorage.getItem(`totalAmountFor${slug.replace(/-/g, '')}`);
        return storedTotal ? JSON.parse(storedTotal) : 0;
    };

    const getTotalProjectAmount = () => {
        return projects.reduce((sum, project) => sum + getTotalAmount(project.slug), 0);
    };

    const addProject = (newProject) => {
        const projectSlug = newProject.name.trim().toLowerCase().replace(/\s+/g, '-');
        setProjects([...projects, { ...newProject, slug: projectSlug }]);
    };

    const handleViewProject = (slug) => {
        const path = slug === "proyecto-finde-pasado" ? `/projects/proyecto-finde-pasado` : `/newprojects/${slug}`;
        navigate(path);
    };

    const handleDeleteProject = () => {
        const updatedProjects = projects.filter(project => project.slug !== selectedProjectSlug);
        setProjects(updatedProjects);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        localStorage.removeItem(`totalAmountFor${selectedProjectSlug.replace(/-/g, '')}`);
        setShowDeleteModal(false);
    };

    const handleBalanceChange = (e) => {
        setUserBalance(e.target.value);
    };

    return (
        <div className="w-full bg-white px-4 text-black">
            <p className="max-w-[1240px] md:text-2xl sm:text-1xl text-xl pl-4">Mis</p>
            <h1 className="font-bold md:text-3xl sm:text-2xl text-xl pb-3 pl-4">Proyectos</h1>
            <div className="max-w-auto mx-auto pl-5 pr-5 grid md:grid-cols-3 gap-10">
                
                <div className="w-[20] shadow-2xl bg-white p-4 md:my-0 my-8 text-black rounded-lg">
                    <h2 className='text-2xl font-bold text-center py-8 flex justify-center'>Crear Proyecto</h2>
                    <p className='text-center text-[#38bdf8] text-4xl font-bold'><TransitionsModal addProject={addProject} /></p>
                    <div className='text-center font-medium'>
                        <p className='py-2 my-5'>Crea un proyecto para luego asignarle los gastos</p>
                    </div>
                </div>
                <div className="w-[20] shadow-2xl bg-white flex flex-col p-4 md:my-0 my-8 text-black rounded-lg">
                    <h2 className='text-2xl font-bold text-center py-8 text-[#38b931] flex justify-center'>Saldo Usuario</h2>
                    <img className='w-20 mx-auto' src={UpArrow} alt="/"/>
                    <input 
                        type="number"
                        value={userBalance}
                        onChange={handleBalanceChange}
                        className="text-center text-3xl font-bold mx-auto my-auto pl-3"
                        style={{ maxWidth: '80%' }}
                    />
                </div>

                <div className="w-[20] shadow-2xl bg-white flex flex-col p-4 md:my-0 my-8 text-black rounded-lg">
                    <h2 className='text-2xl font-bold text-center py-8 text-[#c43434] flex justify-center'>Total Proyectos</h2>
                    <img className='w-20 mx-auto' src={DownArrow} alt="/"/>
                    <div className='text-center font-medium'>
                        <p className='py-2 my-5 text-3xl font-bold  pl-3'>{getTotalProjectAmount()} $</p>
                    </div>
                </div>

                {projects.map((project, index) => (
                    <div key={index} className="w-[20] shadow-2xl bg-white flex flex-col p-4 md:my-0 my-8 text-black rounded-lg">
                        <img className='w-20 mx-auto mt-auto bg-transparent' src={Historial} alt="/" />
                        <h2 className='text-2xl font-bold text-center pt-8 flex justify-center '>Proyecto: {project.name}</h2>
                        <div className='text-center font-medium'>
                            <p className='py-2 my-5'>{project.description}</p>
                            <p className='py-2 my-5'>{project.date}</p>
                            <p className='py-2 my-5'>Gastado: {getTotalAmount(project.slug)} $</p>
                        </div>
                        <button className='bg-[#38bdf8] text-black w-2/3 rounded-md font-medium my-6 mx-auto px-6 py-3 flex justify-center' onClick={() => handleViewProject(project.slug)}>
                            Ver Proyecto
                        </button>
                        <button
                            className='bg-[#e57373] text-red-700 w-2/3 rounded-md font-medium my-6 mx-auto px-6 py-3 flex justify-center'
                            onClick={() => {
                                setSelectedProjectSlug(project.slug);
                                setShowDeleteModal(true); }}>
                            Eliminar Proyecto
                        </button>
                    </div>
                ))}
            </div> {showDeleteModal && (<DeleteButton onDelete={handleDeleteProject}onCancel={() => setShowDeleteModal(false)}/>)} </div>
    );
};

export default MyProjects;