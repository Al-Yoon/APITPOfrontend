import DataTable from 'react-data-table-component';
import * as React from 'react';
import { notify } from '../../../api/projects_api';

function TableUsers({ updatePercentage, totalAmount, handlePayment, paidAmount, data }) {

    const handlePercentageChange = (e, rowIndex) => {
        const newPercentage = parseFloat(e.target.value);
        if (!isNaN(newPercentage)) {
            updatePercentage(rowIndex, newPercentage);
        }
    };

    const handleSendNotification = (index, email, amount, isPaid) => {
        if (isPaid) {
            alert(`El miembro ${email} ya ha realizado el pago.`);
            return;
        }

        const remainingAmount = totalAmount - paidAmount;
        if (parseFloat(amount) > remainingAmount) {
            alert(`El monto a pagar excede el monto restante. Falta pagar: ${remainingAmount.toFixed(2)} $ (${((remainingAmount / totalAmount) * 100).toFixed(2)}%)`);
            return;
        }

        notify(email); //mail
        alert(`Notificación Enviada a ${email}`);
        handlePayment(index, amount);
    };

    const columns = [
        {
            name: "Numero de Usuario",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Nombre",
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true
        },
        {
            name: "Porcentaje",
            cell: (row, index) => (
                <input 
                    type="number"
                    value={row.percentage}
                    onChange={(e) => handlePercentageChange(e, index)}
                    style={{ width: '60px' }}
                    disabled={row.paid}
                />
            )
        },
        {
            name: "Monto a Pagar",
            selector: row => (totalAmount * row.percentage / 100).toFixed(2),
            sortable: true
        },
        {
            name: "Acciones",
            cell: (row, index) => (
                <button
                    className={`bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-[#38bdf8] ${row.paid ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleSendNotification(index, row.email, (totalAmount * row.percentage / 100).toFixed(2), row.paid)}
                    disabled={row.paid}
                >
                    {row.paid ? 'Pagado' : 'Enviar Notificación'}
                </button>
            )
        }
    ];

    const totalPercentage = data.reduce((total, member) => total + member.percentage, 0);

    return (
        <div>
            <DataTable 
                columns={columns} 
                data={data} 
                selectableRows 
                pagination 
                fixedHeader 
            />
            <div style={{ padding: '10px', fontWeight: 'bold' }}>
                Total Porcentaje: {totalPercentage}% (Falta {100 - totalPercentage}%)
            </div>
        </div>
    );
}

export default TableUsers;