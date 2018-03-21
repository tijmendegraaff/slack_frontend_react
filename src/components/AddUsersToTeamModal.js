import React from 'react'
import { Modal, Header, Input, Form, Button } from 'semantic-ui-react'

const AddUsersToTeamModal = ({
    open,
    onCloseAddUsersToTeamModal,
    channelName,
    onChange,
    handleAddUsersToTeamSubmit,
    isSubmitting
}) => (
    <Modal open={open} className="modal-container" onClose={onCloseAddUsersToTeamModal}>
        <Modal.Header>Add a users to this team!</Modal.Header>
        <Modal.Content>
            <Header>Add users to your team!</Header>
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
                    <Button disabled={isSubmitting} onClick={handleAddUsersToTeamSubmit} fluid>
                        Add user
                    </Button>
                    <Button disabled={isSubmitting} onClick={onCloseAddUsersToTeamModal} fluid>
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
        </Modal.Content>
    </Modal>
)

export default AddUsersToTeamModal
