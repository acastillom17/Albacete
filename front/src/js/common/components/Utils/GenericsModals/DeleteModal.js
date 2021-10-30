import React from "react";
import { Modal } from "antd";

const DeleteModal = (props) => {
    const { item_name, closeModal, handleSubmit, size , visible } = props;

    return (
        <Modal
            title=""
            width={size}
            visible={visible}
            onOk={closeModal}
            onCancel={closeModal}
            footer={[]}
        >
            <div>
                <h3 style={{ textAlign: "center" }} className="pb-50">
                    Confirmación de eliminación
                </h3>
                <p style={{ textAlign: "center" }} className="pb-50">
                    ¿Estás por eliminar <b>{`${item_name}`}</b> de forma
                    permanente?
                </p>
                <div className="d-flex justify-content-around ">
                    <button
                        className="ps-btn ps-btn--gray"
                        onClick={closeModal}
                    >
                        Cancelar
                    </button>
                    <button className="ps-btn" onClick={handleSubmit}>
                        Confirmar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
