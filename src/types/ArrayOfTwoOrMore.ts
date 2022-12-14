export type ArrayOfTwoOrMore<T> = {
    0: T;
    1: T;
} & Array<T>;