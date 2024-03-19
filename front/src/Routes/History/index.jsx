import React, { useEffect, useState } from 'react';
import TableTemplate from '../../components/TableTemplate';
import './index.css';
import Header from '../../components/Header';

export const History = () => {
    const [history, setHistory] = useState([]);

    const columns = [
        { key: 'code', title: 'Code' },
        { key: 'total', title: 'Total' },
        { key: 'tax', title: 'Tax' }
    ];

    useEffect(() => {
        showHistory();
        setupModalListeners();
    }, []); // Adicionando um array vazio para garantir que useEffect só execute uma vez

    function showHistory() {
        fetch("http://localhost:80/controllers/historyController.php")
            .then(res => res.json())
            .then(data => {
                setHistory(data);
            })
            .catch(error => console.log(error));
    }

    function setupModalListeners() {
        const openModalButtons = document.querySelectorAll('[data-modal-target]');
        const closeModalButtons = document.querySelectorAll('[data-close-button]');
        const overlay = document.getElementById('overlay');

        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = document.querySelector(button.dataset.modalTarget);
                const orderId = button.closest('tr').querySelector('td:first-child').innerText;

                fetch(`http://localhost:80/controllers/historyController.php?code=${orderId}`)
                    .then(res => res.json())
                    .then(data => {
                        const modalBody = modal.querySelector('.modal-body');
                        modalBody.innerHTML = '';
                        data.forEach(item => {
                            modalBody.innerHTML += `
                                <div><b>Product name</b>: ${item.name}</div>
                                <div><b>Amount</b>: ${item.amount} u</div>
                                <div><b>Price</b>: $${item.price}</div>
                                <div><b>Tax</b>: ${item.tax}%</div>
                                <br>
                            `;
                        });
                        openModal(modal);
                    })
                    .catch(error => console.log(error));
            });
        });

        overlay.addEventListener('click', () => {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                closeModal(modal);
            });
        });

        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                closeModal(modal);
            });
        });
    }

    function openModal(modal) {
        if (modal === null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    function closeModal(modal) {
        if (modal === null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }

    return (
        <>
        <div className='historyContainer'>
            <div className='modal' id='modal'>
                <div className="modal-header">
                    <div className="title">Details</div>
                    <button data-close-button className="closeBtn">&times;</button>
                </div>
                <div className="modal-body"></div>
            </div>
            <div id='overlay'></div>
            <TableTemplate data={history} columns={columns} handleView={setupModalListeners} />
        </div>
        </>
    );
};