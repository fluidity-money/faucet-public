/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Request tokens, with information on the IP address and the requesting address being
   * collected with X-Forwarded-For and tracked in the database. Sends SPN token at the
   * expense of the faucet.
   */
  requestTokens: Scalars['String']['output'];
};


export type MutationRequestTokensArgs = {
  turnstileToken: Scalars['String']['input'];
  wallet: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Request a healthcheck status update, including whatever's on the internal queue. */
  healthcheck: Scalars['Int']['output'];
};

export type RequestTokensMutationVariables = Exact<{
  wallet: Scalars['String']['input'];
  turnstileToken: Scalars['String']['input'];
}>;


export type RequestTokensMutation = { __typename?: 'Mutation', requestTokens: string };


export const RequestTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"turnstileToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"wallet"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}}},{"kind":"Argument","name":{"kind":"Name","value":"turnstileToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"turnstileToken"}}}]}]}}]} as unknown as DocumentNode<RequestTokensMutation, RequestTokensMutationVariables>;