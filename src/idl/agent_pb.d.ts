// package: agency
// file: agent.proto

import * as jspb from "google-protobuf";
import * as protocol_pb from "./protocol_pb";

export class SchemaData extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getData(): string;
  setData(value: string): void;

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
  setId(value: string): void;

  getData(): string;
  setData(value: string): void;

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
  setName(value: string): void;

  getVersion(): string;
  setVersion(value: string): void;

  clearAttrsList(): void;
  getAttrsList(): Array<string>;
  setAttrsList(value: Array<string>): void;
  addAttrs(value: string, index?: number): string;

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
    attrsList: Array<string>,
  }
}

export class Schema extends jspb.Message {
  getId(): string;
  setId(value: string): void;

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
  getSchemaId(): string;
  setSchemaId(value: string): void;

  getTag(): string;
  setTag(value: string): void;

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
    schemaId: string,
    tag: string,
  }
}

export class CredDef extends jspb.Message {
  getId(): string;
  setId(value: string): void;

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
  setId(value: number): void;

  getPingController(): boolean;
  setPingController(value: boolean): void;

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
  setId(value: string): void;

  getEndpoint(): string;
  setEndpoint(value: string): void;

  getKey(): string;
  setKey(value: string): void;

  getPersistent(): boolean;
  setPersistent(value: boolean): void;

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
  setLabel(value: string): void;

  getId(): string;
  setId(value: string): void;

  getExpiration(): number;
  setExpiration(value: number): void;

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
  getJsonStr(): string;
  setJsonStr(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

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
    jsonStr: string,
    url: string,
  }
}

export class Answer extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  hasClientId(): boolean;
  clearClientId(): void;
  getClientId(): ClientID | undefined;
  setClientId(value?: ClientID): void;

  getAck(): boolean;
  setAck(value: boolean): void;

  getInfo(): string;
  setInfo(value: string): void;

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
    clientId?: ClientID.AsObject,
    ack: boolean,
    info: string,
  }
}

export class ClientID extends jspb.Message {
  getId(): string;
  setId(value: string): void;

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
  hasClientId(): boolean;
  clearClientId(): void;
  getClientId(): ClientID | undefined;
  setClientId(value?: ClientID): void;

  hasNotification(): boolean;
  clearNotification(): void;
  getNotification(): Notification | undefined;
  setNotification(value?: Notification): void;

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
    clientId?: ClientID.AsObject,
    notification?: Notification.AsObject,
  }
}

export class Notification extends jspb.Message {
  getTypeId(): Notification.TypeMap[keyof Notification.TypeMap];
  setTypeId(value: Notification.TypeMap[keyof Notification.TypeMap]): void;

  getId(): string;
  setId(value: string): void;

  getConnectionId(): string;
  setConnectionId(value: string): void;

  getProtocolId(): string;
  setProtocolId(value: string): void;

  getProtocolFamily(): string;
  setProtocolFamily(value: string): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getProtocolType(): protocol_pb.Protocol.TypeMap[keyof protocol_pb.Protocol.TypeMap];
  setProtocolType(value: protocol_pb.Protocol.TypeMap[keyof protocol_pb.Protocol.TypeMap]): void;

  getRole(): protocol_pb.Protocol.RoleMap[keyof protocol_pb.Protocol.RoleMap];
  setRole(value: protocol_pb.Protocol.RoleMap[keyof protocol_pb.Protocol.RoleMap]): void;

  getPid(): string;
  setPid(value: string): void;

  hasIssuePropose(): boolean;
  clearIssuePropose(): void;
  getIssuePropose(): Notification.IssuePropose | undefined;
  setIssuePropose(value?: Notification.IssuePropose): void;

  hasProofVerify(): boolean;
  clearProofVerify(): void;
  getProofVerify(): Notification.ProofVerify | undefined;
  setProofVerify(value?: Notification.ProofVerify): void;

  getQuestionCase(): Notification.QuestionCase;
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
    typeId: Notification.TypeMap[keyof Notification.TypeMap],
    id: string,
    connectionId: string,
    protocolId: string,
    protocolFamily: string,
    timestamp: number,
    protocolType: protocol_pb.Protocol.TypeMap[keyof protocol_pb.Protocol.TypeMap],
    role: protocol_pb.Protocol.RoleMap[keyof protocol_pb.Protocol.RoleMap],
    pid: string,
    issuePropose?: Notification.IssuePropose.AsObject,
    proofVerify?: Notification.ProofVerify.AsObject,
  }

  export class IssuePropose extends jspb.Message {
    getCredDefId(): string;
    setCredDefId(value: string): void;

    getValuesJson(): string;
    setValuesJson(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IssuePropose.AsObject;
    static toObject(includeInstance: boolean, msg: IssuePropose): IssuePropose.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IssuePropose, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IssuePropose;
    static deserializeBinaryFromReader(message: IssuePropose, reader: jspb.BinaryReader): IssuePropose;
  }

  export namespace IssuePropose {
    export type AsObject = {
      credDefId: string,
      valuesJson: string,
    }
  }

  export class ProofVerify extends jspb.Message {
    clearAttrsList(): void;
    getAttrsList(): Array<Notification.ProofVerify.Attr>;
    setAttrsList(value: Array<Notification.ProofVerify.Attr>): void;
    addAttrs(value?: Notification.ProofVerify.Attr, index?: number): Notification.ProofVerify.Attr;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProofVerify.AsObject;
    static toObject(includeInstance: boolean, msg: ProofVerify): ProofVerify.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProofVerify, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProofVerify;
    static deserializeBinaryFromReader(message: ProofVerify, reader: jspb.BinaryReader): ProofVerify;
  }

  export namespace ProofVerify {
    export type AsObject = {
      attrsList: Array<Notification.ProofVerify.Attr.AsObject>,
    }

    export class Attr extends jspb.Message {
      getValue(): string;
      setValue(value: string): void;

      getName(): string;
      setName(value: string): void;

      getCredDefId(): string;
      setCredDefId(value: string): void;

      getPredicate(): string;
      setPredicate(value: string): void;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Attr.AsObject;
      static toObject(includeInstance: boolean, msg: Attr): Attr.AsObject;
      static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
      static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
      static serializeBinaryToWriter(message: Attr, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): Attr;
      static deserializeBinaryFromReader(message: Attr, reader: jspb.BinaryReader): Attr;
    }

    export namespace Attr {
      export type AsObject = {
        value: string,
        name: string,
        credDefId: string,
        predicate: string,
      }
    }
  }

  export interface TypeMap {
    STATUS_UPDATE: 0;
    ACTION_NEEDED: 1;
    ANSWER_NEEDED_PING: 2;
    ANSWER_NEEDED_ISSUE_PROPOSE: 3;
    ANSWER_NEEDED_PROOF_PROPOSE: 4;
    ANSWER_NEEDED_PROOF_VERIFY: 5;
    KEEPALIVE: 6;
  }

  export const Type: TypeMap;

  export enum QuestionCase {
    QUESTION_NOT_SET = 0,
    ISSUE_PROPOSE = 10,
    PROOF_VERIFY = 11,
  }
}

