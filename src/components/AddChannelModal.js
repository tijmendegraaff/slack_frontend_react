import React from 'react'
import { Modal, Header, Image, Input, Form } from 'semantic-ui-react'

const AddChannelModal = ({
    open, onCloseAddChannelModal, channelName, onChange
}) => (
    <Modal open={open} className="modal-container" onClose={onCloseAddChannelModal}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
                <Header>Default Profile Image</Header>
                <Form.Field>
                    <label>channelName</label>
                    <input
                        placeholder="channel name"
                        name="channelName"
                        onChange={onChange}
                        value={channelName}
                    />
                </Form.Field>
            </Modal.Description>
        </Modal.Content>
    </Modal>
)

export default AddChannelModal
