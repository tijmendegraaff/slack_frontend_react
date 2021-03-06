import * as AbsintheSocket from '@absinthe/socket'
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link'
import { Socket as PhoenixSocket } from 'phoenix'

const token = localStorage.getItem('token')
export default createAbsintheSocketLink(
    AbsintheSocket.create(new PhoenixSocket('ws://localhost:4000/socket', {
        reconnect: true,
        params: { token }
    })),
    console.log('socket created')
)
