export type Func<TReturnType,
  TArgType1 = TReturnType,
  TArgType2 = TArgType1,
  TArgType3 = TArgType2> = (arg1?: TArgType1, arg2?: TArgType2, arg3?: TArgType3) => TReturnType;

export type Action<TArgType1,
  TArgType2 = TArgType1,
  TArgType3 = TArgType2> = (arg1?: TArgType1, arg2?: TArgType2, arg3?: TArgType3) => void;

export type Predicate<TArgType1,
  TArgType2 = TArgType1,
  TArgType3 = TArgType2> = (arg1?: TArgType1, arg2?: TArgType2, arg3?: TArgType3) => boolean;
