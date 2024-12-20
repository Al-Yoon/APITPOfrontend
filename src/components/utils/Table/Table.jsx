import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from "react-csv";

function Table({ data }) {
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageClick = (image) => {
        setPreviewImage(URL.createObjectURL(image));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA'); // 'en-CA' formatea la fecha como YYYY-MM-DD
    };

    const columns = [
        {
            name: "Numero de Ticket",
            selector: row => row.id,
            sortable: true,
        },
        {
            name: "Descripcion",
            selector: row => row.descripcion,
            sortable: true,
        },
        {
            name: "Fecha",
            selector: row => formatDate(row.fecha),
            sortable: true,
        },
        {
            name: "Monto",
            selector: row => row.monto,
            sortable: true,
        },
        {
            name: "Imagen Ticket",
            cell: row => row.imageUrl ? (
                <a href="#!" onClick={() => handleImageClick(row.imageUrl)}>
                    {row.image.name}
                </a>
            ) : "Sin Imagen",
        },
    ];

    return (
        <div>
            <DataTable columns={columns} data={data} />
            {previewImage && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0px 0px 15px rgba(0,0,0,0.5)'
                }}>
                    <img src={previewImage} alt="Preview" style={{ maxWidth: '500px', maxHeight: '500px' }} />
                    <br />
                    <button onClick={() => setPreviewImage(null)}>Cerrar</button>
                </div>
            )}
            <div className="flex mt-3">
                <CSVLink data={data} filename="historial_tickets.csv" className='text-[#2c392e]'>
                    <button className='bg-[#42e663] px-4 py-2 hover:text-white rounded-lg font-medium font-sans'>
                        Generar Reporte
                    </button>
                </CSVLink>
            </div>
        </div>
    );
}

export default Table;