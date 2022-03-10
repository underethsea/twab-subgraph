import { Address, ethereum } from '@graphprotocol/graph-ts';
import { newMockEvent } from 'matchstick-as/assembly/index';

import { Delegated, NewUserTwab } from '../../generated/Ticket/Ticket';

export function createDelegatedEvent(delegate: string, delegatee: string): Delegated {
    let mockEvent = newMockEvent();

    let delegatedEvent = new Delegated(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );

    delegatedEvent.parameters = new Array();

    let delegateParam = new ethereum.EventParam(
        'delegate',
        ethereum.Value.fromAddress(Address.fromString(delegate)),
    );

    let delegateeParam = new ethereum.EventParam(
        'delegate',
        ethereum.Value.fromAddress(Address.fromString(delegatee)),
    );

    delegatedEvent.parameters.push(delegateParam);
    delegatedEvent.parameters.push(delegateeParam);

    return delegatedEvent;
}

export function createNewUserTwabEvent(delegate: string, amount: i32, timestamp: i32): NewUserTwab {
    let mockEvent = newMockEvent();

    let newUserTwabEvent = new NewUserTwab(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );

    newUserTwabEvent.parameters = new Array();

    let delegateParam = new ethereum.EventParam(
        'delegate',
        ethereum.Value.fromAddress(Address.fromString(delegate)),
    );

    let newTwabParam = new ethereum.EventParam(
        'newTwab',
        ethereum.Value.fromTuple(
            changetype<ethereum.Tuple>([
                ethereum.Value.fromI32(amount),
                ethereum.Value.fromI32(timestamp),
            ]),
        ),
    );

    newUserTwabEvent.parameters.push(delegateParam);
    newUserTwabEvent.parameters.push(newTwabParam);

    return newUserTwabEvent;
}
