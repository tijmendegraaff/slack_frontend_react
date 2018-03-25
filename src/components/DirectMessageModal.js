import React from 'react'
import { Modal, Header, Form, Button } from 'semantic-ui-react'
import Downshift from 'downshift'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const DirectMessageModal = ({
    open,
    toggleDirectMessageModal,
    handleAddDirectMessage,
    teamId,
    members,
    history,
    directMessageUsers
}) => (
    <Modal open={open} className="modal-container" onClose={toggleDirectMessageModal}>
        <Modal.Header>Who do you want to send a private message too?</Modal.Header>
        <Modal.Content>
            <Header>Search for a user</Header>
            <Form>
                <Form.Field>
                    <Downshift
                        onChange={e => history.push(`/dashboard/${teamId}/directMessage/${e.id}`)}
                        render={({
                            getInputProps,
                            getItemProps,
                            isOpen,
                            inputValue,
                            selectedItem,
                            highlightedIndex
                        }) => (
                            <div>
                                <input {...getInputProps({ placeholder: 'Favorite fruit ?' })} />
                                {isOpen ? (
                                    <div style={{ border: '1px solid #ccc' }}>
                                        {members
                                            .filter(i =>
                                                !inputValue ||
                                                    i.userName
                                                        .toLowerCase()
                                                        .includes(inputValue.toLowerCase()))
                                            .map((item, index) => (
                                                <div
                                                    {...getItemProps({ item })}
                                                    key={item.id}
                                                    style={{
                                                        backgroundColor:
                                                            highlightedIndex === index
                                                                ? 'gray'
                                                                : 'white',
                                                        fontWeight:
                                                            selectedItem === item
                                                                ? 'bold'
                                                                : 'normal'
                                                    }}
                                                >
                                                    {item.userName}
                                                </div>
                                            ))}
                                    </div>
                                ) : null}
                            </div>
                        )}
                    />
                </Form.Field>
                <Form.Group widths="equal">
                    <Button onClick={handleAddDirectMessage} fluid>
                        Message user
                    </Button>
                    <Button onClick={toggleDirectMessageModal} fluid>
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
    teamId: PropTypes.string.isRequired,
    handleAddDirectMessage: PropTypes.func.isRequired,
    members: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    directMessageUsers: PropTypes.array.isRequired
}

export default withRouter(DirectMessageModal)
