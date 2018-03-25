import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Header, Form, Button } from 'semantic-ui-react'
import { MultiSelectUserInput } from '../components'

const DirectMessageModal = ({
    open,
    toggleDirectMessageModal,
    handleAddDirectMessageMembers,
    currentUserId,
    members,
    directChannelMembers,
    isSubmitting,
    handleDirectMessageSubmit
}) => (
    <Modal open={open} className="modal-container" onClose={toggleDirectMessageModal}>
        <Modal.Header>Start a private chat!</Modal.Header>
        <Modal.Content>
            <Header>Find a user</Header>
            <Form>
                <Form.Field>
                    <MultiSelectUserInput
                        selectedMembers={directChannelMembers}
                        members={members}
                        currentUserId={currentUserId}
                        placeholder="start chat with:"
                        handleChange={handleAddDirectMessageMembers}
                    />
                </Form.Field>
                <Form.Group widths="equal">
                    <Button disabled={isSubmitting} onClick={handleDirectMessageSubmit} fluid>
                        Start chatting!
                    </Button>
                    <Button disabled={isSubmitting} onClick={toggleDirectMessageModal} fluid>
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
        </Modal.Content>
    </Modal>
)

DirectMessageModal.propTypes = {
    open: PropTypes.bool.isRequired,
    toggleDirectMessageModal: PropTypes.func.isRequired,
    handleDirectMessageSubmit: PropTypes.func.isRequired,
    members: PropTypes.array.isRequired,
    directChannelMembers: PropTypes.array.isRequired,
    handleAddDirectMessageMembers: PropTypes.func.isRequired,
    currentUserId: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired
}

export default DirectMessageModal
