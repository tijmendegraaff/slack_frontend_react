import React from 'react'
import { Modal, Header, Input, Form, Button } from 'semantic-ui-react'

const AddChannelModal = ({
    open,
    onCloseAddChannelModal,
    channelName,
    onChange,
    handleChannelSubmit,
    isSubmitting
}) => (
    <Modal open={open} className="modal-container" onClose={onCloseAddChannelModal}>
        <Modal.Header>Add a channel!</Modal.Header>
        <Modal.Content>
            <Header>Please enter a channelName</Header>
            <Form>
                <Form.Field>
                    <Input
                        placeholder="channel name"
                        name="channelName"
                        onChange={onChange}
                        value={channelName}
                        fluid
                    />
                </Form.Field>
                <Form.Group widths="equal">
                    <Button disabled={isSubmitting} onClick={handleChannelSubmit} fluid>
                        Create Channel
                    </Button>
                    <Button disabled={isSubmitting} onClick={onCloseAddChannelModal} fluid>
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
        </Modal.Content>
    </Modal>
)

export default AddChannelModal
