import React from "react";

interface IService {
    init: () => PVoid;
}

type PVoid = Promise<void>;
type AnyObj = Record<string, unknown>;
type PureFunc = () => void;
type PureFuncAsync = () => PVoid;
type PureFuncArg<T> = (value?: T) => void;
export type ReactFCWithChildren<T> = React.FC<React.PropsWithChildren<T>>
