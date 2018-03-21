import React from 'react'
import { Modal, Header, Input, Form, Button } from 'semantic-ui-react'

const AddUsersToTeamModal = ({
    open,
    toggleAddUsersToTeamModal,
    addUserEmail,
    addUserEmailError,
    onChange,
    handleAddUsersToTeamSubmit,
    isSubmitting,
    teamId
}) => (
    <Modal open={open} className="modal-container" onClose={toggleAddUsersToTeamModal}>
        <Modal.Header>Add a users to this team!</Modal.Header>
        <Modal.Content>
            <Header>Add users to your team!</Header>
            <Form>
                <Form.Field>
                    <Input
                        placeholder="email"
                        name="addUserEmail"
                        onChange={onChange}
                        value={addUserEmail}
                        fluid
                    />
                </Form.Field>
                <Form.Group widths="equal">
                    <Button disabled={isSubmitting} onClick={handleAddUsersToTeamSubmit} fluid>
                        Add user
                    </Button>
                    <Button disabled={isSubmitting} onClick={toggleAddUsersToTeamModal} fluid>
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
        </Modal.Content>
    </Modal>
)

export default AddUsersToTeamModal
