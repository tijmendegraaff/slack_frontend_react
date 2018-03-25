import React from 'react'
import { Modal, Header, Input, Form, Button, Checkbox } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { MultiSelectUserInput } from '../components'

const AddChannelModal = ({
    openAddChannelModal,
    toggleAdChannelModal,
    channelName,
    onChange,
    handleChannelSubmit,
    isSubmitting,
    isPublic,
    handleToggleCheckbox,
    members,
    currentUserId,
    placeholder,
    channelMembers,
    handleAddChannelMembers
}) => (
    <Modal open={openAddChannelModal} className="modal-container" onClose={toggleAdChannelModal}>
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
                <Form.Field>
                    <Checkbox
                        toggle
                        label={
                            isPublic
                                ? 'This channel is a public channel. Anyone can join'
                                : 'This channel will be private. You need to invite others to join'
                        }
                        checked={isPublic}
                        onChange={handleToggleCheckbox}
                    />
                </Form.Field>
                {isPublic ? null : (
                    <Form.Field>
                        <MultiSelectUserInput
                            selectedMembers={channelMembers}
                            members={members}
                            currentUserId={currentUserId}
                            placeholder={placeholder}
                            handleChange={handleAddChannelMembers}
                        />
                    </Form.Field>
                )}

                <Form.Group widths="equal">
                    <Button disabled={isSubmitting} onClick={handleChannelSubmit} fluid>
                        Create Channel
                    </Button>
                    <Button disabled={isSubmitting} onClick={toggleAdChannelModal} fluid>
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
        </Modal.Content>
    </Modal>
)

export default AddChannelModal
