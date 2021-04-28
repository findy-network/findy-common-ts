// package: agency.v1
// file: protocol.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Protocol extends jspb.Message { 
    getTypeid(): Protocol.Type;
    setTypeid(value: Protocol.Type): Protocol;
    getRole(): Protocol.Role;
    setRole(value: Protocol.Role): Protocol;
    getPrevThreadid(): string;
    setPrevThreadid(value: string): Protocol;
    getConnectionid(): string;
    setConnectionid(value: string): Protocol;

    hasDidExchange(): boolean;
    clearDidExchange(): void;
    getDidExchange(): Protocol.DIDExchangeMsg | undefined;
    setDidExchange(value?: Protocol.DIDExchangeMsg): Protocol;

    hasIssueCredential(): boolean;
    clearIssueCredential(): void;
    getIssueCredential(): Protocol.IssueCredentialMsg | undefined;
    setIssueCredential(value?: Protocol.IssueCredentialMsg): Protocol;

    hasPresentProof(): boolean;
    clearPresentProof(): void;
    getPresentProof(): Protocol.PresentProofMsg | undefined;
    setPresentProof(value?: Protocol.PresentProofMsg): Protocol;

    hasBasicMessage(): boolean;
    clearBasicMessage(): void;
    getBasicMessage(): Protocol.BasicMessageMsg | undefined;
    setBasicMessage(value?: Protocol.BasicMessageMsg): Protocol;

    getStartMsgCase(): Protocol.StartMsgCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Protocol.AsObject;
    static toObject(includeInstance: boolean, msg: Protocol): Protocol.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Protocol, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Protocol;
    static deserializeBinaryFromReader(message: Protocol, reader: jspb.BinaryReader): Protocol;
}

export namespace Protocol {
    export type AsObject = {
        typeid: Protocol.Type,
        role: Protocol.Role,
        prevThreadid: string,
        connectionid: string,
        didExchange?: Protocol.DIDExchangeMsg.AsObject,
        issueCredential?: Protocol.IssueCredentialMsg.AsObject,
        presentProof?: Protocol.PresentProofMsg.AsObject,
        basicMessage?: Protocol.BasicMessageMsg.AsObject,
    }


    export class IssuingAttributes extends jspb.Message { 
        clearAttributesList(): void;
        getAttributesList(): Array<Protocol.IssuingAttributes.Attribute>;
        setAttributesList(value: Array<Protocol.IssuingAttributes.Attribute>): IssuingAttributes;
        addAttributes(value?: Protocol.IssuingAttributes.Attribute, index?: number): Protocol.IssuingAttributes.Attribute;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): IssuingAttributes.AsObject;
        static toObject(includeInstance: boolean, msg: IssuingAttributes): IssuingAttributes.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: IssuingAttributes, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): IssuingAttributes;
        static deserializeBinaryFromReader(message: IssuingAttributes, reader: jspb.BinaryReader): IssuingAttributes;
    }

    export namespace IssuingAttributes {
        export type AsObject = {
            attributesList: Array<Protocol.IssuingAttributes.Attribute.AsObject>,
        }


        export class Attribute extends jspb.Message { 
            getName(): string;
            setName(value: string): Attribute;
            getValue(): string;
            setValue(value: string): Attribute;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Attribute.AsObject;
            static toObject(includeInstance: boolean, msg: Attribute): Attribute.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: Attribute, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): Attribute;
            static deserializeBinaryFromReader(message: Attribute, reader: jspb.BinaryReader): Attribute;
        }

        export namespace Attribute {
            export type AsObject = {
                name: string,
                value: string,
            }
        }

    }

    export class DIDExchangeMsg extends jspb.Message { 
        getLabel(): string;
        setLabel(value: string): DIDExchangeMsg;
        getInvitationjson(): string;
        setInvitationjson(value: string): DIDExchangeMsg;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): DIDExchangeMsg.AsObject;
        static toObject(includeInstance: boolean, msg: DIDExchangeMsg): DIDExchangeMsg.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: DIDExchangeMsg, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): DIDExchangeMsg;
        static deserializeBinaryFromReader(message: DIDExchangeMsg, reader: jspb.BinaryReader): DIDExchangeMsg;
    }

    export namespace DIDExchangeMsg {
        export type AsObject = {
            label: string,
            invitationjson: string,
        }
    }

    export class IssueCredentialMsg extends jspb.Message { 
        getCredDefid(): string;
        setCredDefid(value: string): IssueCredentialMsg;

        hasAttributesjson(): boolean;
        clearAttributesjson(): void;
        getAttributesjson(): string;
        setAttributesjson(value: string): IssueCredentialMsg;

        hasAttributes(): boolean;
        clearAttributes(): void;
        getAttributes(): Protocol.IssuingAttributes | undefined;
        setAttributes(value?: Protocol.IssuingAttributes): IssueCredentialMsg;

        getAttrFmtCase(): IssueCredentialMsg.AttrFmtCase;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): IssueCredentialMsg.AsObject;
        static toObject(includeInstance: boolean, msg: IssueCredentialMsg): IssueCredentialMsg.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: IssueCredentialMsg, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): IssueCredentialMsg;
        static deserializeBinaryFromReader(message: IssueCredentialMsg, reader: jspb.BinaryReader): IssueCredentialMsg;
    }

    export namespace IssueCredentialMsg {
        export type AsObject = {
            credDefid: string,
            attributesjson: string,
            attributes?: Protocol.IssuingAttributes.AsObject,
        }

        export enum AttrFmtCase {
            ATTRFMT_NOT_SET = 0,
            ATTRIBUTESJSON = 2,
            ATTRIBUTES = 3,
        }

    }

    export class Proof extends jspb.Message { 
        clearAttributesList(): void;
        getAttributesList(): Array<Protocol.Proof.Attribute>;
        setAttributesList(value: Array<Protocol.Proof.Attribute>): Proof;
        addAttributes(value?: Protocol.Proof.Attribute, index?: number): Protocol.Proof.Attribute;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Proof.AsObject;
        static toObject(includeInstance: boolean, msg: Proof): Proof.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Proof, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Proof;
        static deserializeBinaryFromReader(message: Proof, reader: jspb.BinaryReader): Proof;
    }

    export namespace Proof {
        export type AsObject = {
            attributesList: Array<Protocol.Proof.Attribute.AsObject>,
        }


        export class Attribute extends jspb.Message { 
            getName(): string;
            setName(value: string): Attribute;
            getCredDefid(): string;
            setCredDefid(value: string): Attribute;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Attribute.AsObject;
            static toObject(includeInstance: boolean, msg: Attribute): Attribute.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: Attribute, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): Attribute;
            static deserializeBinaryFromReader(message: Attribute, reader: jspb.BinaryReader): Attribute;
        }

        export namespace Attribute {
            export type AsObject = {
                name: string,
                credDefid: string,
            }
        }

    }

    export class PresentProofMsg extends jspb.Message { 

        hasAttributesjson(): boolean;
        clearAttributesjson(): void;
        getAttributesjson(): string;
        setAttributesjson(value: string): PresentProofMsg;

        hasAttributes(): boolean;
        clearAttributes(): void;
        getAttributes(): Protocol.Proof | undefined;
        setAttributes(value?: Protocol.Proof): PresentProofMsg;

        getAttrFmtCase(): PresentProofMsg.AttrFmtCase;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): PresentProofMsg.AsObject;
        static toObject(includeInstance: boolean, msg: PresentProofMsg): PresentProofMsg.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: PresentProofMsg, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): PresentProofMsg;
        static deserializeBinaryFromReader(message: PresentProofMsg, reader: jspb.BinaryReader): PresentProofMsg;
    }

    export namespace PresentProofMsg {
        export type AsObject = {
            attributesjson: string,
            attributes?: Protocol.Proof.AsObject,
        }

        export enum AttrFmtCase {
            ATTRFMT_NOT_SET = 0,
            ATTRIBUTESJSON = 1,
            ATTRIBUTES = 2,
        }

    }

    export class BasicMessageMsg extends jspb.Message { 
        getContent(): string;
        setContent(value: string): BasicMessageMsg;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): BasicMessageMsg.AsObject;
        static toObject(includeInstance: boolean, msg: BasicMessageMsg): BasicMessageMsg.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: BasicMessageMsg, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): BasicMessageMsg;
        static deserializeBinaryFromReader(message: BasicMessageMsg, reader: jspb.BinaryReader): BasicMessageMsg;
    }

    export namespace BasicMessageMsg {
        export type AsObject = {
            content: string,
        }
    }


    export enum Type {
    NONE = 0,
    DIDEXCHANGE = 1,
    ISSUE_CREDENTIAL = 2,
    PRESENT_PROOF = 3,
    TRUST_PING = 4,
    BASIC_MESSAGE = 5,
    }

    export enum Role {
    UNKNOWN = 0,
    INITIATOR = 1,
    ADDRESSEE = 2,
    RESUMER = 3,
    }


    export enum StartMsgCase {
        STARTMSG_NOT_SET = 0,
        DID_EXCHANGE = 10,
        ISSUE_CREDENTIAL = 11,
        PRESENT_PROOF = 12,
        BASIC_MESSAGE = 13,
    }

}

export class ProtocolID extends jspb.Message { 
    getTypeid(): Protocol.Type;
    setTypeid(value: Protocol.Type): ProtocolID;
    getRole(): Protocol.Role;
    setRole(value: Protocol.Role): ProtocolID;
    getId(): string;
    setId(value: string): ProtocolID;
    getNotificationTime(): number;
    setNotificationTime(value: number): ProtocolID;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProtocolID.AsObject;
    static toObject(includeInstance: boolean, msg: ProtocolID): ProtocolID.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProtocolID, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProtocolID;
    static deserializeBinaryFromReader(message: ProtocolID, reader: jspb.BinaryReader): ProtocolID;
}

export namespace ProtocolID {
    export type AsObject = {
        typeid: Protocol.Type,
        role: Protocol.Role,
        id: string,
        notificationTime: number,
    }
}

export class ProtocolState extends jspb.Message { 

    hasProtocolid(): boolean;
    clearProtocolid(): void;
    getProtocolid(): ProtocolID | undefined;
    setProtocolid(value?: ProtocolID): ProtocolState;
    getState(): ProtocolState.State;
    setState(value: ProtocolState.State): ProtocolState;
    getInfo(): string;
    setInfo(value: string): ProtocolState;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProtocolState.AsObject;
    static toObject(includeInstance: boolean, msg: ProtocolState): ProtocolState.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProtocolState, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProtocolState;
    static deserializeBinaryFromReader(message: ProtocolState, reader: jspb.BinaryReader): ProtocolState;
}

export namespace ProtocolState {
    export type AsObject = {
        protocolid?: ProtocolID.AsObject,
        state: ProtocolState.State,
        info: string,
    }

    export enum State {
    RUNNING = 0,
    OK = 1,
    ERR = 2,
    WAIT_ACTION = 3,
    ACK = 4,
    NACK = 5,
    }

}

export class ProtocolStatus extends jspb.Message { 

    hasState(): boolean;
    clearState(): void;
    getState(): ProtocolState | undefined;
    setState(value?: ProtocolState): ProtocolStatus;
    getTimestamp(): number;
    setTimestamp(value: number): ProtocolStatus;
    getStatusjson(): string;
    setStatusjson(value: string): ProtocolStatus;

    hasDidExchange(): boolean;
    clearDidExchange(): void;
    getDidExchange(): ProtocolStatus.DIDExchangeStatus | undefined;
    setDidExchange(value?: ProtocolStatus.DIDExchangeStatus): ProtocolStatus;

    hasIssueCredential(): boolean;
    clearIssueCredential(): void;
    getIssueCredential(): ProtocolStatus.IssueCredentialStatus | undefined;
    setIssueCredential(value?: ProtocolStatus.IssueCredentialStatus): ProtocolStatus;

    hasPresentProof(): boolean;
    clearPresentProof(): void;
    getPresentProof(): ProtocolStatus.PresentProofStatus | undefined;
    setPresentProof(value?: ProtocolStatus.PresentProofStatus): ProtocolStatus;

    hasTrustPing(): boolean;
    clearTrustPing(): void;
    getTrustPing(): ProtocolStatus.TrustPingStatus | undefined;
    setTrustPing(value?: ProtocolStatus.TrustPingStatus): ProtocolStatus;

    hasBasicMessage(): boolean;
    clearBasicMessage(): void;
    getBasicMessage(): ProtocolStatus.BasicMessageStatus | undefined;
    setBasicMessage(value?: ProtocolStatus.BasicMessageStatus): ProtocolStatus;

    getStatusCase(): ProtocolStatus.StatusCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProtocolStatus.AsObject;
    static toObject(includeInstance: boolean, msg: ProtocolStatus): ProtocolStatus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProtocolStatus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProtocolStatus;
    static deserializeBinaryFromReader(message: ProtocolStatus, reader: jspb.BinaryReader): ProtocolStatus;
}

export namespace ProtocolStatus {
    export type AsObject = {
        state?: ProtocolState.AsObject,
        timestamp: number,
        statusjson: string,
        didExchange?: ProtocolStatus.DIDExchangeStatus.AsObject,
        issueCredential?: ProtocolStatus.IssueCredentialStatus.AsObject,
        presentProof?: ProtocolStatus.PresentProofStatus.AsObject,
        trustPing?: ProtocolStatus.TrustPingStatus.AsObject,
        basicMessage?: ProtocolStatus.BasicMessageStatus.AsObject,
    }


    export class DIDExchangeStatus extends jspb.Message { 
        getId(): string;
        setId(value: string): DIDExchangeStatus;
        getMydid(): string;
        setMydid(value: string): DIDExchangeStatus;
        getTheirdid(): string;
        setTheirdid(value: string): DIDExchangeStatus;
        getTheirEndpoint(): string;
        setTheirEndpoint(value: string): DIDExchangeStatus;
        getTheirLabel(): string;
        setTheirLabel(value: string): DIDExchangeStatus;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): DIDExchangeStatus.AsObject;
        static toObject(includeInstance: boolean, msg: DIDExchangeStatus): DIDExchangeStatus.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: DIDExchangeStatus, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): DIDExchangeStatus;
        static deserializeBinaryFromReader(message: DIDExchangeStatus, reader: jspb.BinaryReader): DIDExchangeStatus;
    }

    export namespace DIDExchangeStatus {
        export type AsObject = {
            id: string,
            mydid: string,
            theirdid: string,
            theirEndpoint: string,
            theirLabel: string,
        }
    }

    export class IssueCredentialStatus extends jspb.Message { 
        getCredDefid(): string;
        setCredDefid(value: string): IssueCredentialStatus;
        getSchemaid(): string;
        setSchemaid(value: string): IssueCredentialStatus;

        hasAttributes(): boolean;
        clearAttributes(): void;
        getAttributes(): Protocol.IssuingAttributes | undefined;
        setAttributes(value?: Protocol.IssuingAttributes): IssueCredentialStatus;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): IssueCredentialStatus.AsObject;
        static toObject(includeInstance: boolean, msg: IssueCredentialStatus): IssueCredentialStatus.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: IssueCredentialStatus, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): IssueCredentialStatus;
        static deserializeBinaryFromReader(message: IssueCredentialStatus, reader: jspb.BinaryReader): IssueCredentialStatus;
    }

    export namespace IssueCredentialStatus {
        export type AsObject = {
            credDefid: string,
            schemaid: string,
            attributes?: Protocol.IssuingAttributes.AsObject,
        }
    }

    export class PresentProofStatus extends jspb.Message { 

        hasProof(): boolean;
        clearProof(): void;
        getProof(): Protocol.Proof | undefined;
        setProof(value?: Protocol.Proof): PresentProofStatus;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): PresentProofStatus.AsObject;
        static toObject(includeInstance: boolean, msg: PresentProofStatus): PresentProofStatus.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: PresentProofStatus, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): PresentProofStatus;
        static deserializeBinaryFromReader(message: PresentProofStatus, reader: jspb.BinaryReader): PresentProofStatus;
    }

    export namespace PresentProofStatus {
        export type AsObject = {
            proof?: Protocol.Proof.AsObject,
        }
    }

    export class TrustPingStatus extends jspb.Message { 
        getReplied(): boolean;
        setReplied(value: boolean): TrustPingStatus;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): TrustPingStatus.AsObject;
        static toObject(includeInstance: boolean, msg: TrustPingStatus): TrustPingStatus.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: TrustPingStatus, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): TrustPingStatus;
        static deserializeBinaryFromReader(message: TrustPingStatus, reader: jspb.BinaryReader): TrustPingStatus;
    }

    export namespace TrustPingStatus {
        export type AsObject = {
            replied: boolean,
        }
    }

    export class BasicMessageStatus extends jspb.Message { 
        getContent(): string;
        setContent(value: string): BasicMessageStatus;
        getSentByMe(): boolean;
        setSentByMe(value: boolean): BasicMessageStatus;
        getDelivered(): boolean;
        setDelivered(value: boolean): BasicMessageStatus;
        getSentTimestamp(): number;
        setSentTimestamp(value: number): BasicMessageStatus;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): BasicMessageStatus.AsObject;
        static toObject(includeInstance: boolean, msg: BasicMessageStatus): BasicMessageStatus.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: BasicMessageStatus, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): BasicMessageStatus;
        static deserializeBinaryFromReader(message: BasicMessageStatus, reader: jspb.BinaryReader): BasicMessageStatus;
    }

    export namespace BasicMessageStatus {
        export type AsObject = {
            content: string,
            sentByMe: boolean,
            delivered: boolean,
            sentTimestamp: number,
        }
    }


    export enum StatusCase {
        STATUS_NOT_SET = 0,
        DID_EXCHANGE = 10,
        ISSUE_CREDENTIAL = 11,
        PRESENT_PROOF = 12,
        TRUST_PING = 13,
        BASIC_MESSAGE = 14,
    }

}
