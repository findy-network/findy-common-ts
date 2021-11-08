// package: agency.v1
// file: agent.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as protocol_pb from "./protocol_pb";

export class ModeCmd extends jspb.Message { 
    getTypeid(): ModeCmd.CmdType;
    setTypeid(value: ModeCmd.CmdType): ModeCmd;
    getIsInput(): boolean;
    setIsInput(value: boolean): ModeCmd;
    getInfo(): string;
    setInfo(value: string): ModeCmd;

    hasAcceptMode(): boolean;
    clearAcceptMode(): void;
    getAcceptMode(): ModeCmd.AcceptModeCmd | undefined;
    setAcceptMode(value?: ModeCmd.AcceptModeCmd): ModeCmd;

    getControlcmdCase(): ModeCmd.ControlcmdCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ModeCmd.AsObject;
    static toObject(includeInstance: boolean, msg: ModeCmd): ModeCmd.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ModeCmd, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ModeCmd;
    static deserializeBinaryFromReader(message: ModeCmd, reader: jspb.BinaryReader): ModeCmd;
}

export namespace ModeCmd {
    export type AsObject = {
        typeid: ModeCmd.CmdType,
        isInput: boolean,
        info: string,
        acceptMode?: ModeCmd.AcceptModeCmd.AsObject,
    }


    export class AcceptModeCmd extends jspb.Message { 
        getMode(): ModeCmd.AcceptModeCmd.Mode;
        setMode(value: ModeCmd.AcceptModeCmd.Mode): AcceptModeCmd;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): AcceptModeCmd.AsObject;
        static toObject(includeInstance: boolean, msg: AcceptModeCmd): AcceptModeCmd.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: AcceptModeCmd, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): AcceptModeCmd;
        static deserializeBinaryFromReader(message: AcceptModeCmd, reader: jspb.BinaryReader): AcceptModeCmd;
    }

    export namespace AcceptModeCmd {
        export type AsObject = {
            mode: ModeCmd.AcceptModeCmd.Mode,
        }

        export enum Mode {
    DEFAULT = 0,
    AUTO_ACCEPT = 1,
    GRPC_CONTROL = 2,
        }

    }


    export enum CmdType {
    NONE = 0,
    ACCEPT_MODE = 1,
    }


    export enum ControlcmdCase {
        CONTROLCMD_NOT_SET = 0,
        ACCEPT_MODE = 4,
    }

}

export class SchemaData extends jspb.Message { 
    getId(): string;
    setId(value: string): SchemaData;
    getData(): string;
    setData(value: string): SchemaData;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SchemaData.AsObject;
    static toObject(includeInstance: boolean, msg: SchemaData): SchemaData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SchemaData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SchemaData;
    static deserializeBinaryFromReader(message: SchemaData, reader: jspb.BinaryReader): SchemaData;
}

export namespace SchemaData {
    export type AsObject = {
        id: string,
        data: string,
    }
}

export class CredDefData extends jspb.Message { 
    getId(): string;
    setId(value: string): CredDefData;
    getData(): string;
    setData(value: string): CredDefData;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CredDefData.AsObject;
    static toObject(includeInstance: boolean, msg: CredDefData): CredDefData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CredDefData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CredDefData;
    static deserializeBinaryFromReader(message: CredDefData, reader: jspb.BinaryReader): CredDefData;
}

export namespace CredDefData {
    export type AsObject = {
        id: string,
        data: string,
    }
}

export class SchemaCreate extends jspb.Message { 
    getName(): string;
    setName(value: string): SchemaCreate;
    getVersion(): string;
    setVersion(value: string): SchemaCreate;
    clearAttributesList(): void;
    getAttributesList(): Array<string>;
    setAttributesList(value: Array<string>): SchemaCreate;
    addAttributes(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SchemaCreate.AsObject;
    static toObject(includeInstance: boolean, msg: SchemaCreate): SchemaCreate.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SchemaCreate, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SchemaCreate;
    static deserializeBinaryFromReader(message: SchemaCreate, reader: jspb.BinaryReader): SchemaCreate;
}

export namespace SchemaCreate {
    export type AsObject = {
        name: string,
        version: string,
        attributesList: Array<string>,
    }
}

export class Schema extends jspb.Message { 
    getId(): string;
    setId(value: string): Schema;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Schema.AsObject;
    static toObject(includeInstance: boolean, msg: Schema): Schema.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Schema, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Schema;
    static deserializeBinaryFromReader(message: Schema, reader: jspb.BinaryReader): Schema;
}

export namespace Schema {
    export type AsObject = {
        id: string,
    }
}

export class CredDefCreate extends jspb.Message { 
    getSchemaid(): string;
    setSchemaid(value: string): CredDefCreate;
    getTag(): string;
    setTag(value: string): CredDefCreate;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CredDefCreate.AsObject;
    static toObject(includeInstance: boolean, msg: CredDefCreate): CredDefCreate.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CredDefCreate, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CredDefCreate;
    static deserializeBinaryFromReader(message: CredDefCreate, reader: jspb.BinaryReader): CredDefCreate;
}

export namespace CredDefCreate {
    export type AsObject = {
        schemaid: string,
        tag: string,
    }
}

export class CredDef extends jspb.Message { 
    getId(): string;
    setId(value: string): CredDef;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CredDef.AsObject;
    static toObject(includeInstance: boolean, msg: CredDef): CredDef.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CredDef, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CredDef;
    static deserializeBinaryFromReader(message: CredDef, reader: jspb.BinaryReader): CredDef;
}

export namespace CredDef {
    export type AsObject = {
        id: string,
    }
}

export class PingMsg extends jspb.Message { 
    getId(): number;
    setId(value: number): PingMsg;
    getPingController(): boolean;
    setPingController(value: boolean): PingMsg;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PingMsg.AsObject;
    static toObject(includeInstance: boolean, msg: PingMsg): PingMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PingMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PingMsg;
    static deserializeBinaryFromReader(message: PingMsg, reader: jspb.BinaryReader): PingMsg;
}

export namespace PingMsg {
    export type AsObject = {
        id: number,
        pingController: boolean,
    }
}

export class SAImplementation extends jspb.Message { 
    getId(): string;
    setId(value: string): SAImplementation;
    getEndpoint(): string;
    setEndpoint(value: string): SAImplementation;
    getKey(): string;
    setKey(value: string): SAImplementation;
    getPersistent(): boolean;
    setPersistent(value: boolean): SAImplementation;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SAImplementation.AsObject;
    static toObject(includeInstance: boolean, msg: SAImplementation): SAImplementation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SAImplementation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SAImplementation;
    static deserializeBinaryFromReader(message: SAImplementation, reader: jspb.BinaryReader): SAImplementation;
}

export namespace SAImplementation {
    export type AsObject = {
        id: string,
        endpoint: string,
        key: string,
        persistent: boolean,
    }
}

export class InvitationBase extends jspb.Message { 
    getLabel(): string;
    setLabel(value: string): InvitationBase;
    getId(): string;
    setId(value: string): InvitationBase;
    getExpiration(): number;
    setExpiration(value: number): InvitationBase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InvitationBase.AsObject;
    static toObject(includeInstance: boolean, msg: InvitationBase): InvitationBase.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InvitationBase, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InvitationBase;
    static deserializeBinaryFromReader(message: InvitationBase, reader: jspb.BinaryReader): InvitationBase;
}

export namespace InvitationBase {
    export type AsObject = {
        label: string,
        id: string,
        expiration: number,
    }
}

export class Invitation extends jspb.Message { 
    getJson(): string;
    setJson(value: string): Invitation;
    getUrl(): string;
    setUrl(value: string): Invitation;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Invitation.AsObject;
    static toObject(includeInstance: boolean, msg: Invitation): Invitation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Invitation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Invitation;
    static deserializeBinaryFromReader(message: Invitation, reader: jspb.BinaryReader): Invitation;
}

export namespace Invitation {
    export type AsObject = {
        json: string,
        url: string,
    }
}

export class Answer extends jspb.Message { 
    getId(): string;
    setId(value: string): Answer;

    hasClientid(): boolean;
    clearClientid(): void;
    getClientid(): ClientID | undefined;
    setClientid(value?: ClientID): Answer;
    getAck(): boolean;
    setAck(value: boolean): Answer;
    getInfo(): string;
    setInfo(value: string): Answer;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Answer.AsObject;
    static toObject(includeInstance: boolean, msg: Answer): Answer.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Answer, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Answer;
    static deserializeBinaryFromReader(message: Answer, reader: jspb.BinaryReader): Answer;
}

export namespace Answer {
    export type AsObject = {
        id: string,
        clientid?: ClientID.AsObject,
        ack: boolean,
        info: string,
    }
}

export class ClientID extends jspb.Message { 
    getId(): string;
    setId(value: string): ClientID;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClientID.AsObject;
    static toObject(includeInstance: boolean, msg: ClientID): ClientID.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ClientID, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClientID;
    static deserializeBinaryFromReader(message: ClientID, reader: jspb.BinaryReader): ClientID;
}

export namespace ClientID {
    export type AsObject = {
        id: string,
    }
}

export class AgentStatus extends jspb.Message { 

    hasClientid(): boolean;
    clearClientid(): void;
    getClientid(): ClientID | undefined;
    setClientid(value?: ClientID): AgentStatus;

    hasNotification(): boolean;
    clearNotification(): void;
    getNotification(): Notification | undefined;
    setNotification(value?: Notification): AgentStatus;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AgentStatus.AsObject;
    static toObject(includeInstance: boolean, msg: AgentStatus): AgentStatus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AgentStatus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AgentStatus;
    static deserializeBinaryFromReader(message: AgentStatus, reader: jspb.BinaryReader): AgentStatus;
}

export namespace AgentStatus {
    export type AsObject = {
        clientid?: ClientID.AsObject,
        notification?: Notification.AsObject,
    }
}

export class Notification extends jspb.Message { 
    getTypeid(): Notification.Type;
    setTypeid(value: Notification.Type): Notification;
    getId(): string;
    setId(value: string): Notification;
    getConnectionid(): string;
    setConnectionid(value: string): Notification;
    getProtocolid(): string;
    setProtocolid(value: string): Notification;
    getProtocolFamily(): string;
    setProtocolFamily(value: string): Notification;
    getTimestamp(): number;
    setTimestamp(value: number): Notification;
    getProtocolType(): protocol_pb.Protocol.Type;
    setProtocolType(value: protocol_pb.Protocol.Type): Notification;
    getRole(): protocol_pb.Protocol.Role;
    setRole(value: protocol_pb.Protocol.Role): Notification;
    getPid(): string;
    setPid(value: string): Notification;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Notification.AsObject;
    static toObject(includeInstance: boolean, msg: Notification): Notification.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Notification, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Notification;
    static deserializeBinaryFromReader(message: Notification, reader: jspb.BinaryReader): Notification;
}

export namespace Notification {
    export type AsObject = {
        typeid: Notification.Type,
        id: string,
        connectionid: string,
        protocolid: string,
        protocolFamily: string,
        timestamp: number,
        protocolType: protocol_pb.Protocol.Type,
        role: protocol_pb.Protocol.Role,
        pid: string,
    }

    export enum Type {
    NONE = 0,
    KEEPALIVE = 1,
    STATUS_UPDATE = 2,
    PROTOCOL_PAUSED = 3,
    }

}

export class Question extends jspb.Message { 

    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): AgentStatus | undefined;
    setStatus(value?: AgentStatus): Question;
    getTypeid(): Question.Type;
    setTypeid(value: Question.Type): Question;

    hasIssuePropose(): boolean;
    clearIssuePropose(): void;
    getIssuePropose(): Question.IssueProposeMsg | undefined;
    setIssuePropose(value?: Question.IssueProposeMsg): Question;

    hasProofVerify(): boolean;
    clearProofVerify(): void;
    getProofVerify(): Question.ProofVerifyMsg | undefined;
    setProofVerify(value?: Question.ProofVerifyMsg): Question;

    getQuestionCase(): Question.QuestionCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Question.AsObject;
    static toObject(includeInstance: boolean, msg: Question): Question.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Question, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Question;
    static deserializeBinaryFromReader(message: Question, reader: jspb.BinaryReader): Question;
}

export namespace Question {
    export type AsObject = {
        status?: AgentStatus.AsObject,
        typeid: Question.Type,
        issuePropose?: Question.IssueProposeMsg.AsObject,
        proofVerify?: Question.ProofVerifyMsg.AsObject,
    }


    export class IssueProposeMsg extends jspb.Message { 
        getCredDefid(): string;
        setCredDefid(value: string): IssueProposeMsg;
        getValuesjson(): string;
        setValuesjson(value: string): IssueProposeMsg;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): IssueProposeMsg.AsObject;
        static toObject(includeInstance: boolean, msg: IssueProposeMsg): IssueProposeMsg.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: IssueProposeMsg, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): IssueProposeMsg;
        static deserializeBinaryFromReader(message: IssueProposeMsg, reader: jspb.BinaryReader): IssueProposeMsg;
    }

    export namespace IssueProposeMsg {
        export type AsObject = {
            credDefid: string,
            valuesjson: string,
        }
    }

    export class ProofVerifyMsg extends jspb.Message { 
        clearAttributesList(): void;
        getAttributesList(): Array<Question.ProofVerifyMsg.Attribute>;
        setAttributesList(value: Array<Question.ProofVerifyMsg.Attribute>): ProofVerifyMsg;
        addAttributes(value?: Question.ProofVerifyMsg.Attribute, index?: number): Question.ProofVerifyMsg.Attribute;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): ProofVerifyMsg.AsObject;
        static toObject(includeInstance: boolean, msg: ProofVerifyMsg): ProofVerifyMsg.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: ProofVerifyMsg, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): ProofVerifyMsg;
        static deserializeBinaryFromReader(message: ProofVerifyMsg, reader: jspb.BinaryReader): ProofVerifyMsg;
    }

    export namespace ProofVerifyMsg {
        export type AsObject = {
            attributesList: Array<Question.ProofVerifyMsg.Attribute.AsObject>,
        }


        export class Attribute extends jspb.Message { 
            getValue(): string;
            setValue(value: string): Attribute;
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
                value: string,
                name: string,
                credDefid: string,
            }
        }

    }


    export enum Type {
    NONE = 0,
    KEEPALIVE = 1,
    PING_WAITS = 2,
    ISSUE_PROPOSE_WAITS = 3,
    PROOF_PROPOSE_WAITS = 4,
    PROOF_VERIFY_WAITS = 5,
    }


    export enum QuestionCase {
        QUESTION_NOT_SET = 0,
        ISSUE_PROPOSE = 3,
        PROOF_VERIFY = 4,
    }

}
