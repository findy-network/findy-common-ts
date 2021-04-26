// package: agency
// file: protocol.proto

import * as jspb from "google-protobuf";

export class Protocol extends jspb.Message {
  getTypeId(): Protocol.TypeMap[keyof Protocol.TypeMap];
  setTypeId(value: Protocol.TypeMap[keyof Protocol.TypeMap]): void;

  getRole(): Protocol.RoleMap[keyof Protocol.RoleMap];
  setRole(value: Protocol.RoleMap[keyof Protocol.RoleMap]): void;

  getPrevThreadId(): string;
  setPrevThreadId(value: string): void;

  getConnectionId(): string;
  setConnectionId(value: string): void;

  hasConnAttr(): boolean;
  clearConnAttr(): void;
  getConnAttr(): Protocol.Connection | undefined;
  setConnAttr(value?: Protocol.Connection): void;

  hasCredDef(): boolean;
  clearCredDef(): void;
  getCredDef(): Protocol.Issuing | undefined;
  setCredDef(value?: Protocol.Issuing): void;

  hasProofReq(): boolean;
  clearProofReq(): void;
  getProofReq(): Protocol.ProofRequest | undefined;
  setProofReq(value?: Protocol.ProofRequest): void;

  hasBasicMessage(): boolean;
  clearBasicMessage(): void;
  getBasicMessage(): string;
  setBasicMessage(value: string): void;

  getStartmsgCase(): Protocol.StartmsgCase;
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
    typeId: Protocol.TypeMap[keyof Protocol.TypeMap],
    role: Protocol.RoleMap[keyof Protocol.RoleMap],
    prevThreadId: string,
    connectionId: string,
    connAttr?: Protocol.Connection.AsObject,
    credDef?: Protocol.Issuing.AsObject,
    proofReq?: Protocol.ProofRequest.AsObject,
    basicMessage: string,
  }

  export class Attribute extends jspb.Message {
    getName(): string;
    setName(value: string): void;

    getValue(): string;
    setValue(value: string): void;

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

  export class Attrs extends jspb.Message {
    clearAttrsList(): void;
    getAttrsList(): Array<Protocol.Attribute>;
    setAttrsList(value: Array<Protocol.Attribute>): void;
    addAttrs(value?: Protocol.Attribute, index?: number): Protocol.Attribute;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Attrs.AsObject;
    static toObject(includeInstance: boolean, msg: Attrs): Attrs.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Attrs, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Attrs;
    static deserializeBinaryFromReader(message: Attrs, reader: jspb.BinaryReader): Attrs;
  }

  export namespace Attrs {
    export type AsObject = {
      attrsList: Array<Protocol.Attribute.AsObject>,
    }
  }

  export class Connection extends jspb.Message {
    getLabel(): string;
    setLabel(value: string): void;

    getInvitationJson(): string;
    setInvitationJson(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Connection.AsObject;
    static toObject(includeInstance: boolean, msg: Connection): Connection.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Connection, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Connection;
    static deserializeBinaryFromReader(message: Connection, reader: jspb.BinaryReader): Connection;
  }

  export namespace Connection {
    export type AsObject = {
      label: string,
      invitationJson: string,
    }
  }

  export class Issuing extends jspb.Message {
    getCredDefId(): string;
    setCredDefId(value: string): void;

    hasAttributesJson(): boolean;
    clearAttributesJson(): void;
    getAttributesJson(): string;
    setAttributesJson(value: string): void;

    hasAttrs(): boolean;
    clearAttrs(): void;
    getAttrs(): Protocol.Attrs | undefined;
    setAttrs(value?: Protocol.Attrs): void;

    getAttrsCase(): Issuing.AttrsCase;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Issuing.AsObject;
    static toObject(includeInstance: boolean, msg: Issuing): Issuing.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Issuing, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Issuing;
    static deserializeBinaryFromReader(message: Issuing, reader: jspb.BinaryReader): Issuing;
  }

  export namespace Issuing {
    export type AsObject = {
      credDefId: string,
      attributesJson: string,
      attrs?: Protocol.Attrs.AsObject,
    }

    export enum AttrsCase {
      ATTRS_NOT_SET = 0,
      ATTRIBUTES_JSON = 2,
      ATTRS = 3,
    }
  }

  export class Proof extends jspb.Message {
    clearAttrsList(): void;
    getAttrsList(): Array<Protocol.Proof.Attr>;
    setAttrsList(value: Array<Protocol.Proof.Attr>): void;
    addAttrs(value?: Protocol.Proof.Attr, index?: number): Protocol.Proof.Attr;

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
      attrsList: Array<Protocol.Proof.Attr.AsObject>,
    }

    export class Attr extends jspb.Message {
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
        name: string,
        credDefId: string,
        predicate: string,
      }
    }
  }

  export class ProofRequest extends jspb.Message {
    hasAttributesJson(): boolean;
    clearAttributesJson(): void;
    getAttributesJson(): string;
    setAttributesJson(value: string): void;

    hasAttrs(): boolean;
    clearAttrs(): void;
    getAttrs(): Protocol.Proof | undefined;
    setAttrs(value?: Protocol.Proof): void;

    getAttrfmtCase(): ProofRequest.AttrfmtCase;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProofRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ProofRequest): ProofRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProofRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProofRequest;
    static deserializeBinaryFromReader(message: ProofRequest, reader: jspb.BinaryReader): ProofRequest;
  }

  export namespace ProofRequest {
    export type AsObject = {
      attributesJson: string,
      attrs?: Protocol.Proof.AsObject,
    }

    export enum AttrfmtCase {
      ATTRFMT_NOT_SET = 0,
      ATTRIBUTES_JSON = 1,
      ATTRS = 2,
    }
  }

  export interface TypeMap {
    NONE: 0;
    CONNECT: 1;
    ISSUE: 2;
    PROOF: 3;
    TRUST_PING: 4;
    BASIC_MESSAGE: 5;
  }

  export const Type: TypeMap;

  export interface RoleMap {
    UNKNOWN: 0;
    INITIATOR: 1;
    ADDRESSEE: 2;
    RESUME: 3;
  }

  export const Role: RoleMap;

  export enum StartmsgCase {
    STARTMSG_NOT_SET = 0,
    CONN_ATTR = 10,
    CRED_DEF = 11,
    PROOF_REQ = 12,
    BASIC_MESSAGE = 13,
  }
}

export class ProtocolID extends jspb.Message {
  getTypeId(): Protocol.TypeMap[keyof Protocol.TypeMap];
  setTypeId(value: Protocol.TypeMap[keyof Protocol.TypeMap]): void;

  getRole(): Protocol.RoleMap[keyof Protocol.RoleMap];
  setRole(value: Protocol.RoleMap[keyof Protocol.RoleMap]): void;

  getId(): string;
  setId(value: string): void;

  getNotificationTime(): number;
  setNotificationTime(value: number): void;

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
    typeId: Protocol.TypeMap[keyof Protocol.TypeMap],
    role: Protocol.RoleMap[keyof Protocol.RoleMap],
    id: string,
    notificationTime: number,
  }
}

export class ProtocolState extends jspb.Message {
  hasProtocolId(): boolean;
  clearProtocolId(): void;
  getProtocolId(): ProtocolID | undefined;
  setProtocolId(value?: ProtocolID): void;

  getState(): ProtocolState.StateMap[keyof ProtocolState.StateMap];
  setState(value: ProtocolState.StateMap[keyof ProtocolState.StateMap]): void;

  getInfo(): string;
  setInfo(value: string): void;

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
    protocolId?: ProtocolID.AsObject,
    state: ProtocolState.StateMap[keyof ProtocolState.StateMap],
    info: string,
  }

  export interface StateMap {
    RUNNING: 0;
    OK: 1;
    ERR: 2;
    WAIT_ACTION: 3;
    ACK: 4;
    NACK: 5;
  }

  export const State: StateMap;
}

export class ProtocolStatus extends jspb.Message {
  hasState(): boolean;
  clearState(): void;
  getState(): ProtocolState | undefined;
  setState(value?: ProtocolState): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getStatusJson(): string;
  setStatusJson(value: string): void;

  hasConnection(): boolean;
  clearConnection(): void;
  getConnection(): ProtocolStatus.Connection | undefined;
  setConnection(value?: ProtocolStatus.Connection): void;

  hasIssue(): boolean;
  clearIssue(): void;
  getIssue(): ProtocolStatus.Issue | undefined;
  setIssue(value?: ProtocolStatus.Issue): void;

  hasProof(): boolean;
  clearProof(): void;
  getProof(): Protocol.Proof | undefined;
  setProof(value?: Protocol.Proof): void;

  hasTrustPing(): boolean;
  clearTrustPing(): void;
  getTrustPing(): ProtocolStatus.TrustPing | undefined;
  setTrustPing(value?: ProtocolStatus.TrustPing): void;

  hasBasicMessage(): boolean;
  clearBasicMessage(): void;
  getBasicMessage(): ProtocolStatus.BasicMessage | undefined;
  setBasicMessage(value?: ProtocolStatus.BasicMessage): void;

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
    statusJson: string,
    connection?: ProtocolStatus.Connection.AsObject,
    issue?: ProtocolStatus.Issue.AsObject,
    proof?: Protocol.Proof.AsObject,
    trustPing?: ProtocolStatus.TrustPing.AsObject,
    basicMessage?: ProtocolStatus.BasicMessage.AsObject,
  }

  export class Connection extends jspb.Message {
    getId(): string;
    setId(value: string): void;

    getMyDid(): string;
    setMyDid(value: string): void;

    getTheirDid(): string;
    setTheirDid(value: string): void;

    getTheirEndpoint(): string;
    setTheirEndpoint(value: string): void;

    getTheirLabel(): string;
    setTheirLabel(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Connection.AsObject;
    static toObject(includeInstance: boolean, msg: Connection): Connection.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Connection, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Connection;
    static deserializeBinaryFromReader(message: Connection, reader: jspb.BinaryReader): Connection;
  }

  export namespace Connection {
    export type AsObject = {
      id: string,
      myDid: string,
      theirDid: string,
      theirEndpoint: string,
      theirLabel: string,
    }
  }

  export class Issue extends jspb.Message {
    getCredDefId(): string;
    setCredDefId(value: string): void;

    getSchemaId(): string;
    setSchemaId(value: string): void;

    clearAttrsList(): void;
    getAttrsList(): Array<Protocol.Attribute>;
    setAttrsList(value: Array<Protocol.Attribute>): void;
    addAttrs(value?: Protocol.Attribute, index?: number): Protocol.Attribute;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Issue.AsObject;
    static toObject(includeInstance: boolean, msg: Issue): Issue.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Issue, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Issue;
    static deserializeBinaryFromReader(message: Issue, reader: jspb.BinaryReader): Issue;
  }

  export namespace Issue {
    export type AsObject = {
      credDefId: string,
      schemaId: string,
      attrsList: Array<Protocol.Attribute.AsObject>,
    }
  }

  export class TrustPing extends jspb.Message {
    getReplied(): boolean;
    setReplied(value: boolean): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TrustPing.AsObject;
    static toObject(includeInstance: boolean, msg: TrustPing): TrustPing.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TrustPing, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TrustPing;
    static deserializeBinaryFromReader(message: TrustPing, reader: jspb.BinaryReader): TrustPing;
  }

  export namespace TrustPing {
    export type AsObject = {
      replied: boolean,
    }
  }

  export class BasicMessage extends jspb.Message {
    getContent(): string;
    setContent(value: string): void;

    getSentByMe(): boolean;
    setSentByMe(value: boolean): void;

    getDelivered(): boolean;
    setDelivered(value: boolean): void;

    getSentTimestamp(): number;
    setSentTimestamp(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BasicMessage.AsObject;
    static toObject(includeInstance: boolean, msg: BasicMessage): BasicMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BasicMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BasicMessage;
    static deserializeBinaryFromReader(message: BasicMessage, reader: jspb.BinaryReader): BasicMessage;
  }

  export namespace BasicMessage {
    export type AsObject = {
      content: string,
      sentByMe: boolean,
      delivered: boolean,
      sentTimestamp: number,
    }
  }

  export enum StatusCase {
    STATUS_NOT_SET = 0,
    CONNECTION = 10,
    ISSUE = 11,
    PROOF = 12,
    TRUST_PING = 13,
    BASIC_MESSAGE = 14,
  }
}

