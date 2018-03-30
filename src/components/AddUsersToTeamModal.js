import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Header, Input, Form, Button, Message } from 'semantic-ui-react'

const AddUsersToTeamModal = ({
    openAddUsersToTeamModal,
    toggleAddUsersToTeamModal,
    addUserEmail,
    addUserToTeamError,
    onChange,
    handleAddUsersToTeamSubmit,
    isSubmitting
}) => (
    <Modal
        open={openAddUsersToTeamModal}
        className="modal-container"
        onClose={toggleAddUsersToTeamModal}
    >
        <Modal.Header>Add a users to this team!</Modal.Header>
        <Modal.Content>
            <Header>Add users to your team!</Header>
            <Form>
                <Form.Field error={!!addUserToTeamError}>
                    <Input
                        placeholder="email"
                        name="addUserEmail"
                        onChange={onChange}
                        value={addUserEmail}
                        fluid
                    />
                </Form.Field>
                {addUserToTeamError ? <Message size="tiny">{addUserToTeamError}</Message> : null}
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

AddUsersToTeamModal.propTypes = {
    openAddUsersToTeamModal: PropTypes.bool.isRequired,
    toggleAddUsersToTeamModal: PropTypes.func.isRequired,
    addUserEmail: PropTypes.string.isRequired,
    addUserToTeamError: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    handleAddUsersToTeamSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired
}

export default AddUsersToTeamModal
