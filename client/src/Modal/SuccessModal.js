import React from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Confetti from "./Confetti";


function SuccessModal({ setSuccess }) {
    const navigate = useNavigate();

    const closeModal = () => {
        navigate('/dashboard');
    }

    return (
        <div className="modalBackground">
            <Confetti/>
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            closeModal()
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h1>Payment Successful</h1>
                </div>
                <div className="body">
                    <p><FontAwesomeIcon icon={faCheckCircle} style={{fontSize: "6rem"}}/></p>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            closeModal();
                        }}
                        id="cancelBtn"
                    >
                        Okay
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SuccessModal;
